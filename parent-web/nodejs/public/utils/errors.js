"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("../utils/objects");
class NotFound {
    constructor(message, next = null) {
        this.id = 'NOT_FOUND';
        this.code = 404;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
class RequiredParameters {
    constructor(message, next = null) {
        this.id = 'BAD_REQUEST_REQUIRED_PARAMS';
        this.code = 400;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
class InvalidParameters {
    constructor(message, next = null) {
        this.id = 'BAD_REQUEST_INVALID_PARAMS';
        this.code = 400;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
class BadRequestGateway {
    constructor(message, next = null) {
        this.id = 'BAD_REQUEST_GATEWAY';
        this.code = 400;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
class Unauthorized {
    constructor(message, next = null) {
        this.id = 'UNAUTHORIZED';
        this.code = 401;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
class ServerError {
    constructor(message, next = null) {
        this.id = 'SERVER_ERROR';
        this.code = 500;
        this.message = '';
        this.next = null;
        this.message = message;
        this.next = next;
    }
}
const newNotFound = (name, key, value) => new NotFound(`Not Found resource="${name}" to="${key}" value="${value}"`);
exports.newNotFound = newNotFound;
const newRequiredParameters = params => new RequiredParameters(`Any parameters are empty: params="${params}"`);
exports.newRequiredParameters = newRequiredParameters;
const newInvalidParameters = params => new InvalidParameters(`Invalid parameters ${params}`);
exports.newInvalidParameters = newInvalidParameters;
const newUnauthorized = err => new Unauthorized(`Unauthorized error=${objects_1.inspect(err)}`);
exports.newUnauthorized = newUnauthorized;
const newServerError = err => new ServerError(`Internal Server Error=${objects_1.inspect(err)}`);
exports.newServerError = newServerError;
const sendHttpResponse = (err, res, next) => {
    res.status(err.code).json(err);
    next();
};
exports.sendHttpResponse = sendHttpResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC91dGlscy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBMEM7QUFTMUM7SUFNSSxZQUFZLE9BQWUsRUFBRSxPQUFlLElBQUk7UUFMdkMsT0FBRSxHQUFXLFdBQVcsQ0FBQTtRQUN4QixTQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUE7UUFDcEIsU0FBSSxHQUFXLElBQUksQ0FBQTtRQUd4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixDQUFDO0NBQ0o7QUFFRDtJQU1JLFlBQVksT0FBZSxFQUFFLE9BQWUsSUFBSTtRQUx2QyxPQUFFLEdBQVcsNkJBQTZCLENBQUE7UUFDMUMsU0FBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixZQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLFNBQUksR0FBVyxJQUFJLENBQUE7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBRUQ7SUFNSSxZQUFZLE9BQWUsRUFBRSxPQUFlLElBQUk7UUFMdkMsT0FBRSxHQUFXLDRCQUE0QixDQUFBO1FBQ3pDLFNBQUksR0FBVyxHQUFHLENBQUE7UUFDbEIsWUFBTyxHQUFXLEVBQUUsQ0FBQTtRQUNwQixTQUFJLEdBQVcsSUFBSSxDQUFBO1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLENBQUM7Q0FDSjtBQUVEO0lBTUksWUFBWSxPQUFlLEVBQUUsT0FBZSxJQUFJO1FBTHZDLE9BQUUsR0FBVyxxQkFBcUIsQ0FBQTtRQUNsQyxTQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUE7UUFDcEIsU0FBSSxHQUFXLElBQUksQ0FBQTtRQUd4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixDQUFDO0NBQ0o7QUFFRDtJQU1JLFlBQVksT0FBZSxFQUFFLE9BQWUsSUFBSTtRQUx2QyxPQUFFLEdBQVcsY0FBYyxDQUFBO1FBQzNCLFNBQUksR0FBVyxHQUFHLENBQUE7UUFDbEIsWUFBTyxHQUFXLEVBQUUsQ0FBQTtRQUNwQixTQUFJLEdBQVcsSUFBSSxDQUFBO1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLENBQUM7Q0FDSjtBQUVEO0lBTUksWUFBWSxPQUFlLEVBQUUsT0FBZSxJQUFJO1FBTHZDLE9BQUUsR0FBVyxjQUFjLENBQUE7UUFDM0IsU0FBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixZQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLFNBQUksR0FBVyxJQUFJLENBQUE7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQU0sRUFBRSxFQUFFLENBQ3RDLElBQUksUUFBUSxDQUFDLHVCQUF1QixJQUFJLFNBQVMsR0FBRyxZQUFZLEtBQUssR0FBRyxDQUFDLENBQUE7QUFvQnpFLGtDQUFXO0FBakJmLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FDL0IsSUFBSSxrQkFBa0IsQ0FBQyxxQ0FBcUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtBQWlCMUUsc0RBQXFCO0FBZnpCLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FDbEMsSUFBSSxpQkFBaUIsQ0FBQyxzQkFBc0IsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQWVyRCxvREFBb0I7QUFieEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FDMUIsSUFBSSxZQUFZLENBQUMsc0JBQXNCLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBY3RELDBDQUFlO0FBWm5CLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMseUJBQXlCLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBYWxGLHdDQUFjO0FBWGxCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM5QixJQUFJLEVBQUUsQ0FBQTtBQUNWLENBQUMsQ0FBQTtBQU1HLDRDQUFnQiJ9