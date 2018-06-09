"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
process.env.PORT = '3999';
const app_1 = require("../app");
const app = app_1.default.get();
exports.app = app;
const chai = require('chai');
exports.chai = chai;
const chaiHttp = require('chai-http');
exports.chaiHttp = chaiHttp;
const should = chai.should();
exports.should = should;
chai.use(chaiHttp);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvdGVzdC9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO0FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQTtBQUV4QixnQ0FBMkI7QUFFM0IsTUFBTSxHQUFHLEdBQUcsYUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBWXBCLGtCQUFHO0FBVlAsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBT3hCLG9CQUFJO0FBTlIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBUWpDLDRCQUFRO0FBUFosTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBTXhCLHdCQUFNO0FBSlYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQSJ9