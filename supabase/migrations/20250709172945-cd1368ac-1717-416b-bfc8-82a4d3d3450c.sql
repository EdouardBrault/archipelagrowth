
-- Create table for storing Bing URL submissions
CREATE TABLE public.bing_url_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_url TEXT NOT NULL,
  urls_submitted TEXT[] NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  bing_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.bing_url_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is admin functionality)
CREATE POLICY "Allow all operations on bing_url_submissions" 
  ON public.bing_url_submissions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_bing_submissions_date ON public.bing_url_submissions(submission_date DESC);
CREATE INDEX idx_bing_submissions_status ON public.bing_url_submissions(status);
