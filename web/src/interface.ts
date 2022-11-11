export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  start_career: string;
  completed_projects: number;
  satisfied_customers: number;
}

export interface Project {
  id: number;
  title: string;
  introduction: string;
  status: number;
  img_src?: string;
  description: string;
  learned: string;
  links: string ;
  skills: string;
  categories: string;
}

export interface ParsedProject {
  id: number;
  title: string;
  introduction: string;
  status: number;
  img_src?: string;
  description: string;
  learned: string;
  links: {github: string; live: string; };
  skills: string[];
  categories: string[];
}

export interface LoginData {
  email: string;
  password: string;
}