import Entity, {IEntity} from "./entity";
import Action from "./action/action";
import Model from "./model";
import AttackAction from "./action/attackAction";

export interface IEnemy extends IEntity {
}

export default class Enemy extends Entity implements IEnemy {

    public getAction(): Action {
        return new AttackAction();
    }

    static construct(enemyDescriptor: IEnemy): Enemy {
        return Model._construct(Enemy, enemyDescriptor);
    }


}
