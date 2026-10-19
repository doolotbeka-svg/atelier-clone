import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { createSiteRouter } from './siteRouter.js';

// Atelier Architectura knowledge base for AI Concierge in Kyrgyzstan
const ATELIER_SYSTEM_PROMPT = `
Вы — ведущий инженер-технолог и консьерж премиального мебельного ателье "ATELIER ARCHITECTURA" в Кыргызстане (Флагманский шоурум и собственный высокотехнологичный комплекс 4 200 м² — в г. Ош). Точный адрес шоурума не называйте: предложите уточнить его по телефону или в WhatsApp.

СУТЬ БРЕНДА:
Архитектурный подход к мебели. Не типовые гарнитуры, а интеграция в интерьер, индивидуальные конструктивные узлы, благородные натуральные материалы (американский орех, копченый эвкалипт, мореный дуб, мрамор Calacatta Viola, кварцит Patagonia, брашированная латунь, премиальная фурнитура Blum Legrabox и Salice Air), допуск до 0.5 мм, ручная шлифовка и доводка.
Также у нас представлена готовая авторская коллекция в шоуруме в Оше (обеденные столы Arch Monolith, комоды с Calacatta Viola, лаунж-кресла Sella из кожи Cuoio, кофейные столы Nexus, кабинетные столы Sovereign).

ГЕОГРАФИЯ И ЦЕЛЕВАЯ АУДИТОРИЯ:
Кыргызстан: прежде всего г. Ош и юг страны (частные дома и виллы, квартиры и пентхаусы в новых жилых комплексах Оша, Джалал-Абад, Баткен), а также Бишкек, Иссык-Куль и страны Центральной Азии. Клиенты — владельцы элитной недвижимости, а также ведущие архитекторы и дизайн-бюро.

ВАЛЮТА И ЦЕНЫ:
Основная валюта в Кыргызстане — Кыргызский сом (KGS / сом), также параллельно используем Российский рубль (RUB / ₽). Все цены на готовую мебель и сметы заказных проектов рассчитываются в сомах и рублях.

ТОНАЛЬНОСТЬ:
Сдержанный люкс (Quiet Luxury), глубокая техническая экспертность, лаконичность, вежливость, абсолютная конфиденциальность (работаем по NDA). Без кричащих скидок и дешевых слоганов.

ЧЕМ ВЫ ПОМОГАЕТЕ:
1. Консультируете по готовой мебели из наличия в шоуруме в Оше с указанием цен в сомах и рублях.
2. Консультируете по подбору редких шпонов (американский орех, эвкалипт), натурального камня (кварцит, мрамор), фурнитуры (скрытые петли Salice Air, электроприводы Blum Servo-Drive, скрытая подсветка CRI 98+).
3. Помогаете сориентироваться по срокам индивидуального изготовления (от 45 до 70 рабочих дней) и условиям доставки в кофрах по Ошу, югу Кыргызстана и в другие регионы.
4. Рассказываете про 6 этапов работы: от лазерного 3D-сканирования Leica и деталировки узлов до тестовой сухой сборки на фабрике в Оше и беспылевого монтажа Festool.
5. Отвечаете на вопросы архитекторов: 3D-библиотеки текстур в формате 3ds Max / Corona / Revit, персональный технолог.
6. Приглашаете на чашку эспрессо в шоурум в Оше для подбора образцов при правильном освещении или предлагаете отправить дизайн-проект / чертежи на просчет.

Отвечайте на том языке, на котором обратился клиент (русский, кыргызча же английский), элегантно, ёмко, профессионально и по существу (2-3 абзаца).
`;

const PROJECT_TYPE_LABELS: Record<string, string> = {
  ready_furniture: 'Готовая мебель из шоурума',
  kitchen: 'Кухонный гарнитур и остров',
  wardrobe: 'Мастер-гардеробная',
  living: 'Гостиная & ТВ-консоль',
  cabinet: 'Кабинет & библиотека',
  complex: 'Комплексная меблировка виллы/пентхауса'
};

