import Enemy from "./enemy";

export const riceBag = Enemy.construct({
    name: "Bag of Rice",
    health: 5,
    maxHealth: 5,
    mass: 5,
    hitChance: .5,
    damageTakenText: "You hit the rice bag.",
    damageDealtText: "The rice bag falls on you.",
    foundText: "You notice a suspicious looking bag of rice.",
    devourText: "You gulp down the bag of rice, hoping it doesn't expand too much in your stomach."
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
    foundText: "A rat scurries out from behind a crate and hisses at you.",
    devourText: `The rat tries to scurry away from you, but you trap its tail with you paw.
    It squeaks in fear as you dangle it over your throat before dropping it in.
    In one smooth gulp it vanishes into your body.`
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
    foundText: "A large rat charges out of the shadows.",
    devourText: `The rat hisses at you, but there is no heat to it.
    You pounce your defeated opponent, gulping hungrily.
    The rat struggles weakly in your throat as it sinks into your waiting stomach.`
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
    foundText: "A truly massive rat leaps down from a nearby crate.",
    devourText: `You walk over to your fallen enemy and the giant rat leaps at you in a final desperate attack.
    Anticipating this, you greet your prey with open jaws, its leap carrying it into your throat.
    The rat attempts to scurry back out of your maw, but your tongue wraps around it and drags it the rest of the way in.
    With one massive swallow, you sentence the oversized rodent to the depths of your body.`
});
