
"use client";

import { useState, useRef } from 'react';
import { Header } from "@/components/layout/Header";
import { PromptInputForm } from "@/components/forms/PromptInputForm";
import { CodeDisplay } from "@/components/display/CodeDisplay";
import { ExamplePrompts } from "@/components/content/ExamplePrompts";
import { Card, CardContent } from "@/components/ui/card";
import { regenerateCodeWithPrompt, type GenerateCodeFormState } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";


export default function Home() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPrompt, setCurrentPrompt] = useState<string>(""); // For text area
  const [lastSuccessfulPrompt, setLastSuccessfulPrompt] = useState<string>(""); // For regenerate
  const { toast } = useToast();

  const handleCodeGenerated = (code: string | null, promptUsed?: string | null) => {
    setGeneratedCode(code);
    if (code && promptUsed) { // Only update lastSuccessfulPrompt on actual success with code
      // Handled by onSuccessfulGeneration
    }
  };

  const handleSuccessfulGeneration = (prompt: string) => {
    setLastSuccessfulPrompt(prompt);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handlePromptSelect = (prompt: string) => {
    setCurrentPrompt(prompt); 
    setLastSuccessfulPrompt(""); // Clear last successful prompt when a new example is selected
    setGeneratedCode(null); // Clear generated code as well
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegenerate = async () => {
    if (!lastSuccessfulPrompt) {
      toast({
        title: "Cannot Regenerate",
        description: "There is no previous successful prompt to regenerate.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedCode(null); // Clear previous display
    try {
      const newState: GenerateCodeFormState = await regenerateCodeWithPrompt(lastSuccessfulPrompt);
      setGeneratedCode(newState.generatedCode);
      if (newState.message) {
        toast({
          title: newState.success ? "Code Regenerated!" : "Regeneration Failed",
          description: newState.message,
          variant: newState.success ? "default" : "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Regenerating",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <PromptInputForm 
                onCodeGenerated={handleCodeGenerated} 
                onLoadingChange={handleLoadingChange}
                initialPrompt={currentPrompt}
                onSuccessfulGeneration={handleSuccessfulGeneration}
              />
              <ExamplePrompts onPromptSelect={handlePromptSelect} />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg h-full">
            <CardContent className="p-6 h-full flex flex-col">
             <CodeDisplay 
                generatedCode={generatedCode} 
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
                canRegenerate={!!lastSuccessfulPrompt}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} WebWeaver. Powered by AI.
      </footer>
    </div>
  );
}
