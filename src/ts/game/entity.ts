///<reference path="../../../typings/references.d.ts"/>
"use strict";
import Model from "./model";

export interface IEntity {
    name: string;
    health: number;
    maxHealth: number;
    hitChance: number;
    damageText: string;
    mass: number;
}

export default class Entity extends Model implements IEntity {

    public get name(): string {
        return this._data.get("name", "Nameless");
    }

    public setName(name: string): this {
        return this.set("name", name);
    }

    public get health(): number {
        return this._data.get("health", 0);
    }

    public setHealth(health: number): this {
        // stay within 0 - maxHealth
        health = Math.max(health, 0);
        health = Math.min(health, this.maxHealth);
        return this.set("health", health);
    }

    public get maxHealth(): number {
        return this._data.get("maxHealth", 0);
    }

    public setMaxHealth(health: number): this {
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

    public setHitChance(hitChance: number): this {
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

    public setHitDamage(hitDamage: number): this {
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
     * How much of you there is
     */
    public get mass(): number {
        return this._data.get("mass", 1);
    }

    public setMass(mass: number): this {
        mass = Math.max(mass, 0);
        return this.set("mass", mass);
    }

    static construct(entityDescriptor: IEntity): Entity {
        return Model._construct(Entity, entityDescriptor);
    }
}
