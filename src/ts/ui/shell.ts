///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import * as Game from "../game/game";
import GameState from "../game/gameState";

export interface UIState {
    gameState: GameState;
}

export default class Shell extends React.Component<{}, UIState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            gameState: Game.defaultState
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev: React.MouseEvent): void {
        this.setState({
            gameState: Game.tick(this.state.gameState, 1)
        });
        ev.stopPropagation();
    }

    render(): React.ReactElement<any> {
        return React.DOM.div(
            null,
            React.DOM.button({"onClick": this.handleClick }, "Wait a second"),
            " Time in seconds: ",
            this.state.gameState.time
        );
    }
}
