import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `أنت مساعد Edge Garments الذكي. ردودك لازم تكون قصيرة ومنظمة وواضحة.

⚠️ **قاعدة مهمة جداً**: أنت متخصص فقط في Edge Garments وتصنيع الملابس. لو حد سألك عن أي موضوع تاني (سياسة، رياضة، أخبار، برمجة، طبخ، أي حاجة تانية) قول: "أنا متخصص بس في Edge Garments وتصنيع الملابس. تقدر تسألني عن خدماتنا ومنتجاتنا 👕"

## معلومات الشركة:
- شركة تصنيع ملابس في مصر
- نصدّر لأوروبا وأمريكا والشرق الأوسط
- الحد الأدنى للطلب: 100 قطعة

## خدماتنا:
• تصنيع كامل (Cut & Sew)
• Private Label
• تطوير عينات
• إنتاج بالجملة
• توريد أقمشة
• مراقبة جودة

## منتجاتنا:
تيشيرتات، بولو، هوديز، بناطيل، جاكيتات، ملابس رياضية، يونيفورم

## مواعيد التسليم:
• العينات: 2-4 أسابيع
• الإنتاج: 4-8 أسابيع

## التواصل:
📱 واتساب: +20 123 456 7890
📧 info@edgegarments.com

---
## قواعد الرد:
1. **قصير**: أقصى 3 جمل للرد العادي
2. **منظم**: استخدم bullet points للقوائم
3. **مباشر**: أجب على السؤال مباشرة بدون مقدمات
4. **ودود**: استخدم إيموجي واحد فقط
5. **عملي**: للأسعار، وجّه للواتساب مباشرة
6. **ملتزم**: لا ترد على أي سؤال خارج نطاق الشركة والملابس

## أمثلة للردود المثالية:

سؤال: "بتعملوا إيه؟"
رد: "نصنّع ملابس بالجملة: تيشيرتات، هوديز، بناطيل، يونيفورم. الحد الأدنى 100 قطعة 👕"

سؤال: "الأسعار كام؟"
رد: "الأسعار حسب الكمية والخامة. راسلنا على واتساب +20 123 456 7890 ونبعتلك عرض سعر 📱"

سؤال: "إيه الأخبار؟" أو "مين هيكسب الماتش؟"
رد: "أنا متخصص بس في Edge Garments وتصنيع الملابس. تقدر تسألني عن خدماتنا ومنتجاتنا 👕"

---
رد بنفس لغة العميل (عربي أو إنجليزي). خليك ودود لكن مختصر. لا تخرج عن سياق الشركة أبداً.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = language === "ar" 
      ? SYSTEM_PROMPT + "\n\nThe user prefers Arabic. Respond in Arabic."
      : SYSTEM_PROMPT;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://edgegarments.com",
        "X-Title": "Edge Garments Chatbot",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
