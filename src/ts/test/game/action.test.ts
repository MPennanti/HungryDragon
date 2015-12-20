///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import * as chai from "chai";
import Action from "../../game/action/action";
import EmptyAction from "../../game/action/emptyAction";
import AttackAction from "../../game/action/attackAction";
import DevourAction from "../../game/action/devourAction";
import SpawnMonsterAction from "../../game/action/spawnMonsterAction";
import RestAction from "../../game/action/restAction";
import MoveAction from "../../game/action/moveAction";
import {defaultState} from "../../game/game";
import GameState, {HOUR_LENGTH} from "../../game/gameState";
import {riceBag} from "../../game/enemies";
import Zone from "../../game/zone/zone";

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

    describe("EmptyAction", () => {
        let emptyAction = new EmptyAction();

        it("does nothing", () => {
            let state = new GameState(Immutable.Map({}));
            let result = emptyAction.execute(state, state.player);
            expect(result).to.equal(state);
        });

    });

    describe("DevourAction", () => {
        let devourAction = new DevourAction();

        it("consumes the enemy", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag
            }));
            let result = devourAction.execute(state, state.player);
            expect(result.enemy).to.be.null;
        });

    });

    describe("SpawnMonsterAction", () => {
        let spawnMonsterAction = new SpawnMonsterAction();

        it("creates a rice bag", () => {
            let state = new GameState(Immutable.Map({}));
            let result = spawnMonsterAction.execute(state, state.player);
            expect(result.enemy).to.equal(riceBag);
        });

    });

    describe("RestAction", () => {
        let action = new RestAction();

        it("waits for an hour", () => {
            let state = new GameState(Immutable.Map({}));
            let result = action.execute(state, state.player);
            expect(result.time).to.equal(state.time + HOUR_LENGTH);
        });

    });

    describe("MoveAction", () => {
        let newZone = new Zone({
            id: "newZone",
            name: "Zone Name",
            description: "",
            monsterChance: 0,
            nearbyZones: {}
        });
        let action = new MoveAction(newZone);

        it("sets the action name", () => {
            expect(action.name).to.equal(newZone.name);
        });

        it("changes the zone", () => {
            let state = new GameState(Immutable.Map({}));
            let result = action.execute(state, state.player);
            expect(result.zone).to.equal(newZone.id);
        });

        it("spawns a monster", () => {
            let scaryZone = new Zone({
                id: "scaryZone",
                name: "Zone Name",
                description: "",
                monsterChance: 1,
                nearbyZones: {}
            });
            let action = new MoveAction(scaryZone);
            let state = new GameState(Immutable.Map({}));
            let result = action.execute(state, state.player);
            expect(result.zone).to.equal(scaryZone.id);
            expect(result.enemy).to.be.an("object");
        });

    });
});
