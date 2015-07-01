///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as chai from "chai";
import {EmptyAction} from "../../game/action";
import ActionMap, {actionMapOrder} from "../../game/actionMap";

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
