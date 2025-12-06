import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIInsightsChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you analyze grid data and answer questions about energy metrics, performance trends, and environmental impact. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, session } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !session) return;

    // Input validation - limit message length
    const sanitizedInput = input.trim().slice(0, 2000);

    const userMessage: Message = { role: 'user', content: sanitizedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: { messages: [...messages, userMessage] },
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast({
            title: "Rate Limit",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        if (error.message?.includes('402')) {
          toast({
            title: "Usage Limit",
            description: "AI usage limit reached. Please add credits to continue.",
            variant: "destructive",
          });
          return;
        }

        throw error;
      }

      // Handle streaming response
      if (data && typeof data === 'object' && 'choices' in data) {
        const assistantMessage = data.choices?.[0]?.message?.content || '';
        setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
        
        // Save to database with user_id
        await supabase.from('chat_messages').insert([
          { role: 'user', content: sanitizedInput, user_id: user?.id },
          { role: 'assistant', content: assistantMessage, user_id: user?.id },
        ]);
      } else if (typeof data === 'string') {
        setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
        
        await supabase.from('chat_messages').insert([
          { role: 'user', content: sanitizedInput, user_id: user?.id },
          { role: 'assistant', content: data, user_id: user?.id },
        ]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Insights Chat
        </CardTitle>
        <CardDescription>
          Ask questions about grid data and get AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Ask about grid performance, energy mix, carbon intensity..."
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 2000))}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={isLoading}
            maxLength={2000}
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsChat;
