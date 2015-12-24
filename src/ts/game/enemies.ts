import Enemy from "./enemy";

export const riceBag = Enemy.construct({
    name: "Bag of Rice",
    health: 5,
    maxHealth: 5,
    mass: 5,
    hitChance: .5,
    damageText: "The rice bag falls on you (-{0} hp)"
});

export const rat = Enemy.construct({
    name: "Rat",
    health: 6,
    maxHealth: 6,
    mass: 3,
    hitChance: .8,
    hitDamage: 2,
    damageText: "The rat nips you (-{0} hp)"
});

export const largeRat = Enemy.construct({
    name: "Large Rat",
    health: 8,
    maxHealth: 8,
    mass: 6,
    hitChance: .9,
    hitDamage: 4,
    damageText: "The large rat bites you (-{0} hp)"
});

export const hugeRat = Enemy.construct({
    name: "Huge Rat",
    health: 20,
    maxHealth: 20,
    mass: 12,
    hitChance: .95,
    hitDamage: 8,
    damageText: "The huge rat chomps you (-{0} hp)"
});
