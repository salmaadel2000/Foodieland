export interface Recipe {
  id: number; 
  title: string;
  description: string;
  image: string;
  time: string;
  mainIngredient: string;
  chefName: string;
  date: string;
  isHearted?: boolean; 
  docId?: string; // Optional property for Firestore document ID
}
