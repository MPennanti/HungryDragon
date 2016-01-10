import Enemy from "./enemy";

export const riceBag = Enemy.construct({
    name: "Bag of Rice",
    health: 5,
    maxHealth: 5,
    mass: 5,
    hitChance: .5,
    damageTakenText: "You hit the rice bag.",
    damageDealtText: "The rice bag falls on you.",
    foundText: "You notice a suspicious looking bag of rice."
});

export const rat = Enemy.construct({
    name: "Rat",
    health: 6,
    maxHealth: 6,
    mass: 3,
    hitChance: .8,
    hitDamage: 2,
    damageTakenText: "You hit the rat.",
    damageDealtText: "The rat nips you.",
    foundText: "A rat scurries out from behind a crate and hisses at you."
});

export const largeRat = Enemy.construct({
    name: "Large Rat",
    health: 8,
    maxHealth: 8,
    mass: 6,
    hitChance: .9,
    hitDamage: 4,
    damageTakenText: "You hit the large rat.",
    damageDealtText: "The large rat bites you.",
    foundText: "A large rat charges out of the shadows."
});

export const hugeRat = Enemy.construct({
    name: "Huge Rat",
    health: 20,
    maxHealth: 20,
    mass: 12,
    hitChance: .95,
    hitDamage: 8,
    damageTakenText: "You hit the huge rat.",
    damageDealtText: "The huge rat chomps you.",
    foundText: "A truly massive rat leaps down from a nearby crate."
});
