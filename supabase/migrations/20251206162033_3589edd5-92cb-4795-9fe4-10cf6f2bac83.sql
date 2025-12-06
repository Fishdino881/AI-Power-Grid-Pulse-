-- Add user_id columns to existing tables
ALTER TABLE public.chat_messages 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.grid_annotations 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing RLS policies on chat_messages
DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Chat messages are viewable by everyone" ON public.chat_messages;

-- Drop existing RLS policies on grid_annotations
DROP POLICY IF EXISTS "Annotations are viewable by everyone" ON public.grid_annotations;
DROP POLICY IF EXISTS "Anyone can create annotations" ON public.grid_annotations;
DROP POLICY IF EXISTS "Anyone can delete annotations" ON public.grid_annotations;

-- Create new RLS policies for chat_messages (authenticated users only)
CREATE POLICY "Authenticated users can view chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create their own chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat messages"
ON public.chat_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create new RLS policies for grid_annotations (authenticated users only)
CREATE POLICY "Authenticated users can view annotations"
ON public.grid_annotations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create their own annotations"
ON public.grid_annotations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own annotations"
ON public.grid_annotations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annotations"
ON public.grid_annotations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);