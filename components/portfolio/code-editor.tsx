"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  ChevronDown,
  File,
  FileJson,
  FileType,
  FileCode,
  Folder,
  FolderOpen,
  X,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// File type icons mapping
const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
      return <FileCode className="w-4 h-4 text-blue-400" />;
    case "js":
    case "jsx":
      return <FileCode className="w-4 h-4 text-yellow-400" />;
    case "json":
      return <FileJson className="w-4 h-4 text-yellow-500" />;
    case "css":
    case "scss":
      return <FileType className="w-4 h-4 text-purple-400" />;
    case "md":
      return <File className="w-4 h-4 text-gray-400" />;
    default:
      return <File className="w-4 h-4 text-gray-400" />;
  }
};

// Types
export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: CodeLine[];
}

export interface CodeLine {
  lineNum: number;
  content: string; // HTML content with syntax highlighting
}

export interface EditorTab {
  id: string;
  name: string;
  content: CodeLine[];
}

interface CodeEditorProps {
  files: FileNode[];
  defaultOpenFile?: string;
  defaultOpenFolders?: string[];
  showFileTree?: boolean;
  showTabs?: boolean;
  showTerminal?: boolean;
  terminalContent?: React.ReactNode;
  className?: string;
  typingEffect?: boolean;
  typingSpeed?: number;
  onFileSelect?: (fileId: string) => void;
}

// Recursive File Tree Item Component
function FileTreeItem({
  node,
  depth = 0,
  openFolders,
  activeFile,
  onToggleFolder,
  onSelectFile,
}: {
  node: FileNode;
  depth?: number;
  openFolders: Set<string>;
  activeFile: string | null;
  onToggleFolder: (id: string) => void;
  onSelectFile: (node: FileNode) => void;
}) {
  const isOpen = openFolders.has(node.id);
  const isActive = activeFile === node.id;
  const paddingLeft = depth * 12 + 8;

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => onToggleFolder(node.id)}
          className={cn(
            "w-full flex items-center gap-1.5 py-1 text-sm cursor-pointer hover:bg-editor-selection/50 transition-colors",
            "text-muted-foreground hover:text-foreground",
          )}
          style={{ paddingLeft }}
        >
          {isOpen ? (
            <ChevronDown className="w-3 h-3 shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 shrink-0" />
          )}
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-primary/70 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-primary/70 shrink-0" />
          )}
          <span className="truncate font-medium">{node.name}</span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children.map((child) => (
                <FileTreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  openFolders={openFolders}
                  activeFile={activeFile}
                  onToggleFolder={onToggleFolder}
                  onSelectFile={onSelectFile}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelectFile(node)}
      className={cn(
        "w-full flex items-center gap-1.5 py-1 text-sm cursor-pointer transition-colors",
        isActive
          ? "bg-editor-selection text-foreground"
          : "text-muted-foreground hover:bg-editor-selection/50 hover:text-foreground",
      )}
      style={{ paddingLeft: paddingLeft + 16 }}
    >
      {getFileIcon(node.name)}
      <span className="truncate">{node.name}</span>
    </button>
  );
}

// Helper to find all files recursively
function getAllFiles(nodes: FileNode[]): FileNode[] {
  const files: FileNode[] = [];
  const traverse = (nodeList: FileNode[]) => {
    for (const node of nodeList) {
      if (node.type === "file") {
        files.push(node);
      } else if (node.children) {
        traverse(node.children);
      }
    }
  };
  traverse(nodes);
  return files;
}

