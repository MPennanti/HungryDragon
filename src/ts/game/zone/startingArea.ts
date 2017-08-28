import { hugeRat, largeRat, rat, riceBag } from "../enemies";
import Zone from "./zone";

export const strawPile = new Zone({
    id: "strawPile",
    name: "Pile of Straw",
    description: "This seems like a safe place to sleep.",
    monsters: [],
    monsterChance: 0,
    nearbyZones: {
        c: "sleep",
        e: "riceDen",
        s: "dingyStorage",
    },
});

export const riceDen = new Zone({
    id: "riceDen",
    name: "Den of Rice",
    description: "Rice bags lurk here, smug grains that they are.",
    monsters: [riceBag],
    monsterChance: 0.75,
    nearbyZones: {
        w: "strawPile",
    },
});

export const dingyStorage = new Zone({
    id: "dingyStorage",
    name: "Dingy Storage Room",
    description: "This is a grimy place, quite infested with rats.",
    monsters: [[2, rat], largeRat],
    monsterChance: 0.8,
    nearbyZones: {
        n: "strawPile",
        w: "dingyStorage",
        c: "dingyStorage",
        e: "dingyStorage",
        s: "darkCorner",
    },
});

export const darkCorner = new Zone({
    id: "darkCorner",
    name: "Dark Corner",
    description: "This is a heavily shadowed corner of the storageroom. You can sense something malicious lurking nearby.",
    monsters: [[2, largeRat], hugeRat],
    monsterChance: 0.9,
    nearbyZones: {
        n: "dingyStorage",
        c: "darkCorner",
    },
});
