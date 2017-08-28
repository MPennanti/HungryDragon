// tslint:disable:no-unused-expression
import * as chai from "chai";
import * as Immutable from "immutable";
import { riceBag } from "../enemies";
import { defaultState } from "../game";
import GameState, { HOUR_LENGTH } from "../gameState";
import Zone from "../zone/zone";
import Action from "./action";
import AttackAction from "./attackAction";
import DevourAction from "./devourAction";
import EmptyAction from "./emptyAction";
import MoveAction from "./moveAction";
import RestAction from "./restAction";
import SleepAction from "./sleepAction";
import SpareMonsterAction from "./spareMonsterAction";
import SpawnMonsterAction from "./spawnMonsterAction";

const luckyEnemy = riceBag.setHitChance(1).setHitDamage(1);
const luckyPlayer = defaultState.player.setHitChance(1).setHitDamage(1);

const expect = chai.expect;

describe("Action", () => {
    describe("Action", () => {
        it("throws when doExecute isn't implemented", () => {
            const action = new Action();
            expect(action.execute.bind(action, defaultState, defaultState.player)).to.throw(/^Override/);
        });
    });

    describe("AttackAction", () => {
        const attackAction = new AttackAction();

        it("handles enemy damage", () => {
            const state = new GameState(Immutable.Map({
                player: luckyPlayer,
                enemy: luckyEnemy,
            }));
            const result = attackAction.execute(state);
            expect(result.enemy).to.be.an("object");
            if (result.enemy) {
                expect(result.enemy.health).to.equal(luckyEnemy.health - 1);
            }
        });
    });

    describe("EmptyAction", () => {
        const emptyAction = new EmptyAction();

        it("does nothing", () => {
            const state = new GameState(Immutable.Map({}));
            const result = emptyAction.execute(state);
            expect(result).to.equal(state);
        });

    });

    describe("DevourAction", () => {
        const devourAction = new DevourAction();

        it("consumes the enemy", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            const result = devourAction.execute(state);
            expect(result.enemy).to.be.undefined;
        });

    });

    describe("SpawnMonsterAction", () => {
        const spawnMonsterAction = new SpawnMonsterAction();

        it("creates a rice bag", () => {
            const state = new GameState(Immutable.Map({}));
            const result = spawnMonsterAction.execute(state);
            expect(result.enemy).to.equal(riceBag);
        });

    });

    describe("SpareMonsterAction", () => {
        const spareMonsterAction = new SpareMonsterAction();

        it("lets the monster go", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            const result = spareMonsterAction.execute(state);
            expect(result.enemy).to.be.undefined;
        });

    });

    describe("RestAction", () => {
        const action = new RestAction();

        it("waits for an hour", () => {
            const state = new GameState(Immutable.Map({}));
            const result = action.execute(state);
            expect(result.time).to.equal(state.time + HOUR_LENGTH);
        });

    });

    describe("SleepAction", () => {
        const action = new SleepAction();

        it("waits for a full 8 hours", () => {
            const state = new GameState(Immutable.Map({}));
            const result = action.execute(state);
            expect(result.time).to.equal(state.time + 8 * HOUR_LENGTH);
        });

    });

    describe("MoveAction", () => {
        const newZone = new Zone({
            id: "newZone",
            name: "Zone Name",
            description: "",
            monsters: [],
            monsterChance: 0,
            nearbyZones: {},
        });
        const action = new MoveAction(newZone);

        it("sets the action name", () => {
            expect(action.name).to.equal(newZone.name);
        });

        it("changes the zone", () => {
            const state = new GameState(Immutable.Map({}));
            const result = action.execute(state);
            expect(result.zone).to.equal(newZone.id);
        });

        it("can spawn a monster", () => {
            const scaryZone = new Zone({
                id: "scaryZone",
                name: "Zone Name",
                description: "",
                monsters: [],
                monsterChance: 1,
                nearbyZones: {},
            });
            const moveAction = new MoveAction(scaryZone);
            const state = new GameState(Immutable.Map({}));
            const result = moveAction.execute(state);
            expect(result.zone).to.equal(scaryZone.id);
            expect(result.canSpawn).to.be.true;
        });

    });
});
