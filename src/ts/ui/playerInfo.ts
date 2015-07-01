///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import Entity from "../game/entity";

export interface PlayerInfoProps {
    player: Entity;
}

export default class PlayerInfo extends React.Component<PlayerInfoProps, {}> {
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
