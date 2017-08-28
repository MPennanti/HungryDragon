// tslint:disable:no-unused-expression
import * as chai from "chai";
import * as Immutable from "immutable";
import * as sinon from "sinon";
import Action from "./action/action";
import { actionMapOrder } from "./action/actionMap";
import AttackAction from "./action/attackAction";
import DevourAction from "./action/devourAction";
import EmptyAction from "./action/emptyAction";
import MoveAction from "./action/moveAction";
import RestAction from "./action/restAction";
import { riceBag } from "./enemies";
import * as Game from "./game";
import GameState from "./gameState";
import AllZones from "./zone/allZones";
import { strawPile } from "./zone/startingArea";

const expect = chai.expect;

describe("game", () => {
    describe("turn", () => {

        let testAction: Action;
        let actionStub: sinon.SinonSpy;

        beforeEach(() => {
            testAction = new Action();
            actionStub = sinon.stub(testAction, "execute").returnsArg(0);
        });

        it("lets the player take action", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            Game.turn(state, testAction);
            expect(actionStub.calledOnce).to.be.true;
        });

        it("handles overfull", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setPlayer(state.player.setStomachFullness(1000));
            const result = Game.turn(state, testAction);
            expect(result.log.get(0)).to.equal("You moan and are unable to move much due to your dragging stomach.");
        });

        it("handles death", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setPlayer(state.player.setHealth(0));
            const result = Game.turn(state, testAction);
            expect(result.log.get(0)).to.equal("You are dead!");
        });

        it("handles enemy death", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag.setHealth(0),
            }));
            const result = Game.turn(state, testAction);
            expect(result.log.last()).to.contain("You have defeated the");
        });

        it("does nothing on player empty action", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            const result = Game.turn(state, new EmptyAction());
            expect(result).to.equal(state);
        });
    });

    describe("getAvailableActions", () => {
        it("returns attack when there is a monster", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            const actions = Game.getAvailableActions(state);
            expect(actions.c).to.be.an.instanceOf(AttackAction);
        });

        it("returns nothing when the player is dead", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setPlayer(state.player.setHealth(0));
            const actions = Game.getAvailableActions(state);
            actionMapOrder.forEach((dir: string) => {
                expect(actions[dir].isEmpty).to.be.true;
            });
        });

        it("returns devour when there is a dead monster", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag.setHealth(0),
            }));
            state = state.setPlayer(state.player.setStomach(riceBag.mass));
            const actions = Game.getAvailableActions(state);
            expect(actions.c).to.be.an.instanceOf(DevourAction);
        });

        it("does not devour when there is a dead monster bigger than stomach", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag.setHealth(0),
            }));
            state = state.setPlayer(state.player.setStomach(riceBag.mass - 1));
            const actions = Game.getAvailableActions(state);
            expect(actions.c).to.be.an.instanceOf(EmptyAction);
        });

        it("returns move when there is no monster", () => {
            let state = new GameState(Immutable.Map({
                zoneMap: AllZones,
            }));
            state = state.setZone(strawPile.id);
            const actions = Game.getAvailableActions(state);
            expect(actions.e).to.be.an.instanceOf(MoveAction);
        });
    });

    describe("spawnMonster", () => {
        it("does nothing when there is a monster", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
                canSpawn: true,
            }));
            const zone: any = {};
            const result = Game.spawnMonster(state, zone);
            expect(result).to.equal(state);
        });

        it("does nothing when canSpawn is false", () => {
            const state = new GameState(Immutable.Map({
                canSpawn: false,
            }));
            const zone: any = {};
            const result = Game.spawnMonster(state, zone);
            expect(result).to.equal(state);
        });

        it("clears canSpawn when monster chance is zero", () => {
            const state = new GameState(Immutable.Map({
                canSpawn: true,
            }));
            const zone: any = { monsterChance: 0 };
            const result = Game.spawnMonster(state, zone);
            expect(result.canSpawn).to.be.false;
        });

        it("spawns a monster", () => {
            const state = new GameState(Immutable.Map({
                canSpawn: true,
            }));
            const zone: any = {
                monsterChance: 1,
                getMonster: (): any => riceBag,
            };
            const result = Game.spawnMonster(state, zone);
            expect(result.canSpawn).to.be.false;
            expect(result.enemy).to.equal(riceBag);
        });
    });

    describe("getAuxiliaryActions", () => {
        it("returns nothing when monster is present", () => {
            const state = new GameState(Immutable.Map({
                enemy: riceBag,
            }));
            const actions = Game.getAuxiliaryActions(state);
            expect(actions).to.be.empty;
        });

        it("returns rest when no monster is present", () => {
            const state = new GameState(Immutable.Map({}));
            const actions = Game.getAuxiliaryActions(state);
            expect(actions.length).to.equal(1);
            expect(actions[0]).to.be.an.instanceof(RestAction);
        });
    });
});
