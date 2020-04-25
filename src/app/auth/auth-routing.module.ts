import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authroutes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(authroutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRouting {}