import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AboutUsComponent } from "./about-us/about-us.component";
import { TechComponent } from "./tech/tech.component";
import { UniversityComponent } from "./university/university.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: SignupComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'tech',
        component: TechComponent,
        
    },
    {
        path:'uni',
        component: UniversityComponent,
        
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }