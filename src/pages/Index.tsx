import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (e) {
      console.error("Chat error:", e);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-2 px-6 py-4 border-b border-border/50">
        <Sparkles className="w-5 h-5 text-primary" />
        <h1 className="text-lg font-semibold text-foreground">Gemini</h1>
      </header>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Hello! How can I help you?
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              I'm Gemini, your AI assistant. Ask me anything and I'll do my best to help.
            </p>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};

export default Index;
