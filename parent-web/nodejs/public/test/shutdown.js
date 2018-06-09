"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
exports.default = app => {
    app.instance.close();
    process.env.PORT = server_1.DEFAULT_PORT;
    process.env.NODE_ENV = server_1.DEFAULT_ENV;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3Rlc3Qvc2h1dGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBcUQ7QUFFckQsa0JBQWUsR0FBRyxDQUFDLEVBQUU7SUFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxxQkFBWSxDQUFBO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLG9CQUFXLENBQUE7QUFDdEMsQ0FBQyxDQUFBIn0=