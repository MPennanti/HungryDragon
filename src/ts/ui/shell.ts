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
        let state = this.state.gameState;
        return React.DOM.div(
            null,
            React.DOM.div(null, state.prettyTime),
            React.createElement(PlayerInfo, {
                player: state.player
            }),
            React.createElement(LogViewer, {
                log: state.log
            }),
            React.createElement(EnemyInfo, {
                enemy: state.enemy
            }),
            React.createElement(ActionGrid, {
                actionMap: Game.getAvailableActions(state),
                onActionExecute: this.handleActionInput.bind(this)
            })
        );
    }
}
