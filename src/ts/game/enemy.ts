///<reference path="../../../typings/references.d.ts"/>
"use strict";
import Entity, {IEntity} from "./entity";
import Action from "./action/action";
import Model from "./model";

export interface IEnemy extends IEntity {
    defaultAction: typeof Action;
}

export default class Enemy extends Entity implements IEnemy {

    /**
     * The default action monsters perform on their turn.
     */
    public get defaultAction(): typeof Action {
        return this._data.get("defaultAction");
    }

    public getAction(): Action {
        let actionCtor: typeof Action = this.defaultAction;
        return new actionCtor();
    }

    static construct(enemyDescriptor: IEnemy): Enemy {
        return Model._construct(Enemy, enemyDescriptor);
    }


}
