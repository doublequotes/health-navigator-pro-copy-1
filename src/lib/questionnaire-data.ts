export interface QuestionOption {
  label: string;
  value: string;
  nextQuestion?: string; // conditional: jump to specific question
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: "single" | "multi" | "text" | "email";
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: "treatment_category",
    question: "What type of treatment are you looking for?",
    description: "Select the category that best matches your needs.",
    type: "single",
    required: true,
    options: [
      { label: "☢️ Oncology / Treatement & Surgery", value: "oncology" },
      { label: "🫀 Cardiac / Heart Surgery", value: "cardiac" },
      { label: "🦴 Orthopedics (Joint / Spine)", value: "orthopedics" },
      { label: "👁️ Eye Surgery / Ophthalmology", value: "ophthalmology" },
      { label: "🦷 Dental Care", value: "dental" },
      { label: "👶 Fertility / IVF", value: "fertility" },
      { label: "🧠 Neurology / Brain Surgery", value: "neurology" },
      { label: "💆 Cosmetic / Plastic Surgery", value: "cosmetic" },
      { label: "🏥 Other / Not Sure", value: "other" },
    ],
  },
  {
    id: "urgency",
    question: "How urgently do you need treatment?",
    description: "This helps us prioritize and find the best options.",
    type: "single",
    required: true,
    options: [
      { label: "Within 1 month", value: "1_month" },
      { label: "Within 3 months", value: "3_months" },
      { label: "Within 6 months", value: "6_months" },
      { label: "Just exploring options", value: "exploring" },
    ],
  },
  {
    id: "previous_diagnosis",
    question: "Have you received a diagnosis from a doctor?",
    type: "single",
    required: true,
    options: [
      { label: "Yes, I have a formal diagnosis", value: "yes", nextQuestion: "diagnosis_details" },
      { label: "I have symptoms but no diagnosis", value: "symptoms" },
      { label: "I need a second opinion", value: "second_opinion", nextQuestion: "diagnosis_details" },
    ],
  },
  {
    id: "diagnosis_details",
    question: "Please describe your diagnosis or condition.",
    description: "Include any specific details from your doctor's assessment.",
    type: "text",
    required: true,
    placeholder: "e.g., Torn ACL requiring reconstruction, diagnosed March 2026...",
  },
  {
    id: "destination_preference",
    question: "Do you have a preferred destination?",
    description: "Select all regions you'd consider for treatment.",
    type: "multi",
    options: [
      { label: "🇹🇷 Turkey", value: "turkey" },
      { label: "🇮🇳 India", value: "india" },
      { label: "🇹🇭 Thailand", value: "thailand" },
      { label: "🇲🇽 Mexico", value: "mexico" },
      { label: "🇪🇸 Spain", value: "spain" },
      { label: "🇩🇪 Germany", value: "germany" },
      { label: "🇰🇷 South Korea", value: "south_korea" },
      { label: "No preference", value: "no_preference" },
    ],
  },
  {
    id: "budget",
    question: "What's your approximate budget?",
    type: "single",
    options: [
      { label: "Under $5,000", value: "under_5k" },
      { label: "$5,000 – $15,000", value: "5k_15k" },
      { label: "$15,000 – $30,000", value: "15k_30k" },
      { label: "$30,000+", value: "30k_plus" },
      { label: "Not sure yet", value: "unsure" },
    ],
  },
  {
    id: "email",
    question: "Where should we send your personalized quotes?",
    description: "We'll match you with accredited hospitals within 24 hours.",
    type: "email",
    required: true,
    placeholder: "your.email@example.com",
  },
];

export const getNextQuestion = (
  currentId: string,
  answer: string | string[],
  allQuestions: Question[]
): string | null => {
  const current = allQuestions.find((q) => q.id === currentId);
  if (!current) return null;

  // Check for conditional next question
  if (current.options && typeof answer === "string") {
    const selectedOption = current.options.find((o) => o.value === answer);
    if (selectedOption?.nextQuestion) {
      return selectedOption.nextQuestion;
    }
  }

  // Default: go to next question in order
  const currentIndex = allQuestions.findIndex((q) => q.id === currentId);
  const nextIndex = currentIndex + 1;
  if (nextIndex < allQuestions.length) {
    return allQuestions[nextIndex].id;
  }

  return null; // end of questionnaire
};
