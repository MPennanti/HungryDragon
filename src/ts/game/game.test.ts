import * as Immutable from "immutable";
import * as chai from "chai";
import * as sinon from "sinon";
import * as Game from "./game";
import GameState from "./gameState";
import {actionMapOrder} from "./action/actionMap";
import Action from "./action/action";
import EmptyAction from "./action/emptyAction";
import AttackAction from "./action/attackAction";
import DevourAction from "./action/devourAction";
import MoveAction from "./action/moveAction";
import {riceBag} from "./enemies";
import {strawPile} from "./zone/startingArea";

const expect = chai.expect;

describe("game", () => {
    describe("turn", () => {

        let testAction: Action;
        let actionStub: Sinon.SinonSpy;

        beforeEach(() => {
            testAction = new Action();
            actionStub = sinon.stub(testAction, "doExecute").returnsArg(0);
        });

        it("lets the player take action", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag
            }));
            Game.turn(state, testAction);
            expect(actionStub.calledOnce).to.be.true;
        });

        it("lets the enemy take action", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag
            }));
            let enemyAction = new Action();
            let actionStub = sinon.stub(enemyAction, "doExecute").returnsArg(0);
            let enemyStub = sinon.stub(riceBag, "getAction", (): Action => enemyAction);
            Game.turn(state, testAction);
            enemyStub.restore();
            expect(actionStub.calledOnce).to.be.true;
        });

        it("handles death", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setPlayer(state.player.setHealth(0));
            let result = Game.turn(state, testAction);
            expect(result.log.get(0)).to.equal("You are dead!");
        });

        it("handles enemy death", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag.setHealth(0)
            }));
            let result = Game.turn(state, testAction);
            expect(result.log.last()).to.contain("You have defeated the");
        });

        it("does nothing on player empty action", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag
            }));
            let result = Game.turn(state, new EmptyAction());
            expect(result).to.equal(state);
        });
    });

    describe("getAvailableActions", () => {
        it("returns attack when there is a monster", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag
            }));
            let actions = Game.getAvailableActions(state);
            expect(actions.c).to.be.an.instanceOf(AttackAction);
        });

        it("returns nothing when the player is dead", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setPlayer(state.player.setHealth(0));
            let actions = Game.getAvailableActions(state);
            actionMapOrder.forEach((dir: string) => {
                expect(actions[dir].isEmpty).to.be.true;
            });
        });

        it("returns devour when there is a dead monster", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag.setHealth(0)
            }));
            let actions = Game.getAvailableActions(state);
            expect(actions.c).to.be.an.instanceOf(DevourAction);
        });

        it("returns move when there is no monster", () => {
            let state = new GameState(Immutable.Map({}));
            state = state.setZone(strawPile);
            let actions = Game.getAvailableActions(state);
            expect(actions.e).to.be.an.instanceOf(MoveAction);
        });
    });

    describe("spawnMonster", () => {
        it("does nothing when there is a monster", () => {
            let state = new GameState(Immutable.Map({
                enemy: riceBag,
                canSpawn: true
            }));
            let zone: any = {};
            let result = Game.spawnMonster(state, zone);
            expect(result).to.equal(state);
        });

        it("does nothing when canSpawn is false", () => {
            let state = new GameState(Immutable.Map({
                canSpawn: false
            }));
            let zone: any = {};
            let result = Game.spawnMonster(state, zone);
            expect(result).to.equal(state);
        });

        it("clears canSpawn when monster chance is zero", () => {
            let state = new GameState(Immutable.Map({
                canSpawn: true
            }));
            let zone: any = { monsterChance: 0 };
            let result = Game.spawnMonster(state, zone);
            expect(result.canSpawn).to.be.false;
        });

        it("spawns a monster", () => {
            let state = new GameState(Immutable.Map({
                canSpawn: true
            }));
            let monster: any = {};
            let zone: any = {
                monsterChance: 1,
                getMonster: (): any => { return monster; }
            };
            let result = Game.spawnMonster(state, zone);
            expect(result.canSpawn).to.be.false;
            expect(result.enemy).to.equal(monster);
        });
    });
});
