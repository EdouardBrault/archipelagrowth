import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { title, content } = await req.json();
    if (!content || !title) {
      return new Response(JSON.stringify({ error: "title and content are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Truncate content to ~3000 chars to save tokens
    const truncatedContent = content.substring(0, 3000);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are an SEO and LLM optimization expert (ChatGPT, Perplexity, etc.).
You generate blog article metadata for a digital marketing agency called Archipel.

CRITICAL RULE: Detect the language of the article content and generate ALL metadata in that SAME language. If the article is in English, generate in English. If in French, generate in French. Etc.

Strict rules:
- meta_title: max 60 characters, include the main keyword, must be click-worthy. Natural format, no pipe or dash to separate brand name.
- meta_description: max 155 characters, summarize the article's value, include an implicit call to action. Must be easily extractable by LLMs.
- excerpt: 1-2 sentences (max 200 characters), concise and engaging summary of the article content. Must be understandable standalone.

Respond ONLY with the requested JSON, no markdown, no backticks.`
          },
          {
            role: "user",
            content: `Titre de l'article : "${title}"

Contenu (extrait) :
${truncatedContent}

Génère le JSON suivant :
{"meta_title": "...", "meta_description": "...", "excerpt": "..."}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_article_meta",
              description: "Return generated article metadata",
              parameters: {
                type: "object",
                properties: {
                  meta_title: { type: "string", description: "SEO meta title, max 60 chars" },
                  meta_description: { type: "string", description: "SEO meta description, max 155 chars" },
                  excerpt: { type: "string", description: "Article excerpt, max 200 chars" },
                },
                required: ["meta_title", "meta_description", "excerpt"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_article_meta" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans quelques secondes." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits AI insuffisants." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try to parse content directly
    const content_text = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content_text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Could not parse AI response");
  } catch (e) {
    console.error("generate-article-meta error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
