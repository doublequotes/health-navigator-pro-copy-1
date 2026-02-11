import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { questions, getNextQuestion, type Question } from "@/lib/questionnaire-data";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuestionnaireEngine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<string[]>([questions[0].id]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentId = history[history.length - 1];
  const currentQuestion = questions.find((q) => q.id === currentId)!;
  const currentIndex = questions.findIndex((q) => q.id === currentId);
  const progress = ((history.length) / questions.length) * 100;

  const currentAnswer = answers[currentId];

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    if (!currentAnswer) return false;
    if (currentQuestion.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentAnswer as string);
    }
    if (currentQuestion.type === "multi") {
      return (currentAnswer as string[])?.length > 0;
    }
    return (currentAnswer as string)?.length > 0;
  };

  const handleNext = async () => {
    const nextId = getNextQuestion(currentId, currentAnswer, questions);
    if (!nextId) {
      setIsSubmitting(true);
      try {
        const destinations = answers.destination_preference;
        const { error } = await supabase.from("leads").insert({
          email: answers.email as string,
          treatment_category: (answers.treatment_category as string) || "other",
          urgency: (answers.urgency as string) || null,
          previous_diagnosis: (answers.previous_diagnosis as string) || null,
          diagnosis_details: (answers.diagnosis_details as string) || null,
          destination_preference: Array.isArray(destinations) ? destinations : destinations ? [destinations] : null,
          budget: (answers.budget as string) || null,
          questionnaire_answers: answers,
          source: "website",
        });

        if (error) throw error;
        navigate("/thank-you");
      } catch (err: any) {
        console.error("Lead submission error:", err);
        toast({
          title: "Submission failed",
          description: "Please try again. If the problem persists, contact support.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setHistory((prev) => [...prev, nextId]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentId]: value }));
  };

  const handleMultiSelect = (value: string) => {
    const current = (answers[currentId] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setAnswers((prev) => ({ ...prev, [currentId]: updated }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentId]: value }));
  };

  const isLastQuestion = !getNextQuestion(currentId, currentAnswer, questions);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-hero flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold">M</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">MedVoyage</span>
          </button>
          <span className="text-sm text-muted-foreground">
            Step {history.length} of {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                {currentQuestion.question}
              </h2>
              {currentQuestion.description && (
                <p className="text-muted-foreground mb-8">{currentQuestion.description}</p>
              )}

              {/* Single select */}
              {currentQuestion.type === "single" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleSelect(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        currentAnswer === option.value
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/30 bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{option.label}</span>
                        {currentAnswer === option.value && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Multi select */}
              {currentQuestion.type === "multi" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const selected = ((currentAnswer as string[]) || []).includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleMultiSelect(option.value)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/5 shadow-soft"
                            : "border-border hover:border-primary/30 bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{option.label}</span>
                          {selected && <Check className="h-5 w-5 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                  <p className="text-xs text-muted-foreground mt-2">Select all that apply</p>
                </div>
              )}

              {/* Text input */}
              {currentQuestion.type === "text" && (
                <Textarea
                  value={(currentAnswer as string) || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="min-h-[120px] text-base border-2 focus:border-primary"
                />
              )}

              {/* Email input */}
              {currentQuestion.type === "email" && (
                <Input
                  type="email"
                  value={(currentAnswer as string) || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="text-base h-14 border-2 focus:border-primary"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={history.length <= 1}
              className="text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className={`px-8 ${isLastQuestion ? "bg-accent-gradient text-accent-foreground" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : isLastQuestion ? (
                <>
                  Get My Free Quote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireEngine;
