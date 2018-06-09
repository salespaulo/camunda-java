
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../auth/auth.component'
import { HomeComponent } from '../home/home.component'
import { StartComponent } from '../start/start.component'

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: SigninComponent,
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'start/:id',
        component: StartComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }