// tslint:disable:no-unused-expression
import * as chai from "chai";
import * as Immutable from "immutable";
import Player, { newPlayer } from "./player";

const expect = chai.expect;

describe("player", () => {
    describe("setters", () => {
        let player: Player;
        beforeEach(() => {
            player = new Player(Immutable.Map({ maxHealth: 10 }));
        });

        it("sets stomachsize", () => {
            const result = player.setStomach(10);
            expect(result.stomach).to.equal(10);
        });

        it("sets fullness", () => {
            const result = player.setStomachFullness(10);
            expect(result.stomachFullness).to.equal(10);
        });

        it("detects being overfull", () => {
            let result = player.setStomachFullness(16);
            result = result.setStomach(5);
            expect(result.IsOverfull).to.be.true;
        });
    });

    describe("default new player", () => {
        it("loads defaults correctly", () => {
            expect(newPlayer.name).to.be.a("string");
            expect(newPlayer.health, "health").to.equal(newPlayer.maxHealth);
            expect(newPlayer.IsAlive, "isAlive").to.equal(true);
        });
    });
});
