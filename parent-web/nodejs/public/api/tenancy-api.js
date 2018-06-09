"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenancyService = require("../service/tenancy-service");
const tenancy_1 = require("../model/tenancy");
const user_1 = require("../model/user");
const express = require("express");
const errors_1 = require("../utils/errors");
const URI = '/tenancies';
const fromUserId = (req, res, next) => {
    const userId = req.params.userId;
    tenancyService.fromUserId(userId)
        .then(tenancies => res.json(tenancies))
        .catch(err => errors_1.sendHttpResponse(err, res, next));
};
const save = (req, res, next) => {
    const name = req.body.name;
    const metadata = req.body.metadata;
    const owner = req.params.userId;
    tenancyService.newSimpleTenancy(name, metadata, [new tenancy_1.TenancyUser(owner, user_1.Profile.OWNER)])
        .then(tenancy => res.json(tenancy))
        .catch(err => errors_1.sendHttpResponse(err, res, next));
};
class TenancyApi {
    routes() {
        return express.Router()
            .post('/:userId', save)
            .get('/:userId', fromUserId);
    }
}
const api = new TenancyApi();
exports.default = server => server.use(URI, api.routes());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW5jeS1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2FwaS90ZW5hbmN5LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDZEQUE0RDtBQUM1RCw4Q0FBOEM7QUFDOUMsd0NBQXVDO0FBRXZDLG1DQUFrQztBQUNsQyw0Q0FBbUQ7QUFFbkQsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFBO0FBRXhCLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUNoQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHlCQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUE7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDMUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDbEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDL0IsY0FBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLHFCQUFXLENBQUMsS0FBSyxFQUFFLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMseUJBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQTtBQUVEO0lBQ0ksTUFBTTtRQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNKO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQTtBQUU1QixrQkFBZSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBIn0=