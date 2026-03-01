const { createClient } = require('@supabase/supabase-js');

async function test() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log("URL:", !!url, "KEY:", !!key);

    const supabase = createClient(url, key);

    console.log("Fetching exact columns...");
    const { data, error } = await supabase.from('blogs').select('id, title, slug, tag, tag_color, read_time, published_date, is_published, created_at');

    if (error) {
        console.log("ERROR:", JSON.stringify(error, null, 2));
    } else {
        console.log("DATA LENGTH:", data ? data.length : "null");
        if (data && data.length > 0) {
            console.log("FIRST BLOG TITLE:", data[0].title);
        }
    }
}

test();
