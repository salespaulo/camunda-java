"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Worker = require("camunda-worker-node");
const Logger = require("camunda-worker-node/lib/logger");
const Backoff = require("camunda-worker-node/lib/backoff");
const Metrics = require("camunda-worker-node/lib/metrics");
const fetch_1 = require("camunda-worker-node/lib/engine/fetch");
const log_1 = require("../log");
const option_1 = require("../utils/option");
const objects_1 = require("../utils/objects");
const CAMUNDA_URL = process.env.CAMUNDA_URL || 'http://localhost:8080/engine-rest';
const worker = Worker(CAMUNDA_URL, {
    use: [
        Logger,
        Backoff,
        Metrics
    ]
});
exports.worker = worker;
worker.on('start', () => {
    log_1.default.info('Camunda Worker starting');
});
worker.on('poll', () => {
    log_1.default.silly('Camunda Worker polling');
});
worker.on('error', err => {
    log_1.default.error('Camunda Worker error: ' + err, err);
});
const CamundaApiError = Error;
const traitResponse = response => option_1.default(response)
    .filter(res => res.status === 200)
    .map(res => res.json())
    .orThrows(new CamundaApiError(`Camunda response error=${response}`));
const getUrl = uri => CAMUNDA_URL + uri;
const postOpts = (uri, body = null) => {
    return fetch_1.fetch(getUrl(uri), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : ''
    })
        .then(res => {
        log_1.default.debug(`Camunda Fetch [POST] uri=${uri} body=${objects_1.inspect(body)} response=${objects_1.inspect(res.status)}`);
        return traitResponse(res);
    });
};
const getOpts = (uri, body = null) => {
    return fetch_1.fetch(getUrl(uri), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
        log_1.default.debug(`Camunda Fetch [GET] uri=${uri} response=${objects_1.inspect(res.status)}`);
        return traitResponse(res);
    });
};
exports.deploy = bpmn => {
    const fs = require('fs');
    const path = require('path');
    const diagramPath = path.join(__dirname, bpmn);
    const xmlStream = fs.createReadStream(diagramPath);
    const formData = new fetch_1.FormData();
    formData.append('deployment-name', 'orderProcessDeployment');
    formData.append('process', xmlStream);
    return fetch_1.fetch('/deployment/create', {
        method: 'POST',
        body: formData
    }).then(res => traitResponse(res));
};
exports.start = params => exports.post('/process-definition/key/orderProcess/start', {
    variables: {
        params: {
            value: params,
            type: 'Json'
        }
    }
});
exports.post = postOpts;
exports.get = getOpts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtdW5kYS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL2NhbXVuZGEtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUE2QztBQUM3Qyx5REFBd0Q7QUFDeEQsMkRBQTBEO0FBQzFELDJEQUEwRDtBQUUxRCxnRUFBc0U7QUFFdEUsZ0NBQTJCO0FBQzNCLDRDQUFvQztBQUVwQyw4Q0FBMEM7QUFFMUMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksbUNBQW1DLENBQUE7QUFFbEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUMvQixHQUFHLEVBQUU7UUFDRCxNQUFNO1FBQ04sT0FBTztRQUNQLE9BQU87S0FDVjtDQUNKLENBQUMsQ0FBQTtBQWtGTyx3QkFBTTtBQWhGZixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDcEIsYUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ25CLGFBQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQztBQUdILE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3JCLGFBQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFBO0FBRTdCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQzdCLGdCQUFNLENBQUMsUUFBUSxDQUFDO0tBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENB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