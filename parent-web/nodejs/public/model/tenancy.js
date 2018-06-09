"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
class TenancyUser {
    constructor(userId, profile, tags = []) {
        this.userId = userId;
        this.profile = profile;
        this.tags = tags;
    }
}
exports.TenancyUser = TenancyUser;
class Tenancy {
    constructor() {
        this._id = uuid();
        this._rev = '';
    }
}
exports.Tenancy = Tenancy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW5jeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvbW9kZWwvdGVuYW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGdDQUErQjtBQUUvQjtJQUtJLFlBQVksTUFBYyxFQUFFLE9BQWdCLEVBQUUsT0FBaUIsRUFBRTtRQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixDQUFDO0NBQ0o7QUFXaUIsa0NBQVc7QUFUN0I7SUFBQTtRQUNJLFFBQUcsR0FBVyxJQUFJLEVBQUUsQ0FBQTtRQUNwQixTQUFJLEdBQVcsRUFBRSxDQUFBO0lBS3JCLENBQUM7Q0FBQTtBQUVRLDBCQUFPIn0=