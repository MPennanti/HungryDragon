import Zone from "./zone";
import { riceBag, rat, largeRat, hugeRat } from "../enemies";

export const strawPile = new Zone({
    id: "strawPile",
    name: "Pile of Straw",
    description: "A safe place to sleep.",
    monsters: [],
    monsterChance: 0,
    nearbyZones: {
        c: "sleep",
        e: "riceDen",
        s: "dingyStorage"
    }
});

export const riceDen = new Zone({
    id: "riceDen",
    name: "Den of Rice",
    description: "Rice bags lurk here, smug grains that they are.",
    monsters: [riceBag],
    monsterChance: 0.75,
    nearbyZones: {
        w: "strawPile"
    }
});

export const dingyStorage = new Zone({
    id: "dingyStorage",
    name: "Dingy Storage Room",
    description: "A grimy place, infested with rats",
    monsters: [rat, largeRat],
    monsterChance: 0.8,
    nearbyZones: {
        n: "strawPile",
        w: "dingyStorage",
        c: "dingyStorage",
        e: "dingyStorage",
        s: "darkCorner"
    }
});

export const darkCorner = new Zone({
    id: "darkCorner",
    name: "Dark Corner",
    description: "Heavily shadowed corner of the storageroom.",
    monsters: [largeRat, hugeRat],
    monsterChance: 0.9,
    nearbyZones: {
        n: "dingyStorage",
        c: "darkCorner"
    }
});
