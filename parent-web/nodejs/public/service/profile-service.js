"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const tenancyService = require("../service/tenancy-service");
const objects_1 = require("../utils/objects");
const fromUserId = (userId, tenancyId = null) => tenancyService.fromUserId(userId)
    .then(tenancies => {
    const filtered = tenancies
        .filter(tenancy => tenancyId ? tenancy._id === tenancyId : true)
        .filter(tenancy => tenancy.users.some(user => user.userId === userId))
        .map(t => t.users);
    const result = filtered.length > 0 ?
        filtered
            .reduce((users, current) => {
            const hasDuplicate = users.some(u => current.some(c => {
                return c.profile === u.profile;
            }));
            if (hasDuplicate) {
                return users;
            }
            else {
                return users.concat(current);
            }
        })
            .map(user => user.profile) : [];
    log_1.default.debug(`Profile from userId=${userId} mapped=${objects_1.inspect(result)}`);
    return result;
});
exports.fromUserId = fromUserId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL3Byb2ZpbGUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdDQUEyQjtBQUMzQiw2REFBNEQ7QUFHNUQsOENBQTBDO0FBRTFDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBYyxFQUFFLFlBQW9CLElBQUksRUFBc0IsRUFBRSxDQUNoRixjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztLQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFDZCxNQUFNLFFBQVEsR0FBRyxTQUFTO1NBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMvRCxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUM7U0FDckUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXRCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsUUFBUTthQUNQLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUN2QixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1AsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsS0FBSyxDQUFBO1lBQ2hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFbkMsYUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsTUFBTSxXQUFXLGlCQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDakIsQ0FBQyxDQUFDLENBQUE7QUFHRyxnQ0FBVSJ9