"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "chat">("menu");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { dir } = useLanguage();

  // Show tooltip after delay
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

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

  // Add welcome message when chat starts
  useEffect(() => {
    if (view === "chat" && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: dir === "rtl" 
          ? "مرحباً! 👋 أنا مساعد Edge الذكي. كيف يمكنني مساعدتك اليوم؟"
          : "Hi there! 👋 I'm Edge's AI assistant. How can I help you today?",
      };
      setMessages([welcomeMessage]);
    }
  }, [view, dir, messages.length]);

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
          messages: [...messages, userMessage].filter(m => m.id !== "welcome").map(({ role, content }) => ({ role, content })),
          language: dir === "rtl" ? "ar" : "en",
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
        content: dir === "rtl"
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
      label: dir === "rtl" ? "محادثة ذكية" : "AI Chat",
      subtitle: dir === "rtl" ? "تحدث مع مساعدنا الذكي" : "Talk to our AI assistant",
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
      label: dir === "rtl" ? "واتساب" : "WhatsApp",
      subtitle: dir === "rtl" ? "رد فوري" : "Instant reply",
      href: "https://wa.me/201222493500",
      color: "#25D366",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      id: "messenger",
      label: dir === "rtl" ? "ماسنجر" : "Messenger",
      subtitle: dir === "rtl" ? "فيسبوك" : "Facebook",
      href: "https://m.me/edgegarments",
      color: "#0084FF",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
        </svg>
      ),
    },
    {
      id: "email",
      label: dir === "rtl" ? "البريد" : "Email",
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

  return (
    <div className={`fixed bottom-6 ${dir === "rtl" ? "left-6" : "right-6"} z-50`}>
      {/* Tooltip */}
      <div
        className={`absolute bottom-[72px] ${dir === "rtl" ? "left-0" : "right-0"} transition-all duration-300 ${
          showTooltip && !isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white text-[#122D8B] px-4 py-2.5 rounded-2xl shadow-xl text-sm font-medium whitespace-nowrap border border-slate-100">
          <span className={dir === "rtl" ? "font-[var(--font-cairo)]" : ""}>
            {dir === "rtl" ? "كيف يمكننا مساعدتك؟ 💬" : "How can we help? 💬"}
          </span>
        </div>
      </div>

      {/* Main Panel */}
      <div
        className={`absolute bottom-[72px] ${dir === "rtl" ? "left-0" : "right-0"} transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden border border-slate-100 flex flex-col" style={{ height: view === "chat" ? "500px" : "auto" }}>
          {/* Header */}
          <div className="bg-[#122D8B] p-4 flex-shrink-0">
            <div className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                {view === "chat" && (
                  <button
                    onClick={resetChat}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className={`w-4 h-4 text-white ${dir === "rtl" ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  {view === "chat" ? (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
                      <circle cx="9" cy="13" r="1" fill="currentColor" />
                      <circle cx="15" cy="13" r="1" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className={dir === "rtl" ? "text-right" : ""}>
                  <h3 className={`text-white font-semibold text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                    {view === "chat" 
                      ? (dir === "rtl" ? "مساعد Edge الذكي" : "Edge AI Assistant")
                      : (dir === "rtl" ? "تواصل معنا" : "Get in Touch")
                    }
                  </h3>
                  <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className={`text-white/70 text-xs ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                      {dir === "rtl" ? "متصل الآن" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {view === "menu" ? (
            /* Contact Options */
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
                      dir === "rtl" ? "flex-row-reverse" : ""
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
                    <div className={`flex-1 min-w-0 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                      <p className={`font-medium text-slate-800 text-sm ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                        {option.label}
                      </p>
                      <p className={`text-slate-400 text-xs truncate ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                        {option.subtitle}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${
                        dir === "rtl" ? "rotate-180" : ""
                      } ${hoveredOption === option.id ? (dir === "rtl" ? "-translate-x-1" : "translate-x-1") : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </Component>
                );
              })}
            </div>
          ) : (
            /* Chat View */
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? (dir === "rtl" ? "justify-start" : "justify-end") : (dir === "rtl" ? "justify-end" : "justify-start")}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-[#122D8B] text-white rounded-br-md"
                          : "bg-slate-100 text-slate-800 rounded-bl-md"
                      } ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className={`flex ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
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
              <div className="p-3 border-t border-slate-100 flex-shrink-0">
                <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={dir === "rtl" ? "اكتب رسالتك..." : "Type your message..."}
                    className={`flex-1 px-4 py-2.5 bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-[#122D8B]/20 transition-all ${
                      dir === "rtl" ? "text-right font-[var(--font-cairo)]" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className={`w-10 h-10 bg-[#122D8B] flex items-center justify-center text-white transition-all hover:bg-[#1A4AFF] disabled:opacity-50 disabled:cursor-not-allowed ${
                      dir === "rtl" ? "rotate-180" : ""
                    }`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
                <p className={`text-xs text-slate-400 mt-2 text-center ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`}>
                  {dir === "rtl" ? "مدعوم بالذكاء الاصطناعي" : "Powered by AI"}
                </p>
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
        className={`group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen
            ? "bg-slate-800 shadow-slate-800/25"
            : "bg-[#122D8B] hover:bg-[#1A4AFF] shadow-[#122D8B]/40 hover:shadow-[#1A4AFF]/50 hover:scale-105"
        }`}
        aria-label={isOpen ? "Close" : "Chat with us"}
      >
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
          {isOpen ? (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
