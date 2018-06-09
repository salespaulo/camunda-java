
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http'

import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { MatSnackBar } from '@angular/material';

import StartModel from './start.model'

import { TOKEN_KEY } from '../auth/auth.component'
import { environment } from '../../environments/environment'

const URL = environment.gateway.url

const LOG = (method, obj, error = false) =>
    console.log(`${error ? '[ERROR]' : '[SUCCESS]'} ${method} ${error ? 'error' : 'result'}=`, obj)

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    model = new StartModel()

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit () {
        this.model.processDefinitionKey = this.route.snapshot.paramMap.get('id')
    }

    onGoBack() {
        this.location.back();
    }

    onProcessStart() {
        let map:{ [name: string]: string }={};
        map['valueA'] = this.model.valueA
        map['valueB'] = this.model.valueB
        LOG('onProcessStart', map)
        this.doStartProcess(this.model.processDefinitionKey, map)
    }

    doStartProcess(processDefinitionKey, variables) {
        this.http.post(`${URL}/camunda/${processDefinitionKey}/startProcess`, variables, 
            {
                headers: {
                    'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY)).accessToken.token
                }
            })
            .subscribe(
                executionId => {
                    LOG('doStartProcess', executionId)
                    this.snackBar.open(`[SUCCESS] Processo [${executionId}] iniciado c/ vars ${JSON.stringify(variables)}`, 'Fechar!', {
                        duration: 15000,
                    });
                    this.router.navigateByUrl('/home')
                },
                error => {
                    LOG('doStartProcess', error, true)
                    this.snackBar.open('[ERROR] ' + JSON.stringify(error), 'Fechar!', {
                        duration: 5000,
                    });
                })
    }

}