// Helper to find a file by ID
function findFileById(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function CodeEditor({
  files,
  defaultOpenFile,
  defaultOpenFolders = [],
  showFileTree = true,
  showTabs = true,
  showTerminal = false,
  terminalContent,
  className,
  typingEffect = false,
  typingSpeed = 25,
  onFileSelect,
}: CodeEditorProps) {
  // State
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(defaultOpenFolders),
  );
  const [openTabs, setOpenTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileFileSheetOpen, setMobileFileSheetOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Close active tab (for keyboard shortcut)
  const closeActiveTab = useCallback(() => {
    if (!activeTabId) return;
    setOpenTabs((prev) => {
      const filtered = prev.filter((tab) => tab.id !== activeTabId);
      if (filtered.length > 0) {
        setActiveTabId(filtered[filtered.length - 1].id);
      } else {
        setActiveTabId(null);
      }
      return filtered;
    });
  }, [activeTabId]);

  // Switch to next/previous tab
  const switchTab = useCallback(
    (direction: "next" | "prev") => {
      if (openTabs.length <= 1) return;
      const currentIndex = openTabs.findIndex((tab) => tab.id === activeTabId);
      let newIndex: number;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % openTabs.length;
      } else {
        newIndex = currentIndex <= 0 ? openTabs.length - 1 : currentIndex - 1;
      }
      setActiveTabId(openTabs[newIndex].id);
    },
    [openTabs, activeTabId],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if editor is focused or no specific element is focused
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      // Ctrl/Cmd + B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
      // Alt + W: Close active tab (non-conflicting)
      if (e.altKey && e.key === "w") {
        e.preventDefault();
        closeActiveTab();
      }
      // Alt + ] or Ctrl/Cmd + ]: Next tab
      if ((e.altKey || e.ctrlKey || e.metaKey) && e.key === "]") {
        e.preventDefault();
        switchTab("next");
      }
      // Alt + [ or Ctrl/Cmd + [: Previous tab
      if ((e.altKey || e.ctrlKey || e.metaKey) && e.key === "[") {
        e.preventDefault();
        switchTab("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeActiveTab, switchTab]);

  // Typing effect state
  const [displayedLines, setDisplayedLines] = useState<CodeLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingFileId, setTypingFileId] = useState<string | null>(null);

  // Get current active tab content
  const activeTab = useMemo(
    () => openTabs.find((tab) => tab.id === activeTabId),
    [openTabs, activeTabId],
  );

  // Initialize with default open file
  useEffect(() => {
    if (defaultOpenFile && files.length > 0) {
      const file = findFileById(files, defaultOpenFile);
      if (file && file.content) {
        const tab: EditorTab = {
          id: file.id,
          name: file.name,
          content: file.content,
        };
        setOpenTabs([tab]);
        setActiveTabId(file.id);

        if (typingEffect) {
          setTypingFileId(file.id);
          setTimeout(() => setTypingStarted(true), 500);
        }
      }
    }
  }, [defaultOpenFile, files, typingEffect]);

  // Toggle folder open/close
  const handleToggleFolder = useCallback((folderId: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  }, []);

  // Select file and open in tab
  const handleSelectFile = useCallback(
    (node: FileNode) => {
      if (node.type !== "file" || !node.content) return;

      // Check if tab already exists
      const existingTab = openTabs.find((tab) => tab.id === node.id);
      if (existingTab) {
        setActiveTabId(node.id);
      } else {
        // Add new tab
        const newTab: EditorTab = {
          id: node.id,
          name: node.name,
          content: node.content,
        };
        setOpenTabs((prev) => [...prev, newTab]);
        setActiveTabId(node.id);
      }

      // Reset typing for new file
      if (typingEffect) {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setTypingFileId(node.id);
        setTypingStarted(false);
        setTimeout(() => setTypingStarted(true), 200);
      }

      // Close mobile sheet after selection
      setMobileFileSheetOpen(false);

      onFileSelect?.(node.id);
    },
    [openTabs, typingEffect, onFileSelect],
  );

  // Close tab
  const handleCloseTab = useCallback(
    (tabId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenTabs((prev) => {
        const filtered = prev.filter((tab) => tab.id !== tabId);
        // If closing active tab, switch to another
        if (activeTabId === tabId && filtered.length > 0) {
          setActiveTabId(filtered[filtered.length - 1].id);
        } else if (filtered.length === 0) {
          setActiveTabId(null);
        }
        return filtered;
      });
    },
    [activeTabId],
  );

  // Typing effect
  useEffect(() => {
    if (!typingEffect || !typingStarted || !activeTab) return;
    if (typingFileId !== activeTabId) return;

    const lines = activeTab.content;
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    // Extract plain text from HTML
    const getPlainText = (html: string) => {
      if (typeof window === "undefined") return html;
      const temp = document.createElement("div");
      temp.innerHTML = html;
      return temp.textContent || "";
    };

    const plainText = getPlainText(currentLine.content);

    if (currentCharIndex === 0 && displayedLines.length <= currentLineIndex) {
      setDisplayedLines((prev) => [
        ...prev,
        { lineNum: currentLine.lineNum, content: "" },
      ]);
    }

    if (currentCharIndex < plainText.length) {
      const timer = setTimeout(
        () => {
          const targetLength = currentCharIndex + 1;
          const htmlContent = currentLine.content;
          let visibleChars = 0;
          let result = "";

          for (
            let i = 0;
            i < htmlContent.length && visibleChars < targetLength;
            i++
          ) {
            const char = htmlContent[i];
            if (char === "<") {
              const closingIndex = htmlContent.indexOf(">", i);
              if (closingIndex !== -1) {
                result += htmlContent.slice(i, closingIndex + 1);
                i = closingIndex;
              }
            } else {
              result += char;
              visibleChars++;
            }
          }

          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (newLines[currentLineIndex]) {
              newLines[currentLineIndex] = {
                lineNum: currentLine.lineNum,
                content: result,
              };
            }
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        },
        typingSpeed + Math.random() * 15,
      );
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 50);
    }
  }, [
    typingEffect,
    typingStarted,
    activeTab,
    activeTabId,
    typingFileId,
    currentLineIndex,
    currentCharIndex,
    displayedLines.length,
    typingSpeed,
  ]);

  // Lines to display (either typing effect or full content)
  const linesToDisplay = useMemo(() => {
    if (typingEffect && typingFileId === activeTabId) {
      return displayedLines;
    }
    return activeTab?.content || [];
  }, [typingEffect, typingFileId, activeTabId, displayedLines, activeTab]);

  const isTypingComplete =
    !typingEffect ||
    typingFileId !== activeTabId ||
    currentLineIndex >= (activeTab?.content.length || 0);

  return (
    <div
      ref={editorRef}
      className={cn(
        "editor-window overflow-hidden lg:min-h-[500px] flex flex-col",
        className,
      )}
      tabIndex={0}
    >
      {/* Editor titlebar */}
      <div className="editor-titlebar min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="editor-dots">
            <div className="editor-dot editor-dot-red" />
            <div className="editor-dot editor-dot-yellow" />
            <div className="editor-dot editor-dot-green" />
          </div>
          {/* Sidebar toggle - shared for mobile & desktop */}
          {showFileTree && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    // Mobile: toggle mobile sheet, Desktop: toggle sidebar
                    if (window.innerWidth < 768) {
                      setMobileFileSheetOpen((prev) => !prev);
                    } else {
                      setSidebarOpen((prev) => !prev);
                    }
                  }}
                  className="p-1 rounded hover:bg-editor-selection/50 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen || mobileFileSheetOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <PanelLeft className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Toggle Sidebar{" "}
                <kbd className="ml-1 px-1 py-0.5 bg-muted rounded text-[10px]">
                  ⌘B
                </kbd>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {showTabs && openTabs.length > 0 && (
          <ScrollArea className="flex-1 min-w-0">
            <div className="flex">
              {openTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 sm:px-3 py-2 text-xs font-medium border-r border-border/50 whitespace-nowrap transition-colors shrink-0",
                    activeTabId === tab.id
                      ? "bg-editor-bg text-foreground border-b-2 border-b-primary"
                      : "bg-editor-line/30 text-muted-foreground hover:text-foreground hover:bg-editor-line/50",
                  )}
                >
                  {getFileIcon(tab.name)}
                  <span className="max-w-[80px] sm:max-w-none truncate">
                    {tab.name}
                  </span>
                  <span
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className={cn(
                      "ml-1 rounded p-0.5 transition-all hover:bg-muted",
                      activeTabId === tab.id
                        ? "opacity-60 hover:opacity-100"
                        : "opacity-0 group-hover:opacity-60 hover:!opacity-100",
                    )}
                  >
                    <X className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>
        )}
      </div>

      {/* Editor body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[200px] sm:min-h-[250px] max-h-[300px] sm:max-h-[400px] lg:max-h-none overflow-hidden relative">
        {/* Mobile backdrop */}
        <AnimatePresence initial={false}>
          {showFileTree && mobileFileSheetOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden absolute inset-0 bg-black/50 z-10"
              onClick={() => setMobileFileSheetOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* File tree sidebar - shared for mobile & desktop */}
        <AnimatePresence initial={false}>
          {showFileTree && (sidebarOpen || mobileFileSheetOpen) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 192, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn(
                "border-r border-border bg-editor-line/50 shrink-0 overflow-hidden flex flex-col",
                // Desktop: inline, Mobile: overlay
                mobileFileSheetOpen
                  ? "absolute left-0 top-0 bottom-0 z-20 bg-editor-bg"
                  : "hidden md:flex",
              )}
            >
              <div className="px-3 py-2 flex items-center justify-between shrink-0">
                <span className="text-xs uppercase text-muted-foreground font-medium">
                  Explorer
                </span>
                {/* Close button - only on mobile */}
                <button
                  onClick={() => setMobileFileSheetOpen(false)}
                  className="md:hidden p-0.5 rounded hover:bg-editor-selection/50 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full w-48">
                  <div className="py-1">
                    {files.map((node) => (
                      <FileTreeItem
                        key={node.id}
                        node={node}
                        openFolders={openFolders}
                        activeFile={activeTabId}
                        onToggleFolder={handleToggleFolder}
                        onSelectFile={handleSelectFile}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code content */}
        <div className="flex-1 min-w-0 relative">
          <div className="absolute inset-0 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="editor-content text-xs sm:text-sm">
                {activeTab ? (
                  <div className="inline-block min-w-full">
                    {linesToDisplay.map((line, idx) => (
                      <div key={line.lineNum} className="flex">
                        <span className="editor-line-numbers w-6 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-4">
                          {line.lineNum}
                        </span>
                        <span className="pl-2 sm:pl-4 whitespace-pre">
                          <span
                            dangerouslySetInnerHTML={{ __html: line.content }}
                          />
                          {typingEffect &&
                            typingFileId === activeTabId &&
                            idx === linesToDisplay.length - 1 &&
                            !isTypingComplete && (
                              <motion.span
                                className="inline-block w-2 h-4 sm:h-5 bg-primary ml-0.5 align-middle"
                                animate={{ opacity: [1, 0] }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                }}
                              />
                            )}
                        </span>
                      </div>
                    ))}
                    {/* Cursor on new line after typing complete */}
                    {isTypingComplete && activeTab.content.length > 0 && (
                      <div className="flex">
                        <span className="editor-line-numbers w-6 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-4">
                          {activeTab.content.length + 1}
                        </span>
                        <span className="pl-2 sm:pl-4">
                          <motion.span
                            className="inline-block w-2 h-4 sm:h-5 bg-primary"
                            animate={{ opacity: [1, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground text-sm">
                    Select a file to view its contents
                  </div>
                )}
              </div>
              <ScrollBar orientation="vertical" />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Terminal at bottom */}
      {showTerminal && (
        <div className="border-t border-border bg-terminal-bg p-3">
          {terminalContent || (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-terminal-green">❯</span>
              <motion.span
                className="inline-block w-2 h-3 bg-primary"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-built syntax highlighting helpers
export const syntax = {
  keyword: (text: string) => `<span class="syntax-keyword">${text}</span>`,
  variable: (text: string) => `<span class="syntax-variable">${text}</span>`,
  string: (text: string) => `<span class="syntax-string">"${text}"</span>`,
  number: (text: string) => `<span class="syntax-number">${text}</span>`,
  function: (text: string) => `<span class="syntax-function">${text}</span>`,
  comment: (text: string) => `<span class="syntax-comment">// ${text}</span>`,
  operator: (text: string) => `<span class="syntax-operator">${text}</span>`,
  type: (text: string) => `<span class="syntax-type">${text}</span>`,
};

// Helper to create code lines from template
export function createCodeLines(lines: string[]): CodeLine[] {
  return lines.map((content, idx) => ({
    lineNum: idx + 1,
    content,
  }));
}
