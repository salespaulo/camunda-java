
import Api from '.'

import * as express from 'express'
import { sendHttpResponse } from '../utils/errors';

import { worker, deploy, start } from '../service/camunda-service'

const URI = '/cam'

const camDeploy = (req, res, next) => {
    deploy('../config/orderProcess.bpmn')
        .then(res => {
            console.log('>>>>>>>>>>>>>. deploy res', res)
        })
        .then(function (response) {
            const status = response.status;

            if (status === 200) {
                console.log('deployed orderProcess');
                res.json(response)
            } else {
                console.error('failed to deploy orderProcess (status=%s)', status);
                res.status(500).json(response)
            }
        }).catch(function (err) {
            res.status(500).json(err)
        })
}

const camStart = (req, res, next) => {
    const goods = [
        { name: 'Apple', amount: 5 },
        { name: 'Banana', amount: 1 }
    ]

    start(goods)
        .then(function (response) {
            const status = response.status;

            if (status === 200) {
                console.log('started orderProcess');
                res.json(response)
            } else {
                console.error('failed to start orderProcess (status=%s)', status);

                response.json().then(function (json) {
                    console.log(json);
                    res.status(500).json(json)
                });
            }
        }).catch(function (err) {
            console.error('failed to start orderProcess (error=%s)', err);
            res.status(500).json(err)
        })
}

const checkout = (req, res, next) => {
    //worker.subscribe('orderProcess:checkout', [ 'goods' ], checkout);
    res.json({ test: 'checkout it' })
}

const shipment = (req, res, next) => {
    //worker.subscribe('orderProcess:shipment', [ 'order' ], shipOrder);
    res.json({ test: 'shipment it' })
}

class CamundaApi implements Api {
    routes() {
        return express.Router()
            .post('/order/deploy', camDeploy)
            .post('/order/process', camStart)
            .post('/order/checkout', checkout)
            .post('/order/shipment', shipment)
    }
}

const api = new CamundaApi()

export default server => server.use(URI, api.routes())
