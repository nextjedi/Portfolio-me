export interface Award {
  points: string[];
  title: string;
  subtitle: string;
}

export interface Contact {
  link: {
    url: string;
    name: string;
  };
  type: string;
  icon: string;
  tooltip: string;
}

export interface Education {
  info: string[];
  name: string;
  url: string;
  place: string;
}

export interface Experience {
  description: string[];
  company: string;
  role: string;
  team?: string;
  url: string;
  tenure: string;
  location: string;
}

export interface SkillImage {
  location: string;
  caption: string;
  alt: string;
}

export interface Skill {
  images: SkillImage[];
  title: string;
}

export interface Portfolio {
  name: string;
  role: string;
  awards: Award[];
  contatcs: Contact[];
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
}