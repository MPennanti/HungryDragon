import * as React from "react";
import Action from "../game/action/action";
import * as Game from "../game/game";
import GameState from "../game/gameState";
import PlayerInfo from "./playerInfo";
import LogViewer from "./logViewer";
import EnemyInfo from "./enemyInfo";
import ActionGrid from "./actionGrid";
import ActionBar from "./actionBar";

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
        let currentZone = state.getCurrentZone();
        return <div className="hd-Shell">
            <div className="hd-PlayerPane">
                <div>{state.prettyTime}</div>
                <PlayerInfo player={state.player} />
            </div>
            <div className="hd-MainPane">
                <div className="hd-ZoneName">{currentZone.name}</div>
                <LogViewer log={state.log} />
                <div className="hd-ActionArea">
                    <ActionGrid
                        actionMap={Game.getAvailableActions(state) }
                        onActionExecute={(action: Action) => this.handleActionInput(action) }
                    />
                    <ActionBar
                        actions={ Game.getAuxiliaryActions(state) }
                        onActionExecute={(action: Action) => this.handleActionInput(action) }
                    />
                </div>
            </div>
            <div className="hd-EnemyPane">
                <EnemyInfo enemy={state.enemy} />
            </div>
        </div>;
    }
}
