import * as React from "react";
import Entity from "../game/entity";
import HealthBar from "./healthBar";

export interface EnemyInfoProps {
    enemy: Entity;
}

export default class EnemyInfo extends React.Component<EnemyInfoProps, {}> {

    public render(): React.ReactElement<any> {
        if (this.props.enemy) {
            return <div>
                <div>{this.props.enemy.name}</div>
                <HealthBar
                    current={this.props.enemy.health}
                    total={this.props.enemy.maxHealth} />
            </div>;
        } else {
            return <div>No enemy</div>;
        }
    }

}
