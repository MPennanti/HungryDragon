///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import * as chai from "chai";
import {AttackAction, Action} from "../../game/action";
import GameState, {defaultState} from "../../game/gameState";
import {riceBag} from "../../game/enemies";

let luckyEnemy = riceBag.setHitChance(1).setHitDamage(1);
let luckyPlayer = defaultState.player.setHitChance(1).setHitDamage(1);

const expect = chai.expect;

describe("Action", () => {
    describe("Action", () => {
        it("throws when doExecute isn't implemented", () => {
            let action = new Action();
            expect(action.execute.bind(action, defaultState, defaultState.player)).to.throw(/^Override/);
        });
    });

    describe("AttackAction", () => {
        let attackAction = new AttackAction();

        it("handles player damage", () => {
            let state = new GameState(Immutable.Map({
                enemy: luckyEnemy
            }));
            let result = attackAction.execute(state, state.enemy);
            expect(result.player.health).to.equal(state.player.health - 1);
        });

        it("handles enemy damage", () => {
            let state = new GameState(Immutable.Map({
                player: luckyPlayer,
                enemy: luckyEnemy
            }));
            let result = attackAction.execute(state, state.player);
            expect(result.enemy.health).to.equal(state.enemy.health - 1);
        });
    });
});
