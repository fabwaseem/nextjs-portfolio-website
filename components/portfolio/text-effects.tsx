"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function Typewriter({
  words,
  className,
  cursorClassName,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typeText = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      } else {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
        return;
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, delayBetweenWords]);

  useEffect(() => {
    const timeout = setTimeout(
      typeText,
      isDeleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={cn("inline-flex", className)}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block w-[3px] h-[1em] bg-primary ml-1",
          cursorClassName,
        )}
      />
    </span>
  );
}

interface CodeTypingProps {
  lines: { lineNum: number; content: string }[];
  className?: string;
  speed?: number;
  startDelay?: number;
}

export function CodeTyping({
  lines,
  className,
  speed = 30,
  startDelay = 500,
}: CodeTypingProps) {
  const [displayedLines, setDisplayedLines] = useState<
    { lineNum: number; content: string; isTyping: boolean }[]
  >([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // Get plain text from HTML content
  const getPlainText = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || "";
  };

  useEffect(() => {
    const startTimer = setTimeout(() => setIsStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    const plainText = getPlainText(currentLine.content);

    if (currentCharIndex === 0) {
      // Start new line
      setDisplayedLines((prev) => [
        ...prev,
        { lineNum: currentLine.lineNum, content: "", isTyping: true },
      ]);
    }

    if (currentCharIndex < plainText.length) {
      const timer = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            const lastIndex = newLines.length - 1;
            // Build up the HTML content character by character using the original HTML
            const targetLength = currentCharIndex + 1;
            let htmlContent = currentLine.content;
            let visibleChars = 0;
            let result = "";
            let inTag = false;

            for (
              let i = 0;
              i < htmlContent.length && visibleChars < targetLength;
              i++
            ) {
              const char = htmlContent[i];
              if (char === "<") {
                inTag = true;
                // Find the closing > and include the whole tag
                const closingIndex = htmlContent.indexOf(">", i);
                if (closingIndex !== -1) {
                  result += htmlContent.slice(i, closingIndex + 1);
                  i = closingIndex;
                }
                inTag = false;
              } else if (!inTag) {
                result += char;
                visibleChars++;
              }
            }

            newLines[lastIndex] = {
              ...newLines[lastIndex],
              content: result,
            };
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        },
        speed + Math.random() * 20,
      ); // Add slight randomness for realism
      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        newLines[newLines.length - 1].isTyping = false;
        return newLines;
      });
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
    }
  }, [isStarted, currentLineIndex, currentCharIndex, lines, speed]);

  return (
    <div className={cn("font-mono text-sm", className)}>
      <table className="w-full">
        <tbody>
          {displayedLines.map((line, idx) => (
            <tr key={line.lineNum}>
              <td className="editor-line-numbers w-8 select-none align-top text-editor-gutter pr-4">
                {line.lineNum}
              </td>
              <td className="pl-2">
                <span dangerouslySetInnerHTML={{ __html: line.content }} />
                {line.isTyping && idx === displayedLines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                  />
                )}
              </td>
            </tr>
          ))}
          {currentLineIndex >= lines.length && (
            <tr>
              <td className="editor-line-numbers w-8 select-none align-top text-editor-gutter pr-4">
                {lines.length + 1}
              </td>
              <td className="pl-2">
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block w-2 h-4 bg-primary"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

interface TerminalTypingProps {
  commands: {
    prompt: string;
    command: string;
    output?: string;
    delay?: number;
  }[];
  className?: string;
}

export function TerminalTyping({ commands, className }: TerminalTypingProps) {
  const [displayedCommands, setDisplayedCommands] = useState<
    {
      prompt: string;
      command: string;
      output?: string;
      isTyping: boolean;
      showOutput: boolean;
    }[]
  >([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const currentCommand = commands[currentCommandIndex];

    if (currentCharIndex === 0) {
      // Start new command
      setDisplayedCommands((prev) => [
        ...prev,
        { ...currentCommand, isTyping: true, showOutput: false },
      ]);
    }

    if (currentCharIndex < currentCommand.command.length) {
      const timer = setTimeout(
        () => {
          setDisplayedCommands((prev) => {
            const newCommands = [...prev];
            newCommands[newCommands.length - 1] = {
              ...newCommands[newCommands.length - 1],
              command: currentCommand.command.slice(0, currentCharIndex + 1),
            };
            return newCommands;
          });
          setCurrentCharIndex((prev) => prev + 1);
        },
        50 + Math.random() * 30,
      );
      return () => clearTimeout(timer);
    } else {
      // Command complete, show output after delay
      const outputDelay = currentCommand.delay || 300;
      const timer = setTimeout(() => {
        setDisplayedCommands((prev) => {
          const newCommands = [...prev];
          newCommands[newCommands.length - 1] = {
            ...newCommands[newCommands.length - 1],
            isTyping: false,
            showOutput: true,
          };
          return newCommands;
        });
        setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
      }, outputDelay);
      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex, currentCharIndex, commands]);

  return (
    <div className={cn("font-mono text-xs space-y-1", className)}>
      {displayedCommands.map((cmd, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-2">
            <span className="text-terminal-green">{cmd.prompt}</span>
            <span className="text-foreground">{cmd.command}</span>
            {cmd.isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block w-2 h-3 bg-primary"
              />
            )}
          </div>
          <AnimatePresence>
            {cmd.showOutput && cmd.output && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-terminal-green pl-4"
              >
                {cmd.output}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {currentCommandIndex >= commands.length && (
        <div className="flex items-center gap-2">
          <span className="text-terminal-green">❯</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block w-2 h-3 bg-primary"
          />
        </div>
      )}
    </div>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 text-primary/50 animate-pulse"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: "translate(-2px, -1px)",
        }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 text-cyan-500/30 animate-pulse"
        style={{
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: "translate(2px, 1px)",
          animationDelay: "0.1s",
        }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + idx * 0.08,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
