import * as chai from "chai";
import Zone from "./zone";

const expect = chai.expect;

describe("Zone", () => {
    it("Returns a monster", () => {
        let monster: any = {};
        let zone = new Zone({
            id: "zone",
            name: "Zone Name",
            description: "",
            monsters: [monster],
            monsterChance: 0,
            nearbyZones: {}
        });
        let chosenMonster = zone.getMonster();
        expect(chosenMonster).to.equal(monster);
    });

});
