"use client";

import { useRef, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGUAGE_EXT: Record<string, string> = {
  javascript: "js",
  js: "js",
  typescript: "ts",
  ts: "ts",
  tsx: "tsx",
  jsx: "jsx",
  python: "py",
  py: "py",
  html: "html",
  css: "css",
  json: "json",
  bash: "sh",
  shell: "sh",
  sh: "sh",
  sql: "sql",
  md: "md",
  markdown: "md",
  yaml: "yml",
  yml: "yml",
  xml: "xml",
  rust: "rs",
  rs: "rs",
  go: "go",
  java: "java",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  cs: "cs",
  php: "php",
  ruby: "rb",
  rb: "rb",
  swift: "swift",
  kotlin: "kt",
  kt: "kt",
  scala: "scala",
};

function getExtension(className: string | undefined): string {
  if (!className) return "txt";
  const match = className.match(/language-(\w+)/);
  const lang = match?.[1]?.toLowerCase() ?? "";
  return (LANGUAGE_EXT[lang] ?? lang) || "txt";
}

interface CodeBlockWithActionsProps {
  children?: React.ReactNode;
  className?: string;
  node?: unknown;
}

export function CodeBlockWithActions({
  children,
  className,
  ...props
}: CodeBlockWithActionsProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const getCodeText = (): string => {
    return preRef.current?.textContent ?? "";
  };

  const getLangFromChild = (): string => {
    const codeEl = preRef.current?.querySelector("code");
    const cls = codeEl?.className ?? "";
    const m = cls.match(/language-(\w+)/);
    return m?.[1] ?? "txt";
  };

  const handleCopy = async () => {
    const text = getCodeText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      //
    }
  };

  const handleDownload = () => {
    const text = getCodeText();
    if (!text) return;
    const ext = getExtension(`language-${getLangFromChild()}`);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="group relative my-4">
      <pre
        ref={preRef}
        className={cn("p-4 overflow-x-auto text-sm m-0 rounded-lg", className)}
        {...props}
      >
        {children}
      </pre>
      <div
        className={cn(
          "absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleCopy}
          title={copied ? "Copied" : "Copy"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleDownload}
          title={downloaded ? "Downloaded" : "Download"}
        >
          {downloaded ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
