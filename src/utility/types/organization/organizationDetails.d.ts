export interface FormValues {
    organizationName: string,
    legalName: string,
    country: string,
    address: string,
    numberOfEmployee: string,
    industryType: string,
    vatNumber: string,
  }
  
   export interface OrganizationDetailsProps {
    activeStep: number;
    setActiveStep: (step: number | ((prevStep: number) => number)) => void;
  }
  
  // Define form field types for dynamic form fields
  export interface FormField {
    id: keyof FormValues; // Restrict to keys of FormValues type
    label: string;
    placeholder?: string;
    required?: boolean;
    type: "text" | "select";
    options?: { value: string; label: string }[]; // Used only for select fields
  }
  