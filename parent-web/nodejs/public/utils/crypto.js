"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const option_1 = require("../utils/option");
const encode = term => option_1.default(term)
    .map(t => bcrypt.hashSync(t, 10))
    .orElse('');
exports.encode = encode;
const compare = (term, hash) => bcrypt.compareSync(term, hash);
exports.compare = compare;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC91dGlscy9jcnlwdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpQ0FBZ0M7QUFFaEMsNENBQW9DO0FBRXBDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxJQUFJLENBQUM7S0FDOUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBSU4sd0JBQU07QUFGZixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBRTdDLDBCQUFPIn0=