import Entity, {IEntity} from "./entity";
import Model from "./model";

export interface IEnemy extends IEntity {
}

export default class Enemy extends Entity implements IEnemy {

    static construct(enemyDescriptor: IEnemy): Enemy {
        return Model._construct(Enemy, enemyDescriptor);
    }


}
