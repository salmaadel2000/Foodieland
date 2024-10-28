import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc ,deleteDoc } from '@angular/fire/firestore';
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

  async removeFavoriteRecipe(docId: string) { 
    const userId = this.auth.currentUser?.uid;
    if (userId) {
    const favRecipesCollection = collection(this.firestore, 'favRecipes');
    const recipeDocRef = doc(favRecipesCollection, docId); 
    return deleteDoc(recipeDocRef); 
    }
  }

  async saveFavoriteRecipe(recipe: Recipe) {
    const userId = this.auth.currentUser?.uid;
  
    if (userId) {
      const favRecipeData = { ...recipe, userId };  
      const favRecipesCollection = collection(this.firestore, 'favRecipes');
      const docRef = await addDoc(favRecipesCollection, favRecipeData);
      return docRef.id; 
    } else {
      throw new Error('User is not logged in.');
    }
  }
  
  
}
