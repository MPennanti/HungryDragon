///<reference path="../../../typings/references.d.ts"/>
"use strict";
import {makeEntity} from "./entity";

export const newPlayer = makeEntity({
    name: "Nameless",
    health: 10,
    maxHealth: 10,
    mass: 10,
    stomach: 5,
    hitChance: 1,
    damageText: "You hit the {1} (-{0} hp)"
});
