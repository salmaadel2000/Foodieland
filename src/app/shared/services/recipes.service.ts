import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, query, where } from '@angular/fire/firestore';  // Add query and where here
import { Auth } from '@angular/fire/auth'; 
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(
    private firestore: Firestore,
    private auth: Auth 
  ) {}

  getrecipesItems(): Observable<Recipe[]> {
    const recipesCollection = collection(this.firestore, 'recipes');
    return collectionData(recipesCollection) as Observable<Recipe[]>;
  }

  getRecipeById(id: string): Observable<Recipe> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return docData(recipeDoc, { idField: 'id' }) as Observable<Recipe>;
  }

  async removeFavoriteRecipe(docId: string): Promise<void> { 
    const userId = this.auth.currentUser?.uid;
    if (!userId) return;
    
    try {
      const docRef = doc(this.firestore, 'favRecipes', docId);
      await deleteDoc(docRef);
      
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
  
  async saveFavoriteRecipe(recipe: Recipe): Promise<string> {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      const favRecipeData = { ...recipe, userId };
      const favRecipesCollection = collection(this.firestore, 'favRecipes');
      console.log(favRecipeData);
      const docRef = await addDoc(favRecipesCollection, favRecipeData);
      return docRef.id;
    } else {
      throw new Error('User is not logged in.');
    }
  }
  
  getFavoriteRecipes(): Observable<Recipe[]> {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      const favRecipesCollection = collection(this.firestore, 'favRecipes');
      const favRecipesQuery = query(favRecipesCollection, where('userId', '==', userId));
      return collectionData(favRecipesQuery, { idField: 'docId' }) as Observable<Recipe[]>;
    } else {
      throw new Error('User is not logged in.');
    }
  }
  
}
