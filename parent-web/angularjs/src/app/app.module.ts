
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CustomMaterialModule } from './material.module'

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { SigninComponent } from './auth/auth.component'
import { HomeComponent } from './home/home.component'
import { StartComponent } from './start/start.component'

import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/pt';
import localeExtra from '@angular/common/locales/extra/pt';

registerLocaleData(locale, 'pt-BR', localeExtra)

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        HomeComponent,
        StartComponent
    ],
    imports: [
        BrowserModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
