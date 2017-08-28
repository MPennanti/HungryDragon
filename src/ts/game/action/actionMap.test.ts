import * as chai from "chai";
import ActionMap, { actionMapOrder } from "./actionMap";
import EmptyAction from "./emptyAction";

const expect = chai.expect;

describe("ActionMap", () => {
    it("Returns set actions", () => {
        const actions = {};
        actionMapOrder.forEach((dir: string, index: number) => {
            actions[dir] = index;
        });
        const actionMap = ActionMap.from(actions);
        actionMapOrder.forEach((dir: string, index: number) => {
            expect(actionMap[dir]).to.equal(index);
        });
    });

    it("Returns EmptyAction when not set", () => {
        const actionMap = ActionMap.from({});
        actionMapOrder.forEach((dir: string) => {
            expect(actionMap[dir]).to.be.an.instanceOf(EmptyAction);
        });
    });

});
