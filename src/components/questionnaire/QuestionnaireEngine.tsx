import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { questions, getNextQuestion, countryList, type Question } from "@/lib/questionnaire-data";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuestionnaireEngine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<string[]>([questions[0].id]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Personal details state
  const [personalDetails, setPersonalDetails] = useState({
    full_name: "",
    date_of_birth: "",
    email: "",
  });

  const currentId = history[history.length - 1];
  const currentQuestion = questions.find((q) => q.id === currentId)!;
  const progress = (history.length / questions.length) * 100;

  const currentAnswer = answers[currentId];
  const allowedCountries = ["india", "thailand", "hong_kong", "no_preference"];

  const validateMobile = (value: string): boolean => {
    if (!value || value.trim() === "") return true; // optional field
    // E.164: starts with +, then 1-15 digits, total 8-16 chars
    const cleaned = value.replace(/[\s\-()]/g, "");
    return /^\+[1-9]\d{6,14}$/.test(cleaned);
  };

  const canProceed = () => {
    if (currentQuestion.type === "personal_details") {
      const { full_name, email } = personalDetails;
      if (!full_name.trim() || !email.trim()) return false;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    if (!currentQuestion.required) return true;
    if (!currentAnswer) return false;
    if (currentQuestion.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentAnswer as string);
    }
    if (currentQuestion.type === "mobile") {
      return validateMobile(currentAnswer as string);
    }
    if (currentQuestion.type === "multi") {
      return (currentAnswer as string[])?.length > 0;
    }
    if (currentQuestion.type === "dropdown") {
      return (currentAnswer as string)?.length > 0;
    }
    return (currentAnswer as string)?.length > 0;
  };

  const uploadPrescription = async (): Promise<string | null> => {
    if (!prescriptionFile) return null;
    setUploading(true);
    try {
      const ext = prescriptionFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("prescriptions")
        .upload(fileName, prescriptionFile);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("prescriptions").getPublicUrl(data.path);
      return urlData.publicUrl;
    } catch (err) {
      console.error("Upload error:", err);
      toast({ title: "Upload failed", description: "Could not upload prescription.", variant: "destructive" });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleNext = async () => {
    const nextId = getNextQuestion(currentId, currentAnswer, questions);
    if (!nextId) {
      setIsSubmitting(true);
      try {
        const prescriptionUrl = await uploadPrescription();
        const destinations = answers.destination_preference;
        const email = personalDetails.email || (answers.email as string);
        const mobile = answers.mobile as string;
        const cleanedMobile = mobile ? mobile.replace(/[\s\-()]/g, "") : null;

        const { error } = await supabase.from("leads").insert({
          email,
          mobile: cleanedMobile,
          full_name: personalDetails.full_name || null,
          date_of_birth: personalDetails.date_of_birth || null,
          treatment_category: (answers.treatment_category as string) || "other",
          urgency: (answers.urgency as string) || null,
          previous_diagnosis: (answers.previous_diagnosis as string) || null,
          diagnosis_details: (answers.diagnosis_details as string) || null,
          destination_preference: Array.isArray(destinations) ? destinations : destinations ? [destinations] : null,
          budget: (answers.budget as string) || null,
          passport_country: (answers.passport_country as string) || null,
          translation_language: (answers.translation_language as string) || null,
          virtual_consultation: (answers.virtual_consultation as string) || null,
          allergies_conditions: Array.isArray(answers.allergies_conditions) ? answers.allergies_conditions : null,
          prescription_url: prescriptionUrl,
          questionnaire_answers: { ...answers, personal_details: personalDetails },
          source: "website",
        } as any);

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
                        {currentAnswer === option.value && <Check className="h-5 w-5 text-primary" />}
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
                    const disabled = currentId === "destination_preference" && !allowedCountries.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        disabled={disabled}
                        onClick={() => handleMultiSelect(option.value)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          disabled ? "opacity-50 cursor-not-allowed" : ""
                        } ${
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

              {/* Dropdown */}
              {currentQuestion.type === "dropdown" && (
                <Select
                  value={(currentAnswer as string) || ""}
                  onValueChange={(v) => handleSingleSelect(v)}
                >
                  <SelectTrigger className="h-14 text-base border-2">
                    <SelectValue placeholder={currentQuestion.placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {currentId === "passport_country"
                      ? countryList.map((c) => (
                          <SelectItem key={c} value={c.toLowerCase().replace(/\s+/g, "_")}>
                            {c}
                          </SelectItem>
                        ))
                      : currentQuestion.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              )}

              {/* Text input with optional file upload */}
              {currentQuestion.type === "text" && (
                <div className="space-y-4">
                  <Textarea
                    value={(currentAnswer as string) || ""}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="min-h-[120px] text-base border-2 focus:border-primary"
                  />
                  {currentQuestion.allowFileUpload && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                      />
                      {prescriptionFile ? (
                        <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                          <Upload className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground flex-1 truncate">{prescriptionFile.name}</span>
                          <button onClick={() => setPrescriptionFile(null)}>
                            <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Prescription / Report (optional)
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile input with E.164 guidance */}
              {currentQuestion.type === "mobile" && (
                <div className="space-y-2">
                  <Input
                    type="tel"
                    value={(currentAnswer as string) || ""}
                    onChange={(e) => {
                      let val = e.target.value;
                      // Allow only +, digits, spaces, hyphens, parens
                      val = val.replace(/[^\d\s\-+()]/g, "");
                      handleTextChange(val);
                    }}
                    placeholder={currentQuestion.placeholder}
                    className="text-base h-14 border-2 focus:border-primary"
                  />
                  {currentAnswer && !validateMobile(currentAnswer as string) && (
                    <p className="text-sm text-destructive">
                      Enter a valid international number starting with + and country code (e.g. +971551234567)
                    </p>
                  )}
                </div>
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

              {/* Personal details form */}
              {currentQuestion.type === "personal_details" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <Input
                      value={personalDetails.full_name}
                      onChange={(e) => setPersonalDetails((p) => ({ ...p, full_name: e.target.value }))}
                      placeholder="John Doe"
                      className="text-base h-12 border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Date of Birth</label>
                    <Input
                      type="date"
                      value={personalDetails.date_of_birth}
                      onChange={(e) => setPersonalDetails((p) => ({ ...p, date_of_birth: e.target.value }))}
                      className="text-base h-12 border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label>
                    <Input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="text-base h-12 border-2 focus:border-primary"
                    />
                    {personalDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email) && (
                      <p className="text-sm text-destructive mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                </div>
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
              disabled={!canProceed() || isSubmitting || uploading}
              className={`px-8 ${isLastQuestion ? "bg-accent-gradient text-accent-foreground" : ""}`}
            >
              {isSubmitting || uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {uploading ? "Uploading..." : "Submitting..."}
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
