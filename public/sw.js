/// <reference lib="webworker" />

const sw = self;

// Install event - activate immediately
sw.addEventListener('install', (event) => {
    event.waitUntil(sw.skipWaiting());
});

sw.addEventListener('activate', (event) => {
    event.waitUntil(sw.clients.claim());
});

// Listen for incoming Push events
sw.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();

        // The visual payload of the notification
        const title = data.title || 'New Lead Alert';
        const options = {
            body: data.body || 'You have a new consultation request.',
            icon: '/apple-icon.png',
            badge: '/favicon-32x32.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200], // Premium vibration pattern
            data: {
                url: data.url || '/admin/leads', // Where clicking takes you
            },
            requireInteraction: true, // Keeps it on screen until dismissed (perfect for leads)
        };

        event.waitUntil(
            sw.registration.showNotification(title, options)
        );
    } catch (error) {
        console.error('Error parsing push data', error);
    }
});

// Handle when the user clicks the notification
sw.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/admin/leads';

    event.waitUntil(
        sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // If the admin tab is already open, focus it and navigate
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('/admin') && 'focus' in client) {
                    return client.focus().then(() => client.navigate(urlToOpen));
                }
            }
            // Otherwise, open a new window
            if (sw.clients.openWindow) {
                return sw.clients.openWindow(urlToOpen);
            }
        })
    );
});
