
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment'

import { MatSnackBar } from '@angular/material'

import User from './user'

const URL = environment.gateway.url

export const TOKEN_KEY = '___token___'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class SigninComponent {
    user: User = new User()

    constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

    onClean() {
        this.user = new User()
    }

    onSignin() {
        this.http.post(`${URL}/auth/login`, null, {
            headers: {
                username: this.user.email,
                password: this.user.password
            }
        })
            .subscribe(token => {
                console.log('[INFO] Login token=', token)
                localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
                this.router.navigateByUrl('/home')
            }, error => {
                console.error('[ERROR] Login error=', error)
                this.snackBar.open('[ERROR] Login error=' + JSON.stringify(error), 'Fechar!', {
                    duration: 5000,
                  });
            })
    }

}
