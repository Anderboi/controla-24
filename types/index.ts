import { Database } from '@/utils/database.types';


export interface IWallMaterialFeatures {
  name: string;
  width: string;
  //? Индекс Изоляции воздушного шума Rw
  soundproof: string;
  soundproofDescription?: string;
  waterResistance: string;
  fireResistance: string;
  cons: string[];
  pros: string[];
}

export interface FormBottomNavProps {
  skipAll: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
  previous: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  next: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  submitting: boolean;
  currentStep: number;
  steps: { id: string; name: string; fields?: string[] }[];
  className?: string;
}

export interface AdditionalInfoButtonProps {
  title: string;
  children: React.ReactNode;
}

export interface SuccessStepProps {
  steps: { id: string; name: string; fields?: string[] }[];
}

type ProjectProps = Database["public"]["Tables"]["projects"]["Row"] & {
  clients: Database["public"]["Tables"]["clients"]["Row"];
};
type RoomProps = Database["public"]["Tables"]["rooms"]["Row"];


export interface PDFProps {
  project: ProjectProps;
  rooms: RoomProps[];
}

export interface DataCardLayoutProps {
  children: React.ReactNode;
  className?: string;
}
export interface DataCardProps {
  name: string;
  isChecked: boolean;
  onChange: (value: string[]) => void;
  icon: React.ReactNode;
  value?: string[];
  description?: string;
}