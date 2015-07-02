///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import Action from "../game/action/action";
import * as Game from "../game/game";
import GameState from "../game/gameState";
import PlayerInfo from "./playerInfo";
import LogViewer from "./logViewer";
import EnemyInfo from "./enemyInfo";
import ActionGrid from "./actionGrid";

export interface UIState {
    gameState: GameState;
}

export default class Shell extends React.Component<{}, UIState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            gameState: Game.defaultState
        };
    }

    public handleActionInput(action: Action): void {
        this.setState({
            gameState: Game.turn(this.state.gameState, action)
        });
    }

    public render(): React.ReactElement<any> {
        return React.DOM.div(
            null,
            React.createElement(PlayerInfo, {
                player: this.state.gameState.player
            }),
            React.createElement(LogViewer, {
                log: this.state.gameState.log
            }),
            React.createElement(EnemyInfo, {
                enemy: this.state.gameState.enemy
            }),
            React.createElement(ActionGrid, {
                actionMap: Game.getAvailableActions(this.state.gameState),
                onActionExecute: this.handleActionInput.bind(this)
            })
        );
    }
}
