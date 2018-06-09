
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { MatSnackBar } from '@angular/material';

import HomeModel from './home.model'

import { TOKEN_KEY } from '../auth/auth.component'
import { environment } from '../../environments/environment'

const URL = environment.gateway.url

const LOG = (method, obj, error = false) =>
    console.log(`${error ? '[ERROR]' : '[SUCCESS]'} ${method} ${error ? 'error' : 'result'}=`, obj)

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    model = new HomeModel()

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar) { }

    private getTasks(process) {
        const definitionKeySelected = process.definitionKey

        this.http.get(`${URL}/camunda/task?processDefinitionKey=${definitionKeySelected}`,
            {
                headers: {
                    'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY)).accessToken.token
                }
            })
            .subscribe(
                tasks => {
                    LOG('getTasks', tasks)
                    this.model.processSelected = this.model.processes.find(p => p.definitionKey === definitionKeySelected)
                    this.model.processSelected.tasks = tasks
                },
                error => {
                    LOG('getTasks', error, true)
                    this.snackBar.open('[ERROR] ' + JSON.stringify(error), 'Fechar!', {
                        duration: 5000,
                    });
                })
    }

    ngOnInit() {
        this.getProcesses()
    }

    onLogout() {
        const token = localStorage.getItem(TOKEN_KEY)
        localStorage.removeItem(TOKEN_KEY)
        LOG('doLogout', token)
        this.router.navigateByUrl('/')
    }

    onProcessStart(process) {
        this.router.navigate(['/start', process.definitionKey]);
    }

    onProcessStop(process) {
        console.log('>>>> Implementar onProcessStop!', process)
    }

    onProcessUpdate() {
        this.getProcesses()
    }

    onGetTasks(process) {
        this.getTasks(process)
    }

    getProcesses() {
        this.http.get(`${URL}/camunda`,
            {
                headers: {
                    'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY)).accessToken.token
                }
            })
            .subscribe(
                (processes: any) => {
                    LOG('getProcess', processes)
                    this.model.processes = processes
                        .map(p => {
                            return {
                                definitionKey: p
                            }
                        })
                },
                error => {
                    LOG('getProcess', error, true)
                    this.snackBar.open('[ERROR] ' + JSON.stringify(error), 'Fechar!', {
                        duration: 5000,
                    });
                })
    }

    doStopProcess(processDefinitionKey, description = '') {
        
    }

    doFetchAndLock(topic) {
        this.http.get(`${URL}/camunda/${topic}/executeTask/1`,
            {
                headers: {
                    'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY)).accessToken.token
                }
            })
            .subscribe(
                tasks => {
                    LOG('doFetchAndLock', tasks)
                    this.model.fetchedTasks = tasks
                },
                error => {
                    LOG('doFetchAndLock', error, true)
                    this.snackBar.open('[ERROR] ' + JSON.stringify(error), 'Fechar!', {
                        duration: 5000,
                    });
                })
    }

}
