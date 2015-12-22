import * as React from "react";
import Player from "../game/player";

export interface PlayerInfoProps {
    player: Player;
}

export default class PlayerInfo extends React.Component<PlayerInfoProps, {}> {
    public render(): React.ReactElement<any> {
        let player = this.props.player;
        let fullness = Math.floor((player.stomachFullness / player.stomach) * 100);
        let sizeInMeters = player.size / 100;
        let HP = `(${Math.floor(player.health)}/${player.maxHealth})`;
        return <div>
            <div><strong>{player.name}</strong></div>
            <div>HP: {HP}</div>
            <div>Stomach: {fullness}%</div>
            <div>Length: {sizeInMeters}m</div>
        </div>;
    }
}
