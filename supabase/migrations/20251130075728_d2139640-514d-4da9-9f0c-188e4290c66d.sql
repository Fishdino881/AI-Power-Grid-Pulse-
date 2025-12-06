-- Create table for storing user annotations and collaboration data
CREATE TABLE public.grid_annotations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  x_position NUMERIC NOT NULL,
  y_position NUMERIC NOT NULL,
  chart_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing AI chat history
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.grid_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for annotations (public read, anyone can create)
CREATE POLICY "Annotations are viewable by everyone" 
ON public.grid_annotations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create annotations" 
ON public.grid_annotations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can delete annotations" 
ON public.grid_annotations 
FOR DELETE 
USING (true);

-- Create policies for chat messages (public read/write)
CREATE POLICY "Chat messages are viewable by everyone" 
ON public.chat_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create chat messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for collaboration
ALTER PUBLICATION supabase_realtime ADD TABLE public.grid_annotations;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_annotations_updated_at
BEFORE UPDATE ON public.grid_annotations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();