import { registerZone } from "./zoneMap";

export const strawPile = registerZone({
    id: "strawPile",
    name: "Pile of Straw",
    description: "A safe place to rest",
    monsterChance: 0,
    nearbyZones: {
        c: "rest",
        e: "riceDen"
    }
});

export const riceDen = registerZone({
    id: "riceDen",
    name: "Den of Rice",
    description: "Rice bags lurk here, smug grains that they are.",
    monsterChance: 0.5,
    nearbyZones: {
        w: "strawPile"
    }
});
