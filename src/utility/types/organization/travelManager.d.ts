export  interface FormValues {
    name: string;
    email: string;
    phoneNumber: string;
    jobTitle: string;
    address: string;
    receiveEmails: string;
  }


  export interface FormField {
    id: keyof FormValues;
    label: string;
    placeholder?: string;
    required?: boolean;
    type: "text" | "select";
    options?: { id: number; value: boolean; label: string }[];
  }
  export interface TravelManagerProps {
    activeStep: number;
    setActiveStep: (step: number | ((prevStep: number) => number)) => void;
  }