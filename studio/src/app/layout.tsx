import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// PRD Fonts:
// Headlines: 'Space Grotesk' (sans-serif)
// Body text: 'Inter' (sans-serif)
// Code font: 'Source Code Pro' (monospace)

export const metadata: Metadata = {
  title: 'WebWeaver - AI Code Generator',
  description: 'Generate HTML/CSS from text prompts using AI, styled with Tailwind and ShadCN UI principles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
