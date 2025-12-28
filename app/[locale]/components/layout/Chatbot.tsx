"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getDirection, type Locale } from "../../../i18n/config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  locale: Locale;
}

// Function to format message content with buttons for links
function formatMessage(content: string, isRTL: boolean, locale: string): React.ReactNode {
  // Clean markdown
  let cleanContent = content.replace(/\*\*/g, "").replace(/\*/g, "");

  // Check if message contains contact-related content
  const hasContactLink = cleanContent.includes("/contact") || cleanContent.includes("/ar/contact") || cleanContent.includes("/en/contact");
  const hasWhatsApp = cleanContent.includes("wa.me") || cleanContent.includes("+20 122 249 3500") || cleanContent.includes("واتساب") || cleanContent.includes("WhatsApp");

  // Remove the link text from content for cleaner display
  cleanContent = cleanContent
    .replace(/\/ar\/contact/g, "")
    .replace(/\/en\/contact/g, "")
    .replace(/صفحة التواصل/g, "")
    .replace(/contact page/gi, "")
    .replace(/أو من\s*/g, "")
    .replace(/or visit\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  // Split by newlines
  const lines = cleanContent.split("\n").filter((line) => line.trim());

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        // Handle bullet points
        if (line.startsWith("• ") || line.startsWith("- ")) {
          return (
            <div key={index} className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-[#1A4AFF]">•</span>
              <span>{line.substring(2)}</span>
            </div>
          );
        }
        return (
          <p key={index} className="leading-relaxed">
            {line}
          </p>
        );
      })}

      {/* Action Buttons */}
      {(hasContactLink || hasWhatsApp) && (
        <div className={`flex flex-wrap gap-2 mt-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          {hasWhatsApp && (
            <a
              href="https://wa.me/201222493500"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-medium rounded-full hover:bg-[#20bd5a] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isRTL ? "واتساب" : "WhatsApp"}
            </a>
          )}
          {hasContactLink && (
            <Link
              href={`/${locale}/contact`}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-[#122D8B] text-white text-xs font-medium rounded-full hover:bg-[#1A4AFF] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {isRTL ? "صفحة التواصل" : "Contact Us"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function Chatbot({ locale }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "chat">("menu");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  // Detect mobile using matchMedia - only for very small screens
  useEffect(() => {
    const media = window.matchMedia("(max-width: 360px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = isRTL ? "كيف يمكننا مساعدتك؟" : "How can we help?";

  // Show tooltip after delay
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
      setDisplayedText("");
      setIsTypingComplete(false);
    }
  }, [isOpen]);

  // Typewriter effect
  useEffect(() => {
    if (showTooltip && !isOpen) {
      setDisplayedText("");
      setIsTypingComplete(false);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showTooltip, isOpen, fullText]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (view === "chat" && isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [view, isOpen]);

  // Listen for openChatbot event from AIGuideSection
  useEffect(() => {
    const handleOpenChatbot = (e: CustomEvent<{ message: string }>) => {
      setIsOpen(true);
      setView("chat");
      // Set the message after a short delay to ensure chat is ready
      setTimeout(() => {
        setInputValue(e.detail.message);
        // Auto-send the message
        setTimeout(() => {
          const sendBtn = document.querySelector('[aria-label="Send message"]') as HTMLButtonElement;
          if (sendBtn) sendBtn.click();
        }, 100);
      }, 300);
    };

    window.addEventListener("openChatbot", handleOpenChatbot as EventListener);
    return () => window.removeEventListener("openChatbot", handleOpenChatbot as EventListener);
  }, []);

  // Add welcome message when chat starts
  useEffect(() => {
    if (view === "chat" && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: isRTL
          ? "مرحباً! 👋 أنا مساعد Edge الذكي. كيف يمكنني مساعدتك اليوم؟"
          : "Hi there! 👋 I'm Edge's AI assistant. How can I help you today?",
      };
      setMessages([welcomeMessage]);
    }
  }, [view, isRTL, messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
            .filter((m) => m.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
          language: locale,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isRTL
          ? "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة."
          : "Sorry, something went wrong. Please try again or contact us directly.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setView("menu");
    setMessages([]);
    setInputValue("");
  };

  const contactOptions = [
    {
      id: "ai-chat",
      label: isRTL ? "محادثة ذكية" : "AI Chat",
      subtitle: isRTL ? "تحدث مع مساعدنا الذكي" : "Talk to our AI assistant",
      color: "#8B5CF6",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <path d="M9 17h6" strokeLinecap="round" />
        </svg>
      ),
      action: () => setView("chat"),
    },
    {
      id: "whatsapp",
      label: isRTL ? "واتساب" : "WhatsApp",
      subtitle: isRTL ? "رد فوري" : "Instant reply",
      href: "https://wa.me/201222493500",
      color: "#25D366",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      id: "email",
      label: isRTL ? "البريد" : "Email",
      subtitle: "info@edgeforgarments.com",
      href: "mailto:info@edgeforgarments.com",
      color: "#122D8B",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
      // Set CSS variable for real viewport height (works with keyboard)
      const setVH = () => {
        const height = window.visualViewport?.height || window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${height * 0.01}px`);
      };
      setVH();
      window.visualViewport?.addEventListener("resize", setVH);
      window.addEventListener("resize", setVH);
      return () => {
        document.body.style.overflow = "";
        window.visualViewport?.removeEventListener("resize", setVH);
        window.removeEventListener("resize", setVH);
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  // Mobile fullscreen chat
  if (isMobile && isOpen) {
    return (
      <div 
        className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        {/* Header */}
        <div className="bg-[#122D8B] p-4 flex-shrink-0">
          <div className={`flex items-center justify-between gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              {view === "chat" && (
                <button
                  onClick={resetChat}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
                >
                  <svg className={`w-5 h-5 text-white ${isRTL ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <h3 className={`text-white font-semibold text-base ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {view === "chat" ? (isRTL ? "مساعد Edge" : "Edge AI") : (isRTL ? "تواصل معنا" : "Get in Touch")}
                </h3>
                <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className={`text-white/70 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "متصل" : "Online"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {view === "menu" ? (
          <div className="flex-1 p-4 overflow-y-auto min-h-0">
            {contactOptions.map((option) => {
              const Component = option.href ? "a" : "button";
              return (
                <Component
                  key={option.id}
                  href={option.href}
                  target={option.href?.startsWith("http") ? "_blank" : undefined}
                  rel={option.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={option.action}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 bg-slate-50 active:bg-slate-100 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: option.color }}>
                    {option.icon}
                  </div>
                  <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <p className={`font-medium text-slate-800 text-base ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{option.label}</p>
                    <p className={`text-slate-400 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{option.subtitle}</p>
                  </div>
                </Component>
              );
            })}
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? (isRTL ? "justify-start" : "justify-end") : (isRTL ? "justify-end" : "justify-start")}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-base ${
                      message.role === "user" ? "bg-[#122D8B] text-white rounded-br-md" : "bg-slate-100 text-slate-800 rounded-bl-md"
                    } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  >
                    {message.role === "assistant" ? formatMessage(message.content, isRTL, locale) : message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div 
              className="flex-shrink-0 p-4 border-t border-slate-100 bg-white sticky bottom-0"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
                  className={`flex-1 px-4 py-3 bg-slate-100 text-base outline-none rounded-xl ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className={`w-12 h-12 bg-[#122D8B] flex items-center justify-center text-white rounded-xl disabled:opacity-50 ${isRTL ? "rotate-180" : ""}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-50`}>
      {/* Tooltip */}
      <div
        className={`absolute bottom-[72px] ${isRTL ? "left-0" : "right-0"} transition-all duration-300 ${
          showTooltip && !isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white text-[#122D8B] px-4 py-2.5 rounded-2xl shadow-xl text-sm font-medium whitespace-nowrap border border-slate-100 min-w-[180px]">
          <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>
            {displayedText}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </span>
        </div>
      </div>

      {/* Main Panel */}
      <div
        className={`absolute bottom-[72px] ${isRTL ? "left-0" : "right-0"} transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-[340px] max-w-[calc(100vw-24px)] overflow-hidden border border-slate-100 flex flex-col"
          style={{ height: view === "chat" ? "min(500px, calc(100vh - 100px))" : "auto", maxHeight: "calc(100vh - 100px)" }}
        >
          {/* Header */}
          <div className="bg-[#122D8B] px-3 py-2 flex-shrink-0">
            <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              {view === "chat" && (
                <button
                  onClick={resetChat}
                  className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  <svg className={`w-4 h-4 text-white ${isRTL ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="p-1.5 bg-white/10 rounded-lg">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                <h3 className={`text-white font-semibold text-sm leading-tight ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {view === "chat" ? (isRTL ? "مساعد Edge" : "Edge AI") : (isRTL ? "تواصل معنا" : "Get in Touch")}
                </h3>
                <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className={`text-white/70 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "متصل" : "Online"}</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {view === "menu" ? (
            <div className="p-2">
              {contactOptions.map((option) => {
                const Component = option.href ? "a" : "button";
                return (
                  <Component
                    key={option.id}
                    href={option.href}
                    target={option.href?.startsWith("http") ? "_blank" : undefined}
                    rel={option.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={option.action}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      isRTL ? "flex-row-reverse" : ""
                    } ${hoveredOption === option.id ? "bg-slate-50" : ""}`}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-200"
                      style={{
                        backgroundColor: option.color,
                        transform: hoveredOption === option.id ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {option.icon}
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                      <p className={`font-medium text-slate-800 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {option.label}
                      </p>
                      <p className={`text-slate-400 text-xs truncate ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {option.subtitle}
                      </p>
                    </div>

                  </Component>
                );
              })}
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? isRTL
                          ? "justify-start"
                          : "justify-end"
                        : isRTL
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-[#122D8B] text-white rounded-br-md"
                          : "bg-slate-100 text-slate-800 rounded-bl-md"
                      } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                    >
                      {message.role === "assistant" ? formatMessage(message.content, isRTL, locale) : message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
                    <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 py-2 border-t border-slate-100 flex-shrink-0 bg-white">
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
                    className={`flex-1 px-3 py-2 bg-slate-100 text-sm outline-none rounded-lg ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Send message"
                    className={`p-2 bg-[#122D8B] text-white rounded-lg hover:bg-[#1A4AFF] disabled:opacity-50 ${isRTL ? "rotate-180" : ""}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`group w-14 h-14 !min-w-14 !max-w-14 !min-h-14 !max-h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg flex-shrink-0 ${
          isOpen
            ? "bg-slate-800 shadow-slate-800/25"
            : "bg-[#122D8B] hover:bg-[#1A4AFF] shadow-[#122D8B]/40 hover:shadow-[#1A4AFF]/50 hover:scale-105"
        }`}
        aria-label={isOpen ? "Close" : "Chat with us"}
      >
        <div className={`flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
          {isOpen ? (
            <svg className="w-6 h-6 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
