import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
// blank children
import { HomeComponent } from './components/home/home.component';
import { FavRecipesComponent } from './components/fav-recipes/fav-recipes.component';
import { BlogComponent } from './components/blog/blog.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
// auth children
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'blank/home',
        pathMatch: 'full' 
    },
    {
        path: 'blank',
        component: BlankLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'fav-recipes', component: FavRecipesComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'recipes', component: RecipesComponent },
        ]
    },
    {
        path: 'auth', component: AuthLayoutComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: "register", component: RegisterComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
