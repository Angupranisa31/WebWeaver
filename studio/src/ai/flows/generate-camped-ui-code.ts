
'use server';

/**
 * @fileOverview Generates HTML/CSS code using Tailwind CSS from a structured text description,
 * ensuring consistency with CampEdUI (ShadCN) design principles.
 *
 * - generateCampedUICode - A function that generates HTML/CSS code.
 * - GenerateCampedUICodeInput - The input type for the generateCampedUICode function.
 * - GenerateCampedUICodeOutput - The return type for the generateCampedUICode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampedUICodeInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A structured text description of the webpage or UI component to generate.'
    ),
});
export type GenerateCampedUICodeInput = z.infer<typeof GenerateCampedUICodeInputSchema>;

const GenerateCampedUICodeOutputSchema = z.object({
  code: z
    .string()
    .describe(
      'The generated HTML code, styled with Tailwind CSS, that matches the description and CampEdUI principles.'
    ),
});
export type GenerateCampedUICodeOutput = z.infer<typeof GenerateCampedUICodeOutputSchema>;

export async function generateCampedUICode(input: GenerateCampedUICodeInput): Promise<GenerateCampedUICodeOutput> {
  return generateCampedUICodeFlow(input);
}

const generateCampedUICodePrompt = ai.definePrompt({
  name: 'generateCampedUICodePrompt',
  input: {schema: GenerateCampedUICodeInputSchema},
  output: {schema: GenerateCampedUICodeOutputSchema},
  prompt: `You are an expert web developer specializing in generating clean, semantic, accessible, and responsive HTML code styled with Tailwind CSS.
The generated code MUST be designed to be visually and structurally consistent with a UI system like CampEdUI (which is based on ShadCN UI components). This means:
- Use Tailwind CSS classes to achieve styling that resembles CampEdUI components (e.g., for buttons, cards, inputs, typography).
- Prioritize clear visual hierarchy, appropriate spacing, and modern aesthetics typical of such design systems.
- If the description implies a standard component like a card, button, or navigation, structure the HTML and apply Tailwind classes to make it look like a well-crafted CampEdUI/ShadCN component.

You will receive a description of a UI component or webpage section. Your task is to generate the corresponding HTML structure.
Apply Tailwind CSS classes directly to the HTML elements for styling.
Ensure the generated code adheres to the following principles:
- Clean and readable: Well-formatted, easy to understand.
- Semantic HTML: Use appropriate HTML5 tags (e.g., <nav>, <article>, <aside>, <figure>, <figcaption>, <header>, <footer>, <main>, <section>).
- Accessibility (a11y): Include ARIA attributes where necessary and follow WCAG guidelines (e.g., alt text for images, proper heading structure, keyboard navigability considerations).
- Responsiveness: Use Tailwind's responsive prefixes (e.g., sm:, md:, lg:) to ensure the layout adapts well to different screen sizes.
- Modern aesthetics consistent with CampEdUI/ShadCN: Create visually appealing layouts. Do not use inline styles (style="..."). Rely solely on Tailwind CSS classes.

Description: {{{description}}}

Return only the HTML code. Do not include any explanations, markdown formatting, or other text outside of the HTML code block.
`,
});

const generateCampedUICodeFlow = ai.defineFlow(
  {
    name: 'generateCampedUICodeFlow',
    inputSchema: GenerateCampedUICodeInputSchema,
    outputSchema: GenerateCampedUICodeOutputSchema,
  },
  async input => {
    const {output} = await generateCampedUICodePrompt(input);
    return output!;
  }
);