const BUDGET_LABELS: Record<string, string> = {
  from_1_5m: '1.5 – 3 млн',
  from_3m: '3 – 7 млн',
  from_7m: '7 – 15 млн',
  above_15m: 'более 15 млн'
};

const FORMAT_LABELS: Record<string, string> = {
  showroom: 'Встреча в шоуруме',
  online: 'Онлайн'
};

function escapeHtml(value: unknown): string {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Sends a form lead to the Telegram chat set in TELEGRAM_CHAT_ID; does nothing until both env vars are set
async function sendLeadToTelegram(lead: Record<string, any>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const currency = lead.currency === 'KGS' ? 'сом' : '₽';
  const rows: [string, unknown][] = [
    ['Имя', lead.name],
    ['Телефон', lead.phone],
    ['Email', lead.email],
    ['Тип проекта', lead.projectTypeLabel || (lead.projectType && (PROJECT_TYPE_LABELS[lead.projectType] || lead.projectType))],
    ['Бюджет', lead.budgetLabel || (lead.budget && `${BUDGET_LABELS[lead.budget] || lead.budget} ${currency}`)],
    ['Формат', lead.format && (FORMAT_LABELS[lead.format] || lead.format)],
    ['Визит в шоурум', lead.visitShowroom === undefined ? undefined : lead.visitShowroom ? 'да' : 'нет'],
    ['Комментарий', lead.notes || lead.message],
    ['Файл', lead.hasFile ? lead.fileName || 'приложен' : undefined],
    ['Язык сайта', lead.lang]
  ];
  const text = [
    '<b>🛋 Новая заявка с сайта ATELIER</b>',
    '',
    ...rows.filter(([, value]) => value !== undefined && value !== '').map(([label, value]) => `<b>${label}:</b> ${escapeHtml(value)}`)
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
  if (!response.ok) {
    throw new Error(`Telegram API ${response.status}: ${await response.text()}`);
  }
}

// API routes shared by the local dev server (server.ts) and the Vercel function (api/index.ts)
export function createApiApp() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '10mb' }));

  // AI Concierge API Route
  app.post('/api/ai-concierge', async (req, res) => {
    try {
      const { messages, userMessage, lang = 'ru', currency = 'RUB' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const defaultFallbacks: Record<string, string> = {
        ru: currency === 'KGS' 
          ? "Благодарю за обращение в ATELIER ARCHITECTURA. Наш ведущий конструктор-технолог готов детально рассчитать стоимость вашего проекта в сомах (KGS) или рублях (RUB). Мы проектируем узлы с точностью до 0.5 мм, используем шпон американского ореха, мрамор и скрытую инженерию Salice/Blum. Вы можете прикрепить проект в форме ниже."
          : "Благодарю за обращение в ATELIER ARCHITECTURA. Наш ведущий конструктор-технолог готов детально разобрать ваш проект и рассчитать смету. Мы проектируем узлы с точностью до 0.5 мм, используем шпон американского ореха, мрамор и скрытую инженерию Salice/Blum. Вы можете прикрепить дизайн-проект в форме ниже или записаться на закрытую встречу в шоуруме за чашкой эспрессо.",
        en: currency === 'KGS'
          ? "Thank you for contacting ATELIER ARCHITECTURA. Our lead engineering technologist is ready to calculate your architectural project in KGS (som) or RUB. We engineer junction nodes with 0.5 mm tolerances, using American walnut veneers, natural marble, and concealed Salice/Blum hardware."
          : "Thank you for contacting ATELIER ARCHITECTURA. Our lead engineering technologist is ready to analyze your architectural project. We engineer junction nodes with 0.5 mm tolerances, using American walnut veneers, natural marble, and concealed Salice/Blum hardware. You can upload your design drawings below or schedule a private showroom consultation over an espresso.",
        ky: "ATELIER ARCHITECTURA ательесине кайрылганыңыз үчүн рахмат. Биздин башкы конструктор-технолог долбооруңузду сом (KGS) же рубль менен деталдуу эсептеп берүүгө даяр. Биз түйүндөрдү 0.5 мм тактык менен долбоорлоп, америкалык жаңгак шпону, мрамор жана Salice/Blum жашыруун механизмдерин колдонобуз."
      };

      if (!apiKey) {
        return res.json({
          reply: defaultFallbacks[lang as string] || defaultFallbacks.ru
        });
      }

      const ai = new GoogleGenAI({ apiKey });
    
      // Format conversation history for Gemini
      const contents: any[] = [];
      if (Array.isArray(messages)) {
        messages.forEach((m: { role: string; content: string }) => {
          contents.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          });
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: userMessage || 'Здравствуйте! Расскажите об условиях работы ателье.' }]
      });

      const currencyInstruction = currency === 'KGS'
        ? 'ВАЛЮТА: Текущая выбранная валюта клиента — Кыргызский сом (KGS / сом). Если называете цены или диапазоны смет, указывайте в сомах (или параллельно в рублях: 1 рубль ≈ 0.975 сом).'
        : 'ВАЛЮТА: Текущая выбранная валюта клиента — Российский рубль (RUB / ₽).';

      const langInstruction = lang === 'ky'
        ? 'ВАЖНО: Отвечайте строго на кыргызском языке (кыргызча) вежливо, профессионально и технически грамотно.'
        : lang === 'en'
        ? 'IMPORTANT: Respond strictly in English in a polite, refined, high-end architectural tone.'
        : 'ВАЖНО: Отвечайте на русском языке сдержанно, профессионально и ёмко.';

      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: `${ATELIER_SYSTEM_PROMPT}\n\n${currencyInstruction}\n\n${langInstruction}`,
          temperature: 0.4,
        }
      });

      const reply = response.text || (defaultFallbacks[lang as string] || defaultFallbacks.ru);
      res.json({ reply });
    } catch (error: any) {
      console.error('Error generating AI concierge response:', error);
      const { lang = 'ru' } = req.body;
      const errorFallbacks: Record<string, string> = {
        ru: "Благодарю за проявленный интерес к ATELIER ARCHITECTURA. Каждый проект мы рассчитываем индивидуально на основе архитектурных планов и выбранных фактур (массив, шпон, камень, латунь). Оставьте заявку с файлом проекта через форму на сайте или свяжитесь с нашим технологом в WhatsApp для оперативного расчета сметы.",
        en: "Thank you for your interest in ATELIER ARCHITECTURA. Each bespoke project is individually engineered based on architectural blueprints and tactile materials (solid wood, veneer, stone, brass). Submit your drawings via the form or message our technologist via WhatsApp.",
        ky: "ATELIER ARCHITECTURA ательесине кызыгууңуз үчүн ыраазычылык билдиребиз. Ар бир долбоор архитектуралык пландардын жана тандалган материалдардын негизинде жекече эсептелет. Дизайн-долбооруңузду форма аркылуу жөнөтүңүз же тез эсептөө үчүн WhatsApp аркылуу байланышыңыз."
      };
      res.json({
        reply: errorFallbacks[lang as string] || errorFallbacks.ru
      });
    }
  });

  // Health check: shows whether the Gemini key reached the server, without revealing it
  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
      telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
    });
  });

  // Lead Submission API (Stores project briefs & callback requests)
  app.post('/api/consultation-request', async (req, res) => {
    const { name, phone, projectType, budget, notes, hasFile } = req.body;
    console.log('Received consultation inquiry:', { name, phone, projectType, budget, notes, hasFile });
    try {
      await sendLeadToTelegram(req.body);
    } catch (error) {
      // The visitor still gets a confirmation; the lead stays in the logs above
      console.error('Error sending lead to Telegram:', error);
    }
    res.json({
      success: true,
      message: 'Ваша заявка принята. Ведущий технолог-конструктор свяжется с вами в течение 2 часов для обсуждения узлов и материалов.'
    });
  });

  // Admin panel content, password and image uploads
  app.use('/api', createSiteRouter());

  return app;
}
