import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';


const approutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(approutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
    
}