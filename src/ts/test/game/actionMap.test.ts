import * as chai from "chai";
import EmptyAction from "../../game/action/emptyAction";
import ActionMap, {actionMapOrder} from "../../game/action/actionMap";

const expect = chai.expect;

describe("ActionMap", () => {
    it("Returns set actions", () => {
        let actions = {};
        actionMapOrder.forEach((dir: string, index: number) => {
            actions[dir] = index;
        });
        let actionMap = ActionMap.from(actions);
        actionMapOrder.forEach((dir: string, index: number) => {
            expect(actionMap[dir]).to.equal(index);
        });
    });

    it("Returns EmptyAction when not set", () => {
        let actionMap = ActionMap.from();
        actionMapOrder.forEach((dir: string) => {
            expect(actionMap[dir]).to.be.an.instanceOf(EmptyAction);
        });
    });

});
