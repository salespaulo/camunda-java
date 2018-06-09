"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Profile;
(function (Profile) {
    Profile[Profile["OWNER"] = 0] = "OWNER";
    Profile[Profile["CUSTOMER"] = 1] = "CUSTOMER";
    Profile[Profile["EMPLOYEE"] = 2] = "EMPLOYEE";
})(Profile || (Profile = {}));
exports.Profile = Profile;
class Session {
    constructor() {
        this.score = 0;
        this.token = null;
        this.logged = false;
    }
}
exports.Session = Session;
class User {
    constructor() {
        this._id = '';
        this._rev = '';
        this.name = '';
        this.password = '';
        this.phoneNumber = '';
        this.providerId = '';
        this.firebaseId = '';
        this.photoUrl = '';
        this.session = new Session();
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvbW9kZWwvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQUssT0FJSjtBQUpELFdBQUssT0FBTztJQUNSLHVDQUFLLENBQUE7SUFDTCw2Q0FBUSxDQUFBO0lBQ1IsNkNBQVEsQ0FBQTtBQUNaLENBQUMsRUFKSSxPQUFPLEtBQVAsT0FBTyxRQUlYO0FBcUJ1QiwwQkFBTztBQW5CL0I7SUFBQTtRQUNJLFVBQUssR0FBVyxDQUFDLENBQUE7UUFDakIsVUFBSyxHQUFRLElBQUksQ0FBQTtRQUNqQixXQUFNLEdBQVksS0FBSyxDQUFBO0lBQzNCLENBQUM7Q0FBQTtBQWVjLDBCQUFPO0FBYnRCO0lBQUE7UUFDSSxRQUFHLEdBQVcsRUFBRSxDQUFBO1FBQ2hCLFNBQUksR0FBVyxFQUFFLENBQUE7UUFDakIsU0FBSSxHQUFXLEVBQUUsQ0FBQTtRQUNqQixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLGdCQUFXLEdBQVcsRUFBRSxDQUFBO1FBQ3hCLGVBQVUsR0FBVyxFQUFFLENBQUE7UUFDdkIsZUFBVSxHQUFXLEVBQUUsQ0FBQTtRQUN2QixhQUFRLEdBQVcsRUFBRSxDQUFBO1FBRXJCLFlBQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFBO0lBQ3BDLENBQUM7Q0FBQTtBQUVRLG9CQUFJIn0=