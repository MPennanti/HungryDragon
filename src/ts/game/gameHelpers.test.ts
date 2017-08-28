import * as chai from "chai";
import { riceBag } from "./enemies";
import { defaultState } from "./game";
import * as Helpers from "./gameHelpers";
import { HOUR_LENGTH } from "./gameState";

const luckyEnemy = riceBag.setHitChance(1).setHitDamage(1);
const unluckyEnemy = riceBag.setHitChance(0).setHitDamage(1);
const unluckyPlayer = defaultState.player.setHitChance(0).setHitDamage(1);

const expect = chai.expect;

describe("gameHelpers", () => {
    describe("tick", () => {
        it("should advance the clock", () => {
            const result = Helpers.tick(defaultState, 1);
            expect(result.time).to.equal(defaultState.time + 1);
        });
    });

    describe("prettyTime", () => {
        it("displays the correct time", () => {
            // day 7 hour 18 minute 8 second 15
            const time = 670095;
            const result = Helpers.tick(defaultState, time);
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
        it("returns different strings for various levels", () => {
            const results: string[] = [];
            // overfull
            results.push(Helpers.getStomachText(3, true));
            // very full
            results.push(Helpers.getStomachText(2, false));
            // full
            results.push(Helpers.getStomachText(1, false));
            // empty
            results.push(Helpers.getStomachText(0, false));
            // hungry
            results.push(Helpers.getStomachText(.1, false));
            // for each bucket we get a random flavor text, but no buckets should repeat
            const unique = results.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            expect(unique).to.deep.equal(results);
        });

    });

    describe("updatePlayerMass", () => {
        it("increases stats with mass", () => {
            const player = defaultState.player;
            const result = Helpers.updatePlayerMass(player, player.mass * 10);
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
            const state = defaultState.setEnemy(luckyEnemy);
            const result = Helpers.attack(state, false);
            expect(result.player.health).to.equal(state.player.health - 1);
        });

        it("handles missing the player", () => {
            const state = defaultState.setEnemy(unluckyEnemy);
            const result = Helpers.attack(state, false);
            expect(result.player.health).to.equal(state.player.health);
        });

        it("handles the player missing", () => {
            const state = defaultState.setEnemy(unluckyEnemy).setPlayer(unluckyPlayer);
            const result = Helpers.attack(state, true);
            expect(result.enemy).to.be.an("object");
            if (result.enemy) {
                expect(result.enemy.health).to.equal(unluckyEnemy.health);
            }
        });
    });
});
