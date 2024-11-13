import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Copy, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TASKS } from "../app/page";

export function ResultDisplay({ state, selectedTask }) {
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("txt");
  const resultRef = useRef(null);

  if (!state.content) return null;

  let content;
  try {
    content = JSON.parse(state.content);
  } catch (error) {
    console.error("Failed to parse content:", error);
    return (
      <Card className="mt-8 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">
            Error: Failed to parse content. Please try again.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-gray-600">
              Show raw response
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {state.content}
            </pre>
          </details>
        </CardContent>
      </Card>
    );
  }

  const handleCopy = () => {
    if (resultRef.current) {
      navigator.clipboard.writeText(resultRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (state.content) {
      const content = JSON.parse(state.content);
      let downloadContent = "";
      let filename = "";

      switch (selectedTask) {
        case "code":
          downloadContent = content.code || "";
          filename = "generated_code";
          break;
        case "copywriting":
          downloadContent = `${content.title || ""}\n\n${(
            content.sections || []
          )
            .map((s) => `${s.heading || ""}\n${s.content || ""}`)
            .join("\n\n")}`;
          filename = "generated_copy";
          break;
        case "quotes":
          downloadContent = `${content.quote || ""} - ${content.author || ""}`;
          filename = "generated_quote";
          break;
        case "creative":
          downloadContent = `${content.title || ""}\n\n${(
            content.paragraphs || []
          ).join("\n\n")}`;
          filename = "creative_writing";
          break;
        case "analysis":
          downloadContent = `Summary: ${
            content.summary || ""
          }\n\nKey Points:\n${(content.keyPoints || []).join(
            "\n"
          )}\n\nSentiment: ${content.sentiment || ""}`;
          filename = "text_analysis";
          break;
      }

      const blob = new Blob([downloadContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.${downloadFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const commonStats = (
    <div className="mt-4 flex justify-between text-sm text-gray-500">
      <span>Word count: {content.wordCount || 0}</span>
      <span>Characters: {content.characterCount || 0}</span>
      {content.readingTime && (
        <span>Reading time: {content.readingTime} min</span>
      )}
    </div>
  );

  const responseContent = (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{TASKS[selectedTask].label} Result</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedTask === "code" && (
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
              {content.usage && <TabsTrigger value="usage">Usage</TabsTrigger>}
            </TabsList>
            <TabsContent value="code">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                className="rounded-lg"
              >
                {content.code || "No code generated"}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="explanation">
              <p className="text-gray-700">
                {content.explanation || "No explanation provided"}
              </p>
            </TabsContent>
            {content.usage && (
              <TabsContent value="usage">
                <p className="text-gray-700">{content.usage}</p>
              </TabsContent>
            )}
          </Tabs>
        )}
        {selectedTask === "copywriting" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {content.title || "Untitled"}
            </h2>
            {(content.sections || []).map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {section.heading || `Section ${index + 1}`}
                </h3>
                <p className="text-gray-700">
                  {section.content || "No content"}
                </p>
              </div>
            ))}
            {content.callToAction && (
              <Button className="mt-4 bg-gradient-to-r from-green-500 to-teal-600 text-white">
                {content.callToAction}
              </Button>
            )}
          </div>
        )}
        {selectedTask === "quotes" && (
          <div className="space-y-4">
            <blockquote className="text-2xl italic text-gray-700 border-l-4 border-yellow-500 pl-4 py-2">
              &ldquo;{content.quote || "No quote generated"}&rdquo;
            </blockquote>
            <p className="text-right text-gray-600">
              - {content.author || "Unknown"}
            </p>
            {content.context && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Context:</h4>
                <p className="text-gray-700">{content.context}</p>
              </div>
            )}
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {selectedTask === "creative" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {content.title || "Untitled"}
            </h2>
            {(content.paragraphs || []).map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
            {content.characters && content.characters.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Characters:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  {content.characters.map((character, index) => (
                    <li key={index}>{character}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {selectedTask === "analysis" && (
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <p className="text-gray-700">
                {content.summary || "No summary provided"}
              </p>
            </TabsContent>
            <TabsContent value="keyPoints">
              <ul className="list-disc pl-5 text-gray-700">
                {(content.keyPoints || []).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="sentiment">
              <p className="text-gray-700">
                Overall sentiment: {content.sentiment || "Not analyzed"}
              </p>
              {content.sentimentBreakdown && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">
                    Sentiment Breakdown:
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {Object.entries(content.sentimentBreakdown).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}%
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        {commonStats}
      </CardContent>
    </Card>
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Result</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy to clipboard</span>
          </Button>
          <Select value={downloadFormat} onValueChange={setDownloadFormat}>
            <SelectTrigger className="w-[100px] bg-white text-gray-800 border-gray-300">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="md">MD</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Download result</span>
          </Button>
        </div>
      </div>
      {responseContent}
    </div>
  );
}
