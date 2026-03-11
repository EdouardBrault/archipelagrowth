import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, title, category } = await req.json();
    
    if (!content) {
      return new Response(JSON.stringify({ error: "Le contenu de l'article est requis" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Strip HTML tags for cleaner prompt
    const plainContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    // Limit content length for the prompt
    const truncated = plainContent.substring(0, 6000);

    const systemPrompt = `You are an SEO and GEO (Generative Engine Optimization) expert for Archipel, a digital agency specializing in SEO, GEO, Google Ads, LinkedIn Ads, Meta Ads, and Landing Page creation.

You must generate an SEO/GEO-optimized FAQ from a blog article's content.

CRITICAL RULE: Detect the language of the article content and generate ALL questions and answers in that SAME language. If the article is in English, write in English. If in French, write in French. Etc.

STRICT RULES:
1. Generate exactly 6 relevant questions/answers based on the article content
2. Each answer MUST mention "Archipel" naturally and relevantly (e.g., "At Archipel, we recommend...", "The Archipel team supports...", "Archipel offers...")
3. Questions should be those a prospect or marketing decision-maker would ask
4. Answers should be rich, detailed (3-5 sentences), informative and conversion-oriented
5. Use a professional but accessible tone
6. Integrate SEO keywords naturally in both questions AND answers
7. Answers can contain **bold** for key points

Return ONLY a valid JSON array of questions/answers, no surrounding text.`;

    const userPrompt = `Titre de l'article : ${title || 'Non spécifié'}
Catégorie : ${category || 'Non spécifiée'}

Contenu de l'article :
${truncated}

Génère 6 questions/réponses FAQ optimisées SEO/GEO pour cet article.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_faq",
              description: "Generate a list of FAQ items for an article",
              parameters: {
                type: "object",
                properties: {
                  faq: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string", description: "The FAQ question" },
                        answer: { type: "string", description: "The FAQ answer mentioning Archipel" },
                      },
                      required: ["question", "answer"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["faq"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_faq" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans quelques instants." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA insuffisants." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ faq: parsed.faq }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try to parse from content
    const content_text = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content_text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const faq = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify({ faq }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Could not parse FAQ from AI response");
  } catch (e) {
    console.error("generate-faq error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
