import * as React from "react";
import Player from "../game/player";
import HealthBar from "./healthBar";

export interface PlayerInfoProps {
    player: Player;
}

export default class PlayerInfo extends React.Component<PlayerInfoProps, {}> {
    public render(): React.ReactElement<any> {
        let player = this.props.player;
        let fullness = Math.floor((player.stomachFullness / player.stomach) * 100);
        let sizeInMeters = player.size / 100;
        return <div>
            <div><strong>{player.name}</strong></div>
            <div>
                <span>HP: </span>
                <HealthBar
                    current={player.health}
                    total={player.maxHealth}
                    showExactNumber={true} />
            </div>
            <div>Stomach: {fullness}%</div>
            <div>Length: {sizeInMeters}m</div>
        </div>;
    }
}
