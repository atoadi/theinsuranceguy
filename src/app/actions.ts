'use server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// --- HELPER: GENERATE CALENDAR LINKS (Timezone Safe) ---
function generateCalendarLinks(event: any) {
  // 1. Parse "10:00 AM" manually to prevent Timezone shifts
  const [timeStr, modifier] = event.slot.split(' ');
  let [hoursStr, minutesStr] = timeStr.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (hours === 12 && modifier === 'AM') hours = 0;
  if (hours !== 12 && modifier === 'PM') hours += 12;

  // 2. Format Times for URLs (YYYYMMDDTHHMMSS)
  const dateClean = event.date.replace(/-/g, '');
  
  const formatTime = (h: number, m: number) => {
    return String(h).padStart(2, '0') + String(m).padStart(2, '0') + '00';
  };

  const startTime = formatTime(hours, minutes);
  
  // Add 20 minutes for End Time
  let endHours = hours;
  let endMinutes = minutes + 20;
  if (endMinutes >= 60) { endHours += 1; endMinutes -= 60; }
  const endTime = formatTime(endHours, endMinutes);

  const title = encodeURIComponent(`Consultation: ${event.name}`);
  const details = encodeURIComponent(`Phone: ${event.phone}\nVehicle: ${event.identity}\nNote: ${event.description}`);
  const location = encodeURIComponent("Phone Call");

  // 3. Create Links (Using "TEMPLATE" action for floating time)
  const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateClean}T${startTime}/${dateClean}T${endTime}`;
  
  // ISO format for Outlook
  const startIso = `${event.date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  const endIso = `${event.date}T${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`;
  const outlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&location=${location}&startdt=${startIso}&enddt=${endIso}`;

  return { googleLink, outlookLink };
}

// --- 1. EXISTING: LEAD GENERATION (Diamond Wizard) ---
export async function sendTelegramLead(data: any) {
  try {
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([
        { 
          email: data.email, 
          whatsapp: data.whatsapp || 'None', 
          make_model: data.makeModel,
          variant: data.variant,
          budget: String(data.budget),
          mode: data.mode
        }
      ])
      
    if (supabaseError) throw supabaseError;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `
🚀 *New Insurance Lead*
--------------------------
📧 *Email:* ${data.email}
📱 *Whatsapp:* ${data.whatsapp || 'Not provided'} 
🚗 *Model:* ${data.makeModel}
⚙️ *Variant:* ${data.variant}
💰 *Budget:* ₹${data.budget}
`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return { success: true };
  } catch (err) {
    console.error("Submission Error:", err);
    throw new Error("Action failed");
  }
}

// --- 2. EXISTING: GARAGE FETCHING ---
export async function getGarages(city: string, brand: string, searchTerm: string) {
  try {
    let query = supabase.from('garages').select('*').limit(50);
    if (city) query = query.ilike('c', city); 
    if (brand) query = query.ilike('b', brand); 
    if (searchTerm) query = query.or(`n.ilike.%${searchTerm}%,c.ilike.%${searchTerm}%,a.ilike.%${searchTerm}%`);
    const { data } = await query;
    return data || [];
  } catch (err) { return []; }
}

// ... (Your existing imports and code above) ...

// --- 3. UPDATED: SECURE AVAILABILITY CHECK ---
export async function getTakenSlots(date: string) {
  try {
    // OLD WAY (Blocked): await supabase.from('appointments').select(...)
    
    // NEW WAY (Secure): Call the Postgres Function (RPC)
    // This asks the database to run the "Black Box" function we just made
    const { data, error } = await supabase.rpc('get_booked_slots', { 
      check_date: date 
    });

    if (error) {
      console.error("RPC Error:", error);
      return [];
    }

    // The function returns an array of objects: [{ slot: "10:00 AM" }, ...]
    // We map it to a simple array of strings: ["10:00 AM", ...]
    return data ? data.map((item: any) => item.slot) : [];
  } catch (err) {
    console.error("Availability Check Error:", err);
    return [];
  }
}

// ... (Your saveAppointment code below remains exactly the same) ...

// --- 4. NEW: SAVE APPOINTMENT (With Firewall & Full Logic) ---
export async function saveAppointment(data: any) {
  try {
    // ---------------------------------------------------------
    // STEP 1: ATTEMPT INSERT (Rely on DB Constraint)
    // ---------------------------------------------------------
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          category: data.category,
          identity: data.identity,
          description: data.description,
          appointment_date: data.date, 
          appointment_slot: data.slot, 
          status: 'pending'
        }
      ]);

    // ---------------------------------------------------------
    // STEP 2: CATCH DOUBLE BOOKING ERROR
    // ---------------------------------------------------------
    if (error) {
      // Postgres Error 23505 = Unique Constraint Violation
      if (error.code === '23505') {
        return { success: false, error: "Slot unavailable" };
      }
      throw error; 
    }

    // ---------------------------------------------------------
    // STEP 3: SUCCESS (Generate Links & Notify)
    // ---------------------------------------------------------
    const { googleLink, outlookLink } = generateCalendarLinks(data);
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    const message = `
📅 <b>New Booking Confirmed</b>
-----------------------------
👤 <b>Name:</b> ${data.name}
📱 <b>Phone:</b> ${data.phone}
🗓️ <b>Date:</b> ${data.date}
⏰ <b>Slot:</b> ${data.slot}
🚗 <b>Vehicle:</b> ${data.identity}

👇 <b>Tap to Add to Your Calendar:</b>
<a href="${outlookLink}">📅 Add to Outlook / Office 365</a>
<a href="${googleLink}">🗓️ Add to Google Calendar</a>
`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
    });

    return { success: true };
  } catch (err) {
    console.error("Appointment Error:", err);
    return { success: false, error: "System error" };
  }
}