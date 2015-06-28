///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import * as Immutable from "immutable";
import {AttackAction} from "../game/action";
import * as Game from "../game/game";
import GameState from "../game/gameState";
import Entity from "../game/entity";

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

    public handleClick(ev: React.MouseEvent): void {
        this.setState({
            gameState: Game.turn(this.state.gameState, new AttackAction())
        });
        ev.stopPropagation();
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
            React.DOM.button({ "onClick": this.handleClick.bind(this) }, "Attack")
        );
    }
}

interface PlayerInfoProps {
    player: Entity;
}

class PlayerInfo extends React.Component<PlayerInfoProps, {}> {
    public render(): React.ReactElement<any> {
        return React.DOM.div(
            null,
            this.props.player.name,
            " (",
            this.props.player.health,
            "/",
            this.props.player.maxHealth,
            ")"
        );
    }
}

interface EnemyInfoProps {
    enemy: Entity;
}

class EnemyInfo extends React.Component<EnemyInfoProps, {}> {

    public render(): React.ReactElement<any> {
        return React.DOM.div(
            null,
            this.props.enemy.name,
            " (",
            this._currentHealth(),
            ")"
        );
    }

    private _currentHealth(): string {
        let percent = Math.floor((this.props.enemy.health / this.props.enemy.maxHealth) * 100);
        return `${percent}%`;
    }
 }

interface LogViewerProps {
    log: Immutable.List<string>;
}

class LogViewer extends React.Component<LogViewerProps, {}> {
    public render(): React.ReactElement<any> {
        let items = this.props.log.toArray().map((item: string) => {
            return React.DOM.li(null, item);
        });
        return React.DOM.ul(
            null,
            items
        );
    }
}
