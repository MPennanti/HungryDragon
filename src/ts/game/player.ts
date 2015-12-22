import Entity, {IEntity} from "./entity";
import Model from "./model";

export interface IPlayer extends IEntity {
    stomach: number;
}

export default class Player extends Entity implements IPlayer {

    /**
     * The size of your stomach
     */
    public get stomach(): number {
        return this._data.get("stomach", 0);
    }

    public setStomach(size: number): this {
        size = Math.max(size, 0);
        return this.set("stomach", size);
    }

    /**
     * How full your stomach currently is
     */
    public get stomachFullness(): number {
        return this._data.get("fullness", 0);
    }

    public setStomachFullness(size: number): this {
        size = Math.max(size, 0);
        return this.set("fullness", size);
    }

    public get IsOverfull(): boolean {
        return this.stomachFullness > (1.5 * this.stomach);
    }

    /** The size of the player in cm given their mass */
    public get size(): number {
        return Math.round(4.02363 * Math.pow(this.mass, 0.872503));
    }

    static construct(playerDescriptor: IPlayer): Player {
        return Model._construct(Player, playerDescriptor);
    }
}

export const newPlayer = Player.construct({
    name: "Nameless",
    health: 10,
    maxHealth: 10,
    mass: 10,
    stomach: 5,
    hitChance: 1,
    damageText: "You hit the {1} (-{0} hp)"
});
