export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  image?: string;
  slug?: string;
}