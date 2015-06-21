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

    describe("prettyTime", () => {
        it("displays the correct time", () => {
            // day 7 hour 18 minute 8 second 15
            let time = 670095;
            let result = Game.tick(Game.defaultState, time);
            expect(result.time).to.equal(time);
            expect(result.day, "day").to.equal(7);
            expect(result.hour, "hour").to.equal(18);
            expect(result.minute, "minute").to.equal(8);
            expect(result.second, "second").to.equal(15);
            expect(result.prettyTime).to.equal("Day 7 [18:08]");
        });
    });
});
