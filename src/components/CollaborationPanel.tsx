import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Annotation {
  id: string;
  user_name: string;
  content: string;
  x_position: number;
  y_position: number;
  chart_id: string;
  created_at: string;
  user_id: string;
}

const CollaborationPanel = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [newAnnotation, setNewAnnotation] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadAnnotations();

    const channel = supabase
      .channel('annotations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'grid_annotations'
        },
        () => {
          loadAnnotations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadAnnotations = async () => {
    const { data, error } = await supabase
      .from('grid_annotations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      return;
    }

    setAnnotations(data || []);
  };

  const addAnnotation = async () => {
    if (!newAnnotation.trim() || !user) return;

    // Input validation
    const content = newAnnotation.trim().slice(0, 1000);
    const userName = user.email?.split('@')[0] || 'User';

    const { error } = await supabase
      .from('grid_annotations')
      .insert({
        user_id: user.id,
        user_name: userName.slice(0, 50),
        content,
        x_position: Math.random() * 100,
        y_position: Math.random() * 100,
        chart_id: 'main-dashboard',
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add annotation",
        variant: "destructive",
      });
      return;
    }

    setNewAnnotation('');
    toast({
      title: "Annotation Added",
      description: "Your annotation has been shared with the team",
    });
  };

  const deleteAnnotation = async (annotation: Annotation) => {
    // Only allow deletion of own annotations
    if (annotation.user_id !== user?.id) {
      toast({
        title: "Permission Denied",
        description: "You can only delete your own annotations",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('grid_annotations')
      .delete()
      .eq('id', annotation.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete annotation",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Real-time Collaboration
        </CardTitle>
        <CardDescription>
          Share insights and annotate charts with your team
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {annotations.length} Active Annotations
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add annotation or insight..."
              value={newAnnotation}
              onChange={(e) => setNewAnnotation(e.target.value.slice(0, 1000))}
              onKeyDown={(e) => e.key === 'Enter' && addAnnotation()}
              maxLength={1000}
            />
            <Button onClick={addAnnotation}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Posting as {user?.email?.split('@')[0] || 'User'}
          </p>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="p-3 bg-muted/50 rounded-lg space-y-1 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-primary">{annotation.user_name}</p>
                  <p className="text-sm mt-1">{annotation.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(annotation.created_at).toLocaleString()}
                  </p>
                </div>
                {annotation.user_id === user?.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAnnotation(annotation)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;
