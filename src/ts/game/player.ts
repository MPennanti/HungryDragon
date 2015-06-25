///<reference path="../../../typings/references.d.ts"/>
"use strict";
import Entity from "./entity";
import * as Immutable from "immutable";

export const newPlayer = new Entity(Immutable.Map({
    name: "Nameless",
    health: 10,
    maxHealth: 10
}));
