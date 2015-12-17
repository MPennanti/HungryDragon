///<reference path="../../../typings/references.d.ts"/>
"use strict";
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
        let contents = [
            player.name,
            " (",
            Math.floor(player.health),
            "/",
            player.maxHealth,
            ")",
            ` Stomach: ${fullness}%`,
            ` Length: ${sizeInMeters}m`
        ];
        return <div>
            {contents}
        </div>;
    }
}
