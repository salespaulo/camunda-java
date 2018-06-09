"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const option_1 = require("../utils/option");
const util = require("util");
const moment = require("moment");
const _logtag = tag => option_1.default(tag).orElse(moment().toISOString());
const log = (obj, tag = null) => {
    log_1.default.debug(`OBJECT LOG ${_logtag(tag)}: ${inspect(obj)}`);
    return obj;
};
exports.log = log;
const merge = (obj, toMerge) => Object.assign(obj, toMerge);
exports.merge = merge;
const json = obj => JSON.stringify(obj);
exports.json = json;
const inspect = obj => util.inspect(obj, false, null);
exports.inspect = inspect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvdXRpbHMvb2JqZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdDQUEyQjtBQUMzQiw0Q0FBb0M7QUFFcEMsNkJBQTRCO0FBQzVCLGlDQUFnQztBQUVoQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7QUFFakUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFRLEVBQUUsTUFBYyxJQUFJLEVBQUUsRUFBRTtJQUN6QyxhQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQVE4QixrQkFBRztBQU5sQyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBTWxELHNCQUFLO0FBSmQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBSXZCLG9CQUFJO0FBRnBCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBRS9CLDBCQUFPIn0=