///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as Immutable from "immutable";
import Model from "./model";
import Action from "./action/action";

export interface IEntity {
    name: string;
    health: number;
    maxHealth: number;
    hitChance: number;
    damageText: string;
    mass: number;
    stomach?: number;
}

export interface IEnemy extends IEntity {
    defaultAction: typeof Action;
}

export default class Entity extends Model implements IEntity {

    public get name(): string {
        return this._data.get("name", "Nameless");
    }

    public setName(name: string): Entity {
        return this.set("name", name);
    }

    public get health(): number {
        return this._data.get("health", 0);
    }

    public setHealth(health: number): Entity {
        // stay within 0 - maxHealth
        health = Math.max(health, 0);
        health = Math.min(health, this.maxHealth);
        return this.set("health", health);
    }

    public get maxHealth(): number {
        return this._data.get("maxHealth", 0);
    }

    public setMaxHealth(health: number): Entity {
        health = Math.max(health, 0);
        let result = this.set("maxHealth", health);
        // ensure that health stays less than maxHealth
        if (result.health > result.maxHealth) {
            result = result.setHealth(result.maxHealth);
        }
        return result;
    }

    public get IsAlive(): boolean {
        return this.health > 0;
    }

    /**
     * The chance you hit your opponent, currently from [0,1)
     */
    public get hitChance(): number {
        return this._data.get("hitChance", 1);
    }

    public setHitChance(hitChance: number): Entity {
        hitChance = Math.max(hitChance, 0);
        hitChance = Math.min(hitChance, 1);
        return this.set("hitChance", hitChance);
    }

    /**
     * The base amount of damage you do per hit
     */
    public get hitDamage(): number {
        return this._data.get("hitDamage", 1);
    }

    public setHitDamage(hitDamage: number): Entity {
        hitDamage = Math.max(hitDamage, 0);
        return this.set("hitDamage", hitDamage);
    }

    /**
     * A string used when the current entity does damage
     */
    public get damageText(): string {
        return this._data.get("damageText");
    }

    /**
     * The default action monsters perform on their turn.
     */
    public get defaultAction(): Action {
        let actionCtor: typeof Action = this._data.get("defaultAction");
        return new actionCtor();
    }

    protected set(name: string, value: any): Entity {
        return this.setValue(Entity, name, value);
    }

    /**
     * How much of you there is
     */
    public get mass(): number {
        return this._data.get("mass", 1);
    }

    public setMass(mass: number): Entity {
        mass = Math.max(mass, 0);
        return this.set("mass", mass);
    }

    /**
     * The size of your stomach
     */
    public get stomachSize(): number {
        return this._data.get("stomach", 0);
    }

    public setStomachSize(size: number): Entity {
        size = Math.max(size, 0);
        return this.set("stomach", size);
    }

    /**
     * How full your stomach currently is
     */
    public get stomachFullness(): number {
        return this._data.get("fullness", 0);
    }

    public setStomachFullness(size: number): Entity {
        size = Math.max(size, 0);
        return this.set("fullness", size);
    }

    public get IsOverfull(): boolean {
        return this.stomachFullness > (1.5 * this.stomachSize);
    }

    /** The size of the player in cm given their mass */
    public get size(): number {
        return Math.round(4.02363 * Math.pow(this.mass, 0.872503));
    }
}

export function makeEntity(entityDescriptor: IEntity): Entity {
    return new Entity(Immutable.Map<string, any>(entityDescriptor));
}

export function makeEnemy(enemyDescriptor: IEnemy): Entity {
    return makeEntity(enemyDescriptor);
}
