import * as Helpers from "./gameHelpers";
import { HOUR_LENGTH } from "./gameState";
import { defaultState } from "./game";
import * as chai from "chai";
import { riceBag } from "./enemies";

const luckyEnemy = riceBag.setHitChance(1).setHitDamage(1);

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
            player = player.setStomach(10);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, 1);
            expect(result.player.stomachFullness).to.be.lessThan(15);
        });

        it("heals you completely after fully digesting", () => {
            let player = defaultState.player;
            player = player.setHealth(0);
            player = player.setStomachFullness(player.stomach);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, HOUR_LENGTH * 8);
            expect(result.player.health).to.equal(player.maxHealth);
        });
    });

    describe("getStomachText", () => {
        it("handles overfull", () => {
            let result = Helpers.getStomachText(2, true);
            expect(result).to.contain("groans");
        });

        it("handles full", () => {
            let result = Helpers.getStomachText(1, false);
            expect(result).to.contain("fullness");
        });

        it("handles empty", () => {
            let result = Helpers.getStomachText(0, false);
            expect(result).to.contain("ravenous");
        });

        it("handles hungry", () => {
            let result = Helpers.getStomachText(.1, false);
            expect(result).to.contain("hungrily");
        });
    });

    describe("updatePlayerMass", () => {
        it("increases stats with mass", () => {
            let player = defaultState.player;
            let result = Helpers.updatePlayerMass(player, player.mass * 10);
            expect(result.stomach).to.be.greaterThan(player.stomach);
            expect(result.maxHealth).to.be.greaterThan(player.maxHealth);
            expect(result.hitDamage).to.be.greaterThan(player.hitDamage);
        });

        it("heals you completely after fully digesting", () => {
            let player = defaultState.player;
            player = player.setHealth(0);
            player = player.setStomachFullness(player.stomach);
            let result = defaultState.setPlayer(player);
            result = Helpers.digest(result, HOUR_LENGTH * 8);
            expect(result.player.health).to.equal(player.maxHealth);
        });
    });

    describe("attack", () => {
        it("handles player damage", () => {
            let state = defaultState.setEnemy(luckyEnemy);
            let result = Helpers.attack(state, false);
            expect(result.player.health).to.equal(state.player.health - 1);
        });
    });
});
