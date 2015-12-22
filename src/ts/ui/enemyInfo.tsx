import * as React from "react";
import Entity from "../game/entity";

export interface EnemyInfoProps {
    enemy: Entity;
}

export default class EnemyInfo extends React.Component<EnemyInfoProps, {}> {

    public render(): React.ReactElement<any> {
        let contents: string | string[] = "No enemy";
        if (this.props.enemy) {
            contents = [this.props.enemy.name, " (", this._currentHealth(), ")"];
        }
        return <div>{contents}</div>;
    }

    private _currentHealth(): string {
        let percent = Math.floor((this.props.enemy.health / this.props.enemy.maxHealth) * 100);
        return `${percent}%`;
    }
}
