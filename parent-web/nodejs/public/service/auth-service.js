"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const crypt = require("../utils/crypto");
const jwt = require("../utils/jwt");
const camunda_service_1 = require("./camunda-service");
const objects_1 = require("../utils/objects");
const user_1 = require("../model/user");
const errors_1 = require("../utils/errors");
const verifyToken = token => jwt.verify(token);
exports.verifyToken = verifyToken;
const newUser = (name, email, password, photoUrl = null, providerId = null) => new Promise((resolve, reject) => {
    if (!name || !email || !password) {
        return reject(errors_1.newRequiredParameters(`name=${name} email=${email} password=${password}`));
    }
    const toInsert = new user_1.User();
    toInsert._id = email;
    toInsert.name = name;
    toInsert.password = crypt.encode(password);
    toInsert.providerId = providerId || 'system';
    toInsert.photoUrl = photoUrl || 'http://www.gravatar.com/avatar/?d=mysteryman&s=50';
    toInsert.session = new user_1.Session();
    delete toInsert._rev;
    log_1.default.info(`Register new user=${objects_1.inspect(toInsert)}`);
    return Promise.resolve(toInsert);
});
exports.newUser = newUser;
const login = (username, password, tenancyId = null) => camunda_service_1.post('/identity/verify', { username: username, password: password })
    .then(data => {
    log_1.default.debug(`Login OK returning JWT sign data=${objects_1.inspect(data)}!`);
    return jwt.sign({
        user: data.authenticatedUser,
        authenticated: data.authenticated
    })
        .catch(err => errors_1.newInvalidParameters(`JWT sign username=${username} error=${objects_1.inspect(err)}`));
});
exports.login = login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL2F1dGgtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdDQUEyQjtBQUczQix5Q0FBd0M7QUFDeEMsb0NBQW1DO0FBRW5DLHVEQUF3QztBQUV4Qyw4Q0FBaUQ7QUFDakQsd0NBQTZDO0FBQzdDLDRDQUE2RTtBQUU3RSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7QUFxQzFDLGtDQUFXO0FBbkNmLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQixFQUFFLFdBQW1CLElBQUksRUFDL0UsYUFBcUIsSUFBSSxFQUFpQixFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFFakYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsOEJBQXFCLENBQUMsUUFBUSxJQUFJLFVBQVUsS0FBSyxhQUFhLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM1RixDQUFDO0lBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQTtJQUMzQixRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQTtJQUNwQixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFBO0lBQzVDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLG1EQUFtRCxDQUFBO0lBQ25GLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQTtJQUNoQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFFcEIsYUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsaUJBQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFckQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFDLENBQUE7QUFlRSwwQkFBTztBQWJYLE1BQU0sS0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFvQixJQUFJLEVBQUUsRUFBRSxDQUMzRCxzQkFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7S0FDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ1QsYUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtRQUM1QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7S0FDcEMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDZCQUFvQixDQUFDLHFCQUFxQixRQUFRLFVBQVUsaUJBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM5RixDQUFDLENBQUMsQ0FBQTtBQUdOLHNCQUFLIn0=