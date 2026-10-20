// Vercel serverless funksiya: sayt buyurtmasini Telegram botga yuboradi.
// Sozlamalar (Vercel > Settings > Environment Variables): BOT_TOKEN, CHAT_ID
const MENU = { // narxlar serverda ham tekshiriladi (saytdagi narxlar bilan bir xil bo'lsin)
  11: ["Go’shtli somsa (duxovka)", 6000], 12: ["Tovuqli somsa (duxovka)", 6000],
  13: ["Kartoshkali somsa (duxovka)", 5000], 14: ["Qovoqli somsa (duxovka)", 5000],
  21: ["Go’shtli somsa (tandir)", 10000], 22: ["Tovuqli somsa (tandir)", 8000],
  23: ["Kartoshkali somsa (tandir)", 6000], 24: ["Qovoqli somsa (tandir)", 6000]
};
const DELIVERY_FEE = 0, MIN_ORDER = 0;
const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const money = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so’m";
const bad = res => res.status(400).json({ ok: false });

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== "object") return bad(res);
  if (b.hp) return res.status(200).json({ ok: true }); // spam tuzog'i

  const items = Array.isArray(b.items) ? b.items.slice(0, 30) : [];
  let sum = 0; const lines = [];
  for (const it of items) {
    const m = MENU[it.id], q = Number(it.q);
    if (!m || !Number.isInteger(q) || q < 1 || q > 50) return bad(res);
    sum += m[1] * q; lines.push(`${esc(m[0])} × ${q} = ${money(m[1] * q)}`);
  }
  if (!lines.length || sum < MIN_ORDER) return bad(res);

  const name = String(b.name || "").trim().slice(0, 60);
  const phone = String(b.phone || "").trim().slice(0, 30);
  const addr = String(b.addr || "").trim().slice(0, 300);
  const note = String(b.note || "").trim().slice(0, 300);
  const pay = b.pay === "card" ? "Karta (kuryerga)" : "Naqd";
  const lat = Number(b.pos && b.pos.a), lng = Number(b.pos && b.pos.o);
  const hasPos = b.pos && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  if (!name || phone.replace(/\D/g, "").length < 9 || (!addr && !hasPos)) return bad(res);

  const out = ["🥟 <b>Yangi buyurtma</b>", "", ...lines];
  if (DELIVERY_FEE) out.push(`Yetkazib berish: ${money(DELIVERY_FEE)}`);
  out.push("", `<b>Jami: ${money(sum + DELIVERY_FEE)}</b>`, "",
    `Ism: ${esc(name)}`, `Telefon: ${esc(phone)}`, `Manzil: ${esc(addr || "-")}`, `To’lov: ${pay}`);
  if (hasPos) out.push(`📍 https://maps.google.com/?q=${lat},${lng}`, `📍 https://yandex.com/maps/?pt=${lng},${lat}&z=17`);
  if (note) out.push(`Izoh: ${esc(note)}`);

  const token = process.env.BOT_TOKEN, chat = process.env.CHAT_ID || "5182315918";
  if (!token) return res.status(500).json({ ok: false });
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: out.join("\n"), parse_mode: "HTML", disable_web_page_preview: true })
    });
    if (!r.ok) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch (e) { return res.status(502).json({ ok: false }); }
};
