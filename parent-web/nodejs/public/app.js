"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const auth_api_1 = require("./api/auth-api");
const support_api_1 = require("./api/support-api");
const cam_api_1 = require("./api/cam-api");
const auth_filter_1 = require("./api/auth-filter");
const path = require("path");
const express = require("express");
const assets = server => server.use(express.static(path.join(path.resolve(), '/assets')));
exports.default = server_1.default(express())
    .map(assets)
    .map(auth_filter_1.filter)
    .map(cam_api_1.default)
    .map(support_api_1.default)
    .map(auth_api_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxQ0FBNkI7QUFDN0IsNkNBQW9DO0FBQ3BDLG1EQUEwQztBQUMxQywyQ0FBa0M7QUFDbEMsbURBQTBDO0FBRTFDLDZCQUE0QjtBQUM1QixtQ0FBa0M7QUFFbEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUMvQixPQUFPLENBQUMsTUFBTSxDQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUU5QyxrQkFBZSxnQkFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUM7S0FDWCxHQUFHLENBQUMsb0JBQU0sQ0FBQztLQUNYLEdBQUcsQ0FBQyxpQkFBTSxDQUFDO0tBQ1gsR0FBRyxDQUFDLHFCQUFVLENBQUM7S0FDZixHQUFHLENBQUMsa0JBQU8sQ0FBQyxDQUFBIn0=