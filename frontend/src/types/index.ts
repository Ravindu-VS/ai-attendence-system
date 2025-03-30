export interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    email: string;
    password: string;
    name?: string;
    faceData?: string[];
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onToggleMode: (mode: 'login' | 'signup') => void;
}

export interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTime: Date;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export interface DashboardProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTime: Date;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export interface StepProps {
  currentStep: number;
  totalSteps: number;
}