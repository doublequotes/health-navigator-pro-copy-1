export interface QuestionOption {
  label: string;
  value: string;
  nextQuestion?: string;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: "single" | "multi" | "text" | "email" | "mobile" | "dropdown" | "personal_details";
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string;
  allowFileUpload?: boolean;
}

export const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina",
  "Brazil", "Brunei", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China",
  "Colombia", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland",
  "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Haiti", "Honduras", "Hong Kong",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta", "Mexico",
  "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine",
  "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "Somalia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "UAE",
  "Uganda", "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

export const questions: Question[] = [
  {
    id: "treatment_category",
    question: "What type of treatment are you looking for?",
    description: "Select the category that best matches your needs.",
    type: "single",
    required: true,
    options: [
      { label: "🏋🏻‍♂️ Physiotherapy", value: "physiotherapy" },
      { label: "☢️ Oncology / Treatment & Surgery", value: "oncology" },
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
      { label: "Within 9 months", value: "9_months" },
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
    description: "Include any specific details from your doctor's assessment. You can also upload a prescription or medical report.",
    type: "text",
    required: true,
    placeholder: "e.g., Torn ACL requiring reconstruction, diagnosed March 2026...",
    allowFileUpload: true,
  },
  {
    id: "allergies_conditions",
    question: "Do you have any known allergies or chronic conditions?",
    description: "Select all that apply.",
    type: "multi",
    required: false,
    options: [
      { label: "💉 Diabetes", value: "diabetes" },
      { label: "💊 Hypothyroidism / Hyperthyroidism", value: "thyroidism_issue" },
      { label: "🩺 Hypertension", value: "hypertension" },
      { label: "❤️ Heart / Cardiovascular issues", value: "heart_issues" },
      { label: "🫁 Respiratory / Asthma", value: "respiratory_issue" },
      { label: "💊 Drug / Medication allergies", value: "drug_allergies" },
      { label: "🚫 None of the above", value: "none" },
    ],
  },
  {
    id: "destination_preference",
    question: "Do you have a preferred destination?",
    description: "Select all regions you'd consider for treatment.",
    type: "multi",
    options: [
      { label: "🇮🇳 India", value: "india" },
      { label: "🇹🇭 Thailand", value: "thailand" },
      { label: "🇭🇰 Hong Kong", value: "hong_kong" },
      { label: "🇹🇷 Turkey (Coming Soon)", value: "turkey" },
      { label: "🇲🇽 Mexico (Coming Soon)", value: "mexico" },
      { label: "🇩🇪 Germany (Coming Soon)", value: "germany" },
      { label: "🇰🇷 South Korea (Coming Soon)", value: "south_korea" },
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
    id: "passport_country",
    question: "Do you require a medical visa?",
    description: "Select the country of your travel document (passport).",
    type: "dropdown",
    required: true,
    placeholder: "Select your passport country",
  },
  {
    id: "translation_language",
    question: "Do you need translation services?",
    description: "Translation between your language and English. Select your preferred language of conversation.",
    type: "dropdown",
    required: false,
    placeholder: "Select your preferred language",
    options: [
      { label: "Arabic", value: "arabic" },
      { label: "Persian", value: "persian" },
      { label: "Dari / Afghani", value: "afghani" },
      { label: "Urdu", value: "urdu" },
      { label: "Nepali", value: "nepali" },
      { label: "Bengali", value: "bengali" },
      { label: "Polish", value: "polish" },
      { label: "Russian", value: "russian" },
      { label: "Cantonese", value: "cantonese" },
      { label: "Japanese", value: "japanese" },
      { label: "Not required (I speak English)", value: "not_required" },
    ],
  },
  {
    id: "virtual_consultation",
    question: "Would you like a virtual consultation with the surgeon/doctor before you confirm?",
    description: "A video call with the treating doctor to discuss your case.",
    type: "dropdown",
    required: true,
    placeholder: "Select an option",
    options: [
      { label: "Yes, I'd like a virtual consultation", value: "yes" },
      { label: "Not required", value: "not_required" },
      { label: "I'll decide later", value: "decide_later" },
    ],
  },
  {
    id: "mobile",
    question: "Would you like us to contact you via WhatsApp/direct call?",
    description: "Enter your number with country code (e.g. +971551234567). We will get in touch for urgent updates.",
    type: "mobile",
    required: false,
    placeholder: "+971551234567 (Optional)",
  },
  {
    id: "personal_details",
    question: "Almost done! Tell us about yourself.",
    description: "This helps us personalise your treatment quotes.",
    type: "personal_details",
    required: true,
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
