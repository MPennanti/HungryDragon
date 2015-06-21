///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as Game from "../../game/game";
import * as chai from "chai";

const expect = chai.expect;

describe("game", () => {
    describe("tick", () => {
        it("should advance the clock", () => {
            let result = Game.tick(Game.defaultState, 1);
            expect(result.time).to.equal(Game.defaultState.time + 1);
        });
    });
});
