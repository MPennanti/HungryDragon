///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as Helpers from "../../game/gameHelpers";
import { HOUR_LENGTH } from "../../game/gameState";
import { defaultState } from "../../game/game";
import * as chai from "chai";

const expect = chai.expect;

describe("gameHelpers", () => {
    describe("tick", () => {
        it("should advance the clock", () => {
            let result = Helpers.tick(defaultState, 1);
            expect(result.time).to.equal(defaultState.time + 1);
        });
    });

    describe("prettyTime", () => {
        it("displays the correct time", () => {
            // day 7 hour 18 minute 8 second 15
            let time = 670095;
            let result = Helpers.tick(defaultState, time);
            expect(result.time).to.equal(time);
            expect(result.day, "day").to.equal(7);
            expect(result.hour, "hour").to.equal(18);
            expect(result.minute, "minute").to.equal(8);
            expect(result.second, "second").to.equal(15);
            expect(result.prettyTime).to.equal("Day 7 [18:08]");
        });
    });

    describe("digest", () => {
        it("reduces fullness", () => {
            let player = defaultState.player;
            player = player.setStomachFullness(15);
            player = player.setStomachSize(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, 1);
            expect(result.player.stomachFullness).to.be.lessThan(15);
        });

        it("handles overfull", () => {
            let player = defaultState.player;
            player = player.setStomachFullness(20);
            player = player.setStomachSize(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, 1);
            expect(result.log.last()).to.contain("groans");
        });

        it("handles empty", () => {
            let player = defaultState.player;
            player = player.setStomachFullness(0);
            player = player.setStomachSize(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, 1);
            expect(result.log.last()).to.contain("ravenous");
        });

        it("handles hungry", () => {
            let player = defaultState.player;
            player = player.setStomachFullness(1);
            player = player.setStomachSize(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, 1);
            expect(result.log.last()).to.contain("hungrily");
        });

        it("heals you completely after fully digesting", () => {
            let player = defaultState.player;
            player = player.setHealth(0);
            player = player.setMaxHealth(100);
            player = player.setStomachFullness(10);
            player = player.setStomachSize(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, HOUR_LENGTH * 8);
            expect(result.player.health).to.equal(100);
        });
    });
});
