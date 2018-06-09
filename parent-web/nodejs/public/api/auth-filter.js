"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const log_1 = require("../log");
const option_1 = require("../utils/option");
const authService = require("../service/auth-service");
const objects_1 = require("../utils/objects");
const errors_1 = require("../utils/errors");
const unless = ['/auth/register', '/auth', '/support'];
const getToken = header => {
    const result = option_1.default(header)
        .filter(header => header.split(' ')[0] === 'Bearer')
        .map(header => header.split(' ')[1])
        .map(header => header.replace(/^JWT\s/, ''))
        .orElse('');
    log_1.default.debug(`getToken from header=${header} result=${result}`);
    return result;
};
const header = option_1.default(config.get('jwt.header'))
    .map(header => header.toLowerCase())
    .orElse('authorization');
const extractHeader = req => {
    log_1.default.debug(`Extract token from header=${header} into req.headers=${objects_1.inspect(req.headers)}`);
    return req.headers[header];
};
const isUnless = path => unless.indexOf(path) > -1
    || unless.some(uri => path.indexOf(uri) > -1);
const decodedToken = req => {
    const token = getToken(extractHeader(req));
    return authService.verifyToken(token);
};
exports.decodedToken = decodedToken;
const filter = server => server.use((req, res, next) => {
    const path = req.originalUrl;
    log_1.default.debug(`Auth filter to path=${path}`);
    if (isUnless(path)) {
        log_1.default.debug(`Auth filter is unless to req.path=${path}`);
        next();
    }
    else {
        log_1.default.debug(`Auth filter will verify token to req.path=${path}`);
        decodedToken(req)
            .then(decoded => next())
            .catch(err => errors_1.sendHttpResponse(err, res, next));
    }
});
exports.filter = filter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2FwaS9hdXRoLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlDQUFnQztBQUVoQyxnQ0FBMkI7QUFDM0IsNENBQW9DO0FBRXBDLHVEQUFzRDtBQUV0RCw4Q0FBMEM7QUFDMUMsNENBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBRXRELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFO0lBQ3RCLE1BQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDO1NBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDM0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2YsYUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsTUFBTSxXQUFXLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ25DLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUVoQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsRUFBRTtJQUN4QixhQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixNQUFNLHFCQUFxQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDNUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDOUIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBSXJFLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFO0lBQ3ZCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUE7QUFpQlEsb0NBQVk7QUFmckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNuRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFBO0lBQzVCLGFBQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLElBQUksRUFBRSxDQUFDLENBQUE7SUFFM0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixhQUFNLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3pELElBQUksRUFBRSxDQUFBO0lBQ1YsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osYUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNqRSxZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFFLElBQUksRUFBRSxDQUFDO2FBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHlCQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUE7QUFFcUIsd0JBQU0ifQ==