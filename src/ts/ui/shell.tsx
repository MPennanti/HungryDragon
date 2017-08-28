import * as React from "react";
import Action from "../game/action/action";
import * as Game from "../game/game";
import GameState from "../game/gameState";
import ActionBar from "./actionBar";
import ActionGrid from "./actionGrid";
import EnemyInfo from "./enemyInfo";
import LogViewer from "./logViewer";
import PlayerInfo from "./playerInfo";

export interface IUIState {
    gameState: GameState;
}

export default class Shell extends React.Component<{}, IUIState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            gameState: Game.defaultState,
        };
    }

    public handleActionInput = (action: Action): void => {
        this.setState({
            gameState: Game.turn(this.state.gameState, action),
        });
    }

    public render(): React.ReactElement<any> {
        const state = this.state.gameState;
        const currentZone = state.getCurrentZone();
        return (
            <div className="hd-Shell">
                <div className="hd-PlayerPane">
                    <div>{state.prettyTime}</div>
                    <PlayerInfo player={state.player} />
                </div>
                <div className="hd-MainPane">
                    <div className="hd-ZoneName">{currentZone.name}</div>
                    <LogViewer log={state.log} />
                    <div className="hd-ActionArea">
                        <ActionGrid
                            actionMap={Game.getAvailableActions(state)}
                            onActionExecute={this.handleActionInput}
                        />
                        <ActionBar
                            actions={Game.getAuxiliaryActions(state)}
                            onActionExecute={this.handleActionInput}
                        />
                    </div>
                </div>
                <div className="hd-EnemyPane">
                    <EnemyInfo enemy={state.enemy} />
                </div>
            </div>
        );
    }
}
