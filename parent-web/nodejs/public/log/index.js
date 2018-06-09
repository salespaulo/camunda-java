"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("../utils/objects");
const config = require("config");
const winston = require('winston');
const morgan = require('morgan');
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            level: config.get('logger.file.level'),
            filename: config.get('logger.file.path'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: config.get('logger.console.level'),
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
logger.stream = {
    write: (message, encoding) => logger.info(message)
};
const createMorgan = () => morgan('combined', { stream: logger.stream });
exports.default = objects_1.merge(logger, { morgan: createMorgan });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2xvZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUF3QztBQUV4QyxpQ0FBZ0M7QUFFaEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUVoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLFVBQVUsRUFBRTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFFO1lBQzNCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1lBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO1lBQ3hDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtZQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztZQUN6QyxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztLQUNMO0lBQ0QsV0FBVyxFQUFFLEtBQUs7Q0FDckIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNaLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0NBQ3JELENBQUE7QUFFRCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBRXhFLGtCQUFlLGVBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQSJ9