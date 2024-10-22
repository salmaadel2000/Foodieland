import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.model'; 

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  constructor(private firestore: Firestore) {}

 
  getCarouselItems(): Observable<Recipe[]> {
    const recipesCollection = collection(this.firestore, 'recipes');
    return collectionData(recipesCollection) as Observable<Recipe[]>;
  }


  getRecipeById(id: string): Observable<Recipe> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return docData(recipeDoc) as Observable<Recipe>;
  }
}
