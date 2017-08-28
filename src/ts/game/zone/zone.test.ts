import * as chai from "chai";
import Zone from "./zone";

const expect = chai.expect;

describe("Zone", () => {
    it("Returns a monster", () => {
        const monster: any = {};
        const zone = new Zone({
            id: "zone",
            name: "Zone Name",
            description: "",
            monsters: [monster],
            monsterChance: 0,
            nearbyZones: {},
        });
        const chosenMonster = zone.getMonster();
        expect(chosenMonster).to.equal(monster);
    });

});
