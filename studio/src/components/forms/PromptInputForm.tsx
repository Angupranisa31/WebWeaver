
"use client";

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, TriangleAlert } from "lucide-react";
import type { GenerateCodeFormState } from '@/app/actions';
import { generateCodeAction } from '@/app/actions';

interface PromptInputFormProps {
  onCodeGenerated: (code: string | null, prompt?: string | null) => void;
  onLoadingChange: (loading: boolean) => void;
  initialPrompt?: string;
  onSuccessfulGeneration: (prompt: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200">
      {pending ? "Generating..." : "Generate Code"}
    </Button>
  );
}

export function PromptInputForm({ onCodeGenerated, onLoadingChange, initialPrompt, onSuccessfulGeneration }: PromptInputFormProps) {
  const initialState: GenerateCodeFormState = { message: null, generatedCode: null, success: false, promptUsed: null };
  const [state, formAction] = useActionState(generateCodeAction, initialState);
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    onLoadingChange(pending);
  }, [pending, onLoadingChange]);

  useEffect(() => {
    if (state.success && state.generatedCode) {
      onCodeGenerated(state.generatedCode, state.promptUsed);
      if (state.promptUsed) {
        onSuccessfulGeneration(state.promptUsed);
      }
    } else {
      onCodeGenerated(null, state.promptUsed); // Clear previous code on error or no code
    }
  }, [state, onCodeGenerated, onSuccessfulGeneration]);
  
  useEffect(() => {
    if (initialPrompt && promptTextareaRef.current) {
      promptTextareaRef.current.value = initialPrompt;
    }
  }, [initialPrompt]);


  return (
    <form action={formAction} className="space-y-6" ref={formRef}>
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-foreground mb-1 font-headline">
          Enter your structured text prompt:
        </label>
        <Textarea
          id="prompt"
          name="prompt"
          ref={promptTextareaRef}
          placeholder="e.g., A hero section with a title, subtitle, and a button."
          rows={8}
          className="focus:ring-accent focus:border-accent"
          defaultValue={initialPrompt}
          required
        />
      </div>
      
      <SubmitButton />

      {state.message && !state.success && (
        <Alert variant="destructive" className="mt-4">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state.message && state.success && (
         <Alert variant="default" className="mt-4 bg-teal-50 border-teal-300 text-teal-800">
          <Terminal className="h-4 w-4 text-teal-600" />
          <AlertTitle className="text-teal-700">Success</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
