const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      console.error('GOOGLE_PLACES_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Google Places API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Find the place using Text Search
    console.log('Searching for Archipel Marketing place...');
    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.reviews',
      },
      body: JSON.stringify({
        textQuery: 'Archipel Marketing Agence GEO 106 Rue de Richelieu Paris',
        languageCode: 'fr',
      }),
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Google Places search error:', searchResponse.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: `Google API error: ${searchResponse.status}` }),
        { status: searchResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchData = await searchResponse.json();
    const place = searchData.places?.[0];

    if (!place) {
      console.error('Place not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Place not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Found place:', place.displayName?.text, 'ID:', place.id, 'Rating:', place.rating, 'Reviews count:', place.userRatingCount);

    // Filter only 5-star reviews
    const fiveStarReviews = (place.reviews || []).filter(
      (r: any) => r.rating === 5
    ).map((r: any) => ({
      text: r.text?.text || r.originalText?.text || '',
      authorName: (r.authorAttribution?.displayName || 'Anonyme').split(' ')[0],
      authorPhoto: r.authorAttribution?.photoUri || null,
      profileUrl: r.authorAttribution?.uri || null,
      rating: r.rating,
      relativeTime: r.relativePublishTimeDescription || '',
    }));

    console.log('5-star reviews found:', fiveStarReviews.length);

    return new Response(
      JSON.stringify({
        success: true,
        rating: place.rating,
        totalReviews: place.userRatingCount,
        reviews: fiveStarReviews,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
