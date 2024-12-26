export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'brand' | 'events' | 'product';
}

export interface ServiceSection {
  brand: {
    title: string;
    subtitle: string;
    description: string;
    projects: Project[];
  };
  events: {
    title: string;
    subtitle: string;
    description: string;
    projects: Project[];
  };
  product: {
    title: string;
    subtitle: string;
    description: string;
    projects: Project[];
  };
}

export interface LanguageOption {
  code: 'zh' | 'en';
  label: string;
} 