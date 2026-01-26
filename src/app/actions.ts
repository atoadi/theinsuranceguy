'use server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function sendTelegramLead(data: any) {
  try {
    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([
        { 
          email: data.email, 
          whatsapp: data.whatsapp || 'None', 
          make_model: data.makeModel, // Matches SQL change above
          variant: data.variant,
          budget: String(data.budget),
          mode: data.mode
        }
      ])
      

    if (supabaseError) throw supabaseError;

    // 2. Send to Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `
🚀 *New Insurance Lead*
--------------------------
📧 *Email:* ${data.email}
📱 *Whatsapp:* ${data.whatsapp || 'Not provided'} 
🚗 *Model:* ${data.makeModel}
⚙️ *Variant:* ${data.variant}
${data.mode === 'new' 
  ? `📍 *RTO:* ${data.rto}` 
  : `🔢 *Plate Number:* ${data.carNumber}`
}
💰 *Budget/Quote:* ₹${data.budget}

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

