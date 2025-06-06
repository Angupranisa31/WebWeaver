'use server';
/**
 * @fileOverview Generates HTML/CSS code from a text prompt using CampEdUI components.
 *
 * - generateCodeFromPrompt - A function that takes a text prompt and returns generated HTML/CSS code.
 * - GenerateCodeFromPromptInput - The input type for the generateCodeFromPrompt function.
 * - GenerateCodeFromPromptOutput - The return type for the generateCodeFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeFromPromptInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate HTML/CSS code from.'),
});
export type GenerateCodeFromPromptInput = z.infer<typeof GenerateCodeFromPromptInputSchema>;

const GenerateCodeFromPromptOutputSchema = z.object({
  code: z.string().describe('The generated HTML/CSS code using CampEdUI components.'),
});
export type GenerateCodeFromPromptOutput = z.infer<typeof GenerateCodeFromPromptOutputSchema>;

export async function generateCodeFromPrompt(input: GenerateCodeFromPromptInput): Promise<GenerateCodeFromPromptOutput> {
  return generateCodeFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeFromPromptInputSchema},
  output: {schema: GenerateCodeFromPromptOutputSchema},
  prompt: `You are an expert web developer who specializes in generating HTML/CSS code using the CampEdUI design system.

  Given the following text prompt, generate HTML/CSS code that uses CampEdUI components to create a simple webpage layout.

  Ensure that the generated code is clean, semantic, and structured, and that it follows best practices for accessibility and responsiveness.

  Text Prompt: {{{prompt}}}

  The generated code should be compatible with the CampEdUI design system and follow its styling conventions.

  Here's an example of how to use CampEdUI components:

  <Button>Click Me</Button>
  <Card>
    <Typography variant="h1">My Title</Typography>
    <Typography variant="body1">My Content</Typography>
  </Card>

  Make sure to use appropriate CampEdUI components for headers, paragraphs, images, and buttons as per the given input.

  Return only the code, do not include any explanations or other text.
  `,
});

const generateCodeFromPromptFlow = ai.defineFlow(
  {
    name: 'generateCodeFromPromptFlow',
    inputSchema: GenerateCodeFromPromptInputSchema,
    outputSchema: GenerateCodeFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
