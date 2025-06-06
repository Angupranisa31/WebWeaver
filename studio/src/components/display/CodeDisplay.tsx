
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Download, RefreshCw, Code2, Eye, CodeXmlIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface CodeDisplayProps {
  generatedCode: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  canRegenerate: boolean;
}

export function CodeDisplay({ generatedCode, isLoading, onRegenerate, canRegenerate }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [iframeKey, setIframeKey] = useState(0); // To force iframe refresh

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        setCopied(true);
        toast({
          title: "Code Copied!",
          description: "The generated HTML/CSS has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy code to clipboard. Please try again.",
          variant: "destructive",
        });
      });
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'camped-code.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Code Downloaded!",
        description: "camped-code.html has been downloaded.",
      });
    }
  };

  useEffect(() => {
    setCopied(false);
    setIframeKey(prev => prev + 1); // Refresh iframe when code changes
  }, [generatedCode]);

  const iframeSrcDoc = generatedCode ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { padding: 1rem; margin: 0; background-color: #fff; color: #000; }
        /* Add any specific styles needed for preview if tailwind CDN isn't enough */
      </style>
    </head>
    <body>
      ${generatedCode}
    </body>
    </html>
  ` : "";

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-semibold font-headline text-primary">Output</h2>
        {generatedCode && !isLoading && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={!canRegenerate || isLoading}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="code" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="code"><Code2 className="mr-2 h-4 w-4" />Code</TabsTrigger>
          <TabsTrigger value="preview"><Eye className="mr-2 h-4 w-4" />Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="flex-grow rounded-md border border-border bg-secondary/30 p-1 min-h-[200px]">
          <ScrollArea className="h-full max-h-[calc(100vh-400px)] md:max-h-full">
            <div className="p-1 md:p-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
                  <CodeXmlIcon className="w-12 h-12 animate-pulse text-primary" />
                  <p className="mt-4 text-lg">Generating your code...</p>
                  <p className="text-sm">Please wait a moment.</p>
                </div>
              ) : generatedCode ? (
                <SyntaxHighlighter 
                  language="htmlbars" // htmlbars is good for html/handlebars like syntax
                  style={atomDark} 
                  customStyle={{ background: 'transparent', padding: '0.5rem', margin: '0', fontSize: '0.875rem', overflowX: 'auto' }}
                  lineNumberStyle={{ color: '#666', marginRight: '1em' }}
                  showLineNumbers={false} // Set to true if you want line numbers
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
                  <CodeXmlIcon className="w-12 h-12 text-gray-400" />
                  <p className="mt-4 text-lg">Your generated code will appear here.</p>
                  <p className="text-sm">Enter a prompt and click "Generate Code" to start.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="preview" className="flex-grow rounded-md border border-border bg-white min-h-[200px]">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
                <Eye className="w-12 h-12 animate-pulse text-primary" />
                <p className="mt-4 text-lg">Loading preview...</p>
             </div>
          ) : generatedCode ? (
            <iframe
              key={iframeKey} // Force re-render on code change
              srcDoc={iframeSrcDoc}
              title="Generated Code Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin" // Allow scripts for potential Tailwind JIT, same-origin for local assets if any
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
              <Eye className="w-12 h-12 text-gray-400" />
              <p className="mt-4 text-lg">Preview will appear here once code is generated.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
