import * as React from "react";
import Player from "../game/player";
import HealthBar from "./healthBar";

export interface IPlayerInfoProps {
    player: Player;
}

export default class PlayerInfo extends React.Component<IPlayerInfoProps> {
    public render(): React.ReactElement<any> {
        const player = this.props.player;
        const fullness = Math.floor((player.stomachFullness / player.stomach) * 100);
        const sizeInMeters = player.size / 100;
        return (
            <div>
                <div><strong>{player.name}</strong></div>
                <div>
                    <span>HP: </span>
                    <HealthBar
                        current={player.health}
                        total={player.maxHealth}
                        showExactNumber={true}
                    />
                </div>
                <div>Stomach: {fullness}%</div>
                <div>Length: {sizeInMeters}m</div>
            </div>
        );
    }
}
