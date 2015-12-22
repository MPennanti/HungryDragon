import Player, { newPlayer } from "../../game/player";
import * as Immutable from "immutable";
import * as chai from "chai";

const expect = chai.expect;

describe("player", () => {
    describe("setters", () => {
        let player: Player;
        beforeEach(() => {
            player = new Player(Immutable.Map({ maxHealth: 10 }));
        });

        it("sets stomachsize", () => {
            let result = player.setStomach(10);
            expect(result.stomach).to.equal(10);
        });

        it("sets fullness", () => {
            let result = player.setStomachFullness(10);
            expect(result.stomachFullness).to.equal(10);
        });

        it("detects being overfull", () => {
            let result = player.setStomachFullness(10);
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
