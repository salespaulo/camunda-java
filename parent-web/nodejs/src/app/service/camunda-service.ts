
import * as Worker from 'camunda-worker-node'
import * as Logger from 'camunda-worker-node/lib/logger'
import * as Backoff from 'camunda-worker-node/lib/backoff'
import * as Metrics from 'camunda-worker-node/lib/metrics'

import { fetch, FormData } from 'camunda-worker-node/lib/engine/fetch'

import logger from '../log'
import option from '../utils/option'

import { inspect } from '../utils/objects'

const CAMUNDA_URL = process.env.CAMUNDA_URL || 'http://localhost:8080/engine-rest'

const worker = Worker(CAMUNDA_URL, {
    use: [
        Logger,
        Backoff,
        Metrics
    ]
})

worker.on('start', () => {
    logger.info('Camunda Worker starting');
});

worker.on('poll', () => {
    logger.silly('Camunda Worker polling');
});

// handle worker errors
worker.on('error', err => {
    logger.error('Camunda Worker error: ' + err, err);
});

const CamundaApiError = Error

const traitResponse = response => 
    option(response)
        .filter(res => res.status === 200)
        .map(res => res.json())
        .orThrows(new CamundaApiError(`Camunda response error=${response}`))

const getUrl = uri => CAMUNDA_URL + uri

const postOpts = (uri, body = null) => {
    return fetch(getUrl(uri), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : ''
    })
    .then(res => {
        logger.debug(`Camunda Fetch [POST] uri=${uri} body=${inspect(body)} response=${inspect(res.status)}`)
        return traitResponse(res)
    })
}

const getOpts = (uri, body = null) => {
    return fetch(getUrl(uri), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        logger.debug(`Camunda Fetch [GET] uri=${uri} response=${inspect(res.status)}`)
        return traitResponse(res)
    })
}

export const deploy = bpmn => {
    const fs = require('fs')
    const path = require('path')
      
    const diagramPath = path.join(__dirname, bpmn);
    const xmlStream = fs.createReadStream(diagramPath);
    const formData = new FormData();

    formData.append('deployment-name', 'orderProcessDeployment');
    formData.append('process', xmlStream);

    return fetch('/deployment/create', {
        method: 'POST',
        body: formData
    }).then(res => traitResponse(res))
}

export const start = params => 
    post('/process-definition/key/orderProcess/start', {
        variables: {
            params: {
                value: params,
                type: 'Json'
            }
        }
    })

export const post = postOpts
export const get = getOpts

export { worker }
