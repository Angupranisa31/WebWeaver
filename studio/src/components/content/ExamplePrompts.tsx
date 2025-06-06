"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const examplePromptsList = [
  {
    id: "1",
    title: "Hero Section",
    description: "A landing page hero section with a large headline 'Welcome to CampEd!', a sub-headline 'Your journey to amazing UI starts here.', and a call-to-action button 'Get Started'. Include a placeholder image on the right, 600x400 pixels."
  },
  {
    id: "2",
    title: "User Profile Card",
    description: "A card component displaying a user profile. It should have a circular avatar (placeholder image 100x100 pixels), the name 'Alex Doe', job title 'Lead Designer', and a short bio: 'Passionate about creating intuitive and beautiful user experiences.'"
  },
  {
    id: "3",
    title: "Simple Navigation Bar",
    description: "A simple navigation bar. It should have a logo text 'CampEdUI' on the left. On the right, include three navigation links: 'Home', 'Features', and 'Pricing'."
  },
];

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export function ExamplePrompts({ onPromptSelect }: ExamplePromptsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center">
        <Lightbulb className="mr-2 h-5 w-5 text-accent" />
        Example Prompts
      </h2>
      <div className="space-y-4">
        {examplePromptsList.map((prompt) => (
          <Card key={prompt.id} className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-headline">{prompt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{prompt.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPromptSelect(prompt.description)}
                className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Use this prompt
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
