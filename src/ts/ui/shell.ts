///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import * as Game from "../game/game";
import GameState, { MINUTE_LENGTH, HOUR_LENGTH, DAY_LENGTH } from "../game/gameState";

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

    handleClick(length: number, ev: React.MouseEvent): void {
        this.setState({
            gameState: Game.tick(this.state.gameState, length)
        });
        ev.stopPropagation();
    }

    render(): React.ReactElement<any> {
        return React.DOM.div(
            null,
            React.DOM.button({ "onClick": this.handleClick.bind(this, 1) }, "Wait a second"),
            React.DOM.button({ "onClick": this.handleClick.bind(this, MINUTE_LENGTH) }, "Wait a minute"),
            React.DOM.button({ "onClick": this.handleClick.bind(this, HOUR_LENGTH) }, "Wait an hour"),
            React.DOM.button({"onClick": this.handleClick.bind(this, DAY_LENGTH) }, "Wait a day"),
            " Time in seconds: ",
            this.state.gameState.time,
            " Pretty time: ",
            this.state.gameState.prettyTime
        );
    }
}
