///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import * as chai from "chai";
import * as sinon from "sinon";
import * as Game from "../../game/game";
import GameState from "../../game/gameState";
import {actionMapOrder} from "../../game/actionMap";
import {Action, EmptyAction, AttackAction} from "../../game/action";
import {riceBag} from "../../game/enemies";

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
            let enemyStub = sinon.stub(riceBag, "defaultAction", { get: (): Action => enemyAction });
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
            // for now we just spawn a new enemy
            expect(result.enemy.IsAlive).to.be.true;
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
    });
});
