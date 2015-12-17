///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react";
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
        return <div>
            <div>{state.prettyTime}</div>
            <PlayerInfo player={state.player} />
            <LogViewer log={state.log} />
            <EnemyInfo enemy={state.enemy} />
            <ActionGrid
                actionMap={Game.getAvailableActions(state) }
                onActionExecute={(action: Action) => this.handleActionInput(action) }
            />
        </div>;
    }
}
