"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mail, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { emailLink, site, whatsappLink } from "@/config/site";
import { LogoMark } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Answers = {
  service?: string;
  property?: string;
  rooms?: string;
  timeframe?: string;
  details?: string;
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
};

type Step = {
  key: keyof Answers;
  question: string;
  type: "chips" | "input" | "textarea";
  options?: readonly string[];
  placeholder?: string;
  optional?: boolean;
};

const steps: Step[] = [
  {
    key: "service",
    question: "Hi there! What can we paint for you?",
    type: "chips",
    options: [
      "Interior painting",
      "Exterior painting",
      "Kitchen cabinets",
      "Commercial",
      "Wallpapering",
      "Something else",
    ],
  },
  {
    key: "property",
    question: "Great choice. What type of property is it?",
    type: "chips",
    options: ["House", "Apartment", "Commercial space", "Other"],
  },
  {
    key: "rooms",
    question: "Roughly how many rooms or areas?",
    type: "chips",
    options: ["1", "2", "3", "4", "5+"],
  },
  {
    key: "timeframe",
    question: "And when would you like it done?",
    type: "chips",
    options: ["As soon as possible", "In the next few weeks", "1–3 months", "I'm flexible"],
  },
  {
    key: "details",
    question:
      "Anything else we should know? Colours you have in mind, condition of the walls, access…",
    type: "textarea",
    placeholder: "Optional — the more detail, the sharper the quote.",
    optional: true,
  },
  {
    key: "name",
    question: "Almost done! What's your name?",
    type: "input",
    placeholder: "Your name",
  },
  {
    key: "phone",
    question: "Best phone number to reach you on?",
    type: "input",
    placeholder: "08x xxx xxxx",
  },
  {
    key: "email",
    question: "And your email? (so we can send the written quote)",
    type: "input",
    placeholder: "you@email.com",
    optional: true,
  },
  {
    key: "area",
    question: "Last one — where is the property?",
    type: "input",
    placeholder: "e.g. Ranelagh, Dublin",
  },
];

function buildMessage(a: Answers) {
  return [
    `Hi ${site.name}, I'd like a free quote please.`,
    ``,
    `Service: ${a.service}`,
    `Property: ${a.property}`,
    `Rooms/areas: ${a.rooms}`,
    `Timeframe: ${a.timeframe}`,
    a.details ? `Details: ${a.details}` : null,
    ``,
    `Name: ${a.name}`,
    `Phone: ${a.phone}`,
    a.email ? `Email: ${a.email}` : null,
    `Area: ${a.area}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const done = step >= steps.length;
  const current = steps[step];
  const progress = Math.min(100, Math.round((step / steps.length) * 100));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step, done]);

  function answer(value: string) {
    setError("");
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    setDraft("");
    setStep((s) => s + 1);
  }

  function submitDraft() {
    const value = draft.trim();
    if (!value) {
      if (current.optional) {
        answer(current.type === "textarea" ? "—" : "Not provided");
        return;
      }
      setError("Just fill this in and we'll continue.");
      return;
    }
    if (current.key === "phone" && value.replace(/\D/g, "").length < 7) {
      setError("That phone number looks a little short — mind checking it?");
      return;
    }
    if (current.key === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setError("That email doesn't look quite right — mind checking it?");
      return;
    }
    answer(value);
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setDraft("");
    setError("");
  }

  const message = done ? buildMessage(answers) : "";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-border bg-white px-5 py-4">
        <LogoMark className="h-9 w-9" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-primary">
            {site.name} quote assistant
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Replies within 24 hours
          </p>
        </div>
        <p className="text-xs font-bold text-muted-foreground">
          {done ? "Done" : `Step ${step + 1} of ${steps.length}`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-1 bg-accent transition-all duration-500"
          style={{ width: `${done ? 100 : progress}%` }}
        />
      </div>

      {/* Messages */}
      <div className="flex max-h-[26rem] min-h-[20rem] flex-col gap-3 overflow-y-auto bg-muted/40 px-5 py-6">
        {steps.slice(0, step).map((s) => (
          <div key={s.key} className="contents">
            <Bubble>{s.question}</Bubble>
            <Bubble user>{String(answers[s.key] ?? "")}</Bubble>
          </div>
        ))}

        {!done && current && <Bubble>{current.question}</Bubble>}

        {done && (
          <Bubble>
            Thanks {answers.name}! Your request is ready to send. Tap one of the
            options below — and do attach a few photos if you can, they really
            speed up your quote. 📸
          </Bubble>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Controls */}
      <div className="border-t border-border bg-white p-4">
        {!done && current && (
          <>
            {current.type === "chips" ? (
              <div className="flex flex-wrap gap-2">
                {current.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => answer(option)}
                    className="rounded-full border-2 border-primary/15 px-4 py-2 text-sm font-bold text-primary transition-all hover:border-accent hover:bg-accent/10"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {current.type === "textarea" ? (
                  <Textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={current.placeholder}
                  />
                ) : (
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={current.placeholder}
                    onKeyDown={(e) => e.key === "Enter" && submitDraft()}
                    autoFocus
                  />
                )}
                {error && (
                  <p className="text-xs font-semibold text-destructive">
                    {error}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="accent"
                    className="flex-1"
                    onClick={submitDraft}
                  >
                    {current.optional ? "Skip or send" : "Send"}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {done && (
          <div className="flex flex-col gap-2.5">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "accent",
                size: "lg",
                className: "w-full",
              })}
            >
              <MessageCircle className="h-5 w-5" />
              Send via WhatsApp (fastest)
            </a>
            <a
              href={emailLink(
                `Quote request — ${answers.service} (${answers.name})`,
                message
              )}
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              <Mail className="h-4 w-4" />
              Send via Email
            </a>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Camera className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              You&apos;ll be able to attach photos of the job right inside
              WhatsApp or your email app after tapping send.
            </p>
            <div className="flex items-center justify-between pt-1">
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent"
              >
                <Phone className="h-4 w-4" /> Prefer to call? {site.phoneDisplay}
              </a>
              <button
                onClick={restart}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({
  children,
  user = false,
}: {
  children: React.ReactNode;
  user?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
        user
          ? "self-end rounded-br-sm bg-primary text-primary-foreground"
          : "self-start rounded-tl-sm border border-border bg-white text-foreground"
      )}
    >
      {children}
    </div>
  );
}
