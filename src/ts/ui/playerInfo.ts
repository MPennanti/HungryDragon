///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import Entity from "../game/entity";

export interface PlayerInfoProps {
    player: Entity;
}

export default class PlayerInfo extends React.Component<PlayerInfoProps, {}> {
    public render(): React.ReactElement<any> {
        let player = this.props.player;
        let fullness = Math.floor((player.stomachFullness / player.stomachSize) * 100);
        let sizeInMeters = player.size / 100;
        return React.DOM.div(
            null,
            player.name,
            " (",
            Math.floor(player.health),
            "/",
            player.maxHealth,
            ")",
            ` Stomach: ${fullness}%`,
            ` Length: ${sizeInMeters}m`
        );
    }
}
