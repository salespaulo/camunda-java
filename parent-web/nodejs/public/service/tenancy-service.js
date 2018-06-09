"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenancy_1 = require("../model/tenancy");
const errors_1 = require("../utils/errors");
const findById = (id) => new Promise((resolve, reject) => {
    if (!id) {
        return reject(errors_1.newRequiredParameters(`id="${id}"`));
    }
    return Promise.resolve(new tenancy_1.Tenancy());
});
exports.findById = findById;
const newSimpleTenancy = (name, metadata, users) => newTenancy(name, metadata, users, null, null, null);
exports.newSimpleTenancy = newSimpleTenancy;
const newTenancy = (name, metadata, users, products, prices, photoUrl) => new Promise((resolve, reject) => {
    const toInsert = new tenancy_1.Tenancy();
    toInsert.name = name;
    toInsert.users = users || [];
    toInsert.photoUrl = photoUrl || 'http://www.gravatar.com/avatar/?d=mysteryman&s=50';
    toInsert.metadata = metadata || {};
    delete toInsert._rev;
    return Promise.resolve(toInsert);
});
exports.newTenancy = newTenancy;
const fromUserId = (userId) => new Promise((resolve, reject) => {
    return Promise.resolve([]);
});
exports.fromUserId = fromUserId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW5jeS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL3RlbmFuY3ktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUd5QjtBQUV6Qiw0Q0FJd0I7QUFJeEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQW9CLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN2RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLDhCQUFxQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGlCQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQyxDQUFBO0FBcUJpRCw0QkFBUTtBQW5CM0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLElBQVksRUFBRSxRQUFhLEVBQUUsS0FBb0IsRUFBb0IsRUFBRSxDQUM3RixVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQWtCdEIsNENBQWdCO0FBaEJqRCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQVksRUFBRSxRQUFhLEVBQUUsS0FBb0IsRUFBRSxRQUFrQixFQUNyRixNQUFnQixFQUFFLFFBQWdCLEVBQW9CLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNyRixNQUFNLFFBQVEsR0FBWSxJQUFJLGlCQUFPLEVBQUUsQ0FBQTtJQUN2QyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksbURBQW1ELENBQUE7SUFDbkYsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksRUFBSSxDQUFBO0lBQ3BDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQTtJQUVwQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUMsQ0FBQTtBQU1lLGdDQUFVO0FBSi9CLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBYyxFQUFzQixFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdkYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDOUIsQ0FBQyxDQUFDLENBQUE7QUFFTyxnQ0FBVSJ9