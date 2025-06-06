
WebWeaver - AI Code Generator

WebWeaver is a smart web development assistant that takes your text prompts and transforms them into clean, semantic, and responsive HTML/CSS code. It harnesses the power of AI to generate code that follows modern UI design principles, similar to design systems like ShadCN UI, and uses Tailwind CSS for styling.

Features

* AI-powered code generation — just describe a UI component or section, and WebWeaver will generate the corresponding HTML with Tailwind CSS.
* Live preview pane to instantly visualize the generated code.
* Option to export or download your code as a html file.
* Regenerate feature if you're not happy with the output.
* Syntax highlighting for better readability.
* Clean, semantic, accessible, and responsive code aligned with best practices.
* Output follows the look and feel of CampEdUI design systems.

Tech Stack

* Frontend: Next.js (App Router), React, TypeScript
* Styling: Tailwind CSS
* UI Components: CampEdUI
* AI Integration: Firebase Genkit with Google Gemini models

Technical Approach and Integration

WebWeaver takes a thoughtful approach to converting natural language into high-quality code using Firebase Genkit and Google's Gemini large language models (LLMs).

    1. Core Architecture: Genkit and Next.js

The app is built on Next.js, offering a modern frontend with React Server Components and Server Actions for optimized UI and data handling. Firebase Genkit powers all AI features, providing a clean way to define and deploy generative AI workflows.

    2. Model Selection: Google Gemini

We use Google’s Gemini 2.0 Flash model via the googleAI plugin in Genkit. It’s a solid choice for:

* Code generation across HTML, CSS, and more
* Following complex instructions effectively
* Strong Tailwind CSS understanding
* Easy integration with Genkit, reducing dev overhead

    3. "Training" Through Prompt Engineering

Instead of training a custom model, we rely on advanced prompt engineering. The heart of this lives in src/ai/flows/generate-camped-ui-code.ts. Here’s what the prompt does:

* Sets the AI’s role as an expert web developer who writes clean, semantic, and responsive HTML styled with Tailwind CSS.
* Instructs the AI to align output with CampEdUI/ShadCN design systems, focusing on visual hierarchy, spacing, and modern aesthetics.
* Encourages semantic tags, a11y (accessibility) features, and responsive Tailwind classes.
* Maintains well-structured output using Zod schemas to validate the input/output format.

This method allows for flexibility and ongoing refinement without needing to retrain the model.

    4. Integrating CampEdUI (ShadCN UI Philosophy)

Integration happens in two ways:

* The WebWeaver UI itself is built using ShadCN components for a cohesive, modern experience.
* The AI-generated code is tailored to match the style and structure of CampEdUI elements, even though it outputs raw HTML instead of React components.

That means the code doesn’t just work — it looks good and fits right into modern UIs.

    5. Genkit Flows: Orchestrating AI Interactions

We use Genkit flows (ai.defineFlow) to manage how prompts are processed:

* The user’s input is passed through a defined prompt.
* Gemini returns a response, which is then parsed and shown.
* These flows, defined in src/ai/flows/, keep the system modular and maintainable.

With Google’s Gemini, Firebase Genkit, and solid prompt engineering, WebWeaver becomes a powerful prototyping tool for developers.



Getting Started

Want to run it locally? Follow the steps below.

    Prerequisites

* Node.js (v18 or later)
* npm or yarn

    Environment Variables

To run WebWeaver, you need a Google AI API key.

1. Create a .env file in your root directory.
2. Add your Google AI key like this:


GOOGLE_API_KEY=your_google_api_key_here


Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    Installation

1. Clone the repo:

git clone <your-repository-url>
cd webweaver


2. Install dependencies:

npm install
   or
yarn install


3. Running the App

1. Start the Next.js dev server:

npm run dev
# or
yarn dev


It will usually run at http://localhost:9000.

2. In another terminal, start the Genkit dev server:

npm run genkit:dev


For hot-reloading:


npm run genkit:watch


Genkit flows typically run at `http://localhost:3400`.

Project Structure

* `src/app/`: Next.js pages, layout, and server logic
* `src/components/`: Reusable UI elements

  * `src/components/ui/`: ShadCN UI-based components
* `src/ai/`: All Genkit-related files

  * `src/ai/flows/`: Prompt logic and flow definitions
  * `src/ai/genkit.ts`: Genkit setup
  * `src/ai/dev.ts`: Dev server entry point for Genkit
* `public/`: Static files
* `tailwind.config.ts`: Tailwind setup
* `globals.css`: Global styles and Tailwind variables

How to Use WebWeaver

1. Open the app in your browser (usually `http://localhost:9002`).

2. Enter a prompt like:

   * "A hero section with a large headline 'Welcome to WebWeaver!', a sub-headline, and two buttons: 'Get Started' and 'Learn More'."
   * "A pricing card with a title 'Pro Plan', a price '\$49/mo', a list of three features, and a 'Sign Up' button."

3. Click "Generate Code."

4. View the output:

   * "Code" tab shows the raw HTML with syntax highlighting.
   * "Preview" tab shows the rendered version.

5. Use the generated content:

   * Copy it to your clipboard.
   * Download as an HTML file.
   * Regenerate if you want a different take.

6. Use the "Example Prompts" to explore common UI patterns quickly.

Customization

* Want to tweak AI output? Adjust the flow logic and prompt text in `src/ai/flows/`.
* Need to change the look of the app? Edit the theme in `globals.css` and `tailwind.config.ts`.

 Contributing

Have ideas or bugs to report? Feel free to open an issue or send in a pull request — contributions are always welcome.

