
"use server";

import { generateCampedUICode, type GenerateCampedUICodeInput } from '@/ai/flows/generate-camped-ui-code';
import { z } from 'zod';

const GenerateCodeSchema = z.object({
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters long." }),
});

export interface GenerateCodeFormState {
  message: string | null;
  generatedCode: string | null;
  success: boolean;
  promptUsed?: string | null;
}

export async function generateCodeAction(
  prevState: GenerateCodeFormState,
  formData: FormData
): Promise<GenerateCodeFormState> {
  const promptValue = formData.get('prompt');
  const validatedFields = GenerateCodeSchema.safeParse({
    prompt: promptValue,
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.prompt?.[0] ?? "Invalid prompt.",
      generatedCode: null,
      success: false,
      promptUsed: typeof promptValue === 'string' ? promptValue : null,
    };
  }

  const input: GenerateCampedUICodeInput = {
    description: validatedFields.data.prompt,
  };

  try {
    const result = await generateCampedUICode(input);
    if (result && result.code) {
      return {
        message: "Code generated successfully!",
        generatedCode: result.code,
        success: true,
        promptUsed: validatedFields.data.prompt,
      };
    } else {
      return {
        message: "Failed to generate code. The AI returned an empty response.",
        generatedCode: null,
        success: false,
        promptUsed: validatedFields.data.prompt,
      };
    }
  } catch (error) {
    console.error("Error generating code:", error);
    return {
      message: "An unexpected error occurred while generating code. Please try again.",
      generatedCode: null,
      success: false,
      promptUsed: validatedFields.data.prompt,
    };
  }
}

export async function regenerateCodeWithPrompt(prompt: string): Promise<GenerateCodeFormState> {
  const validatedFields = GenerateCodeSchema.safeParse({ prompt });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.prompt?.[0] ?? "Invalid prompt.",
      generatedCode: null,
      success: false,
      promptUsed: prompt,
    };
  }

  const input: GenerateCampedUICodeInput = {
    description: validatedFields.data.prompt,
  };

  try {
    const result = await generateCampedUICode(input);
    if (result && result.code) {
      return {
        message: "Code regenerated successfully!",
        generatedCode: result.code,
        success: true,
        promptUsed: validatedFields.data.prompt,
      };
    } else {
      return {
        message: "Failed to regenerate code. The AI returned an empty response.",
        generatedCode: null,
        success: false,
        promptUsed: validatedFields.data.prompt,
      };
    }
  } catch (error) {
    console.error("Error regenerating code:", error);
    return {
      message: "An unexpected error occurred while regenerating code. Please try again.",
      generatedCode: null,
      success: false,
      promptUsed: prompt,
    };
  }
}
