///<reference path="../../../typings/references.d.ts"/>
"use strict";
import Enemy from "./enemy";
import AttackAction from "./action/attackAction";

export const riceBag = Enemy.construct({
    name: "Bag of Rice",
    health: 5,
    maxHealth: 5,
    mass: 5,
    hitChance: .5,
    damageText: "The rice bag falls on you (-{0} hp)",
    defaultAction: AttackAction
});
