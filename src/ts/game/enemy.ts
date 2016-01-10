import Entity, {IEntity} from "./entity";
import Model from "./model";

export interface IEnemy extends IEntity {
    damageTakenText: string;
    damageDealtText: string;
}

export default class Enemy extends Entity implements IEnemy {

    static construct(enemyDescriptor: IEnemy): Enemy {
        return Model._construct(Enemy, enemyDescriptor);
    }

    /**
     * A string used when the enemy takes damage
     */
    public get damageTakenText(): string {
        return this._data.get("damageTakenText");
    }

    /**
     * A string used when the enemy deals damage
     */
    public get damageDealtText(): string {
        return this._data.get("damageDealtText");
    }

}
