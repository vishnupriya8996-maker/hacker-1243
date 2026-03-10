import { Sparkles } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-4 py-6 px-4 max-w-3xl mx-auto">
    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/20">
      <Sparkles className="w-4 h-4 text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-muted-foreground mb-1.5">Gemini</p>
      <div className="flex gap-1.5 pt-2">
        <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
