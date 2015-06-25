///<reference path="../../../../typings/test.references.d.ts"/>
"use strict";

import Entity from "../../game/entity";
import { newPlayer } from "../../game/player";
import * as Immutable from "immutable";
import * as chai from "chai";

const expect = chai.expect;

describe("entity", () => {
    describe("setters", () => {
        let entity: Entity;
        beforeEach(() => {
            entity = new Entity(Immutable.Map({ maxHealth: 10 }));
        });

        it("sets name", () => {
            let result = entity.setName("Test Name");
            expect(result.name).to.equal("Test Name");
        });

        it("sets health", () => {
            let result = entity.setHealth(10);
            expect(result.health).to.equal(10);
        });

        it("sets maxHealth", () => {
            let result = entity.setMaxHealth(20);
            expect(result.maxHealth).to.equal(20);
        });

        it("isAlive reflects health", () => {
            let result = entity.setHealth(10);
            expect(result.IsAlive).to.be.true;
            result = entity.setHealth(0);
            expect(result.IsAlive).to.be.false;
        });

        it("health cannot exceed maxHealth", () => {
            let result = entity.setHealth(20);
            expect(result.health).to.equal(10);
        });

        it("health cannot be negative", () => {
            let result = entity.setHealth(-5);
            expect(result.health).to.equal(0);
        });

        it("adjusting maxHealth adjusts health", () => {
            let result = entity.setMaxHealth(20);
            result = result.setHealth(20);
            result = result.setMaxHealth(15);
            expect(result.health).to.equal(15);
        });
    });

    describe("default new player", () => {
        it("loads defaults correctly", () => {
            expect(newPlayer.name).to.be.a("string");
            expect(newPlayer.health, "health").to.equal(newPlayer.maxHealth);
            expect(newPlayer.IsAlive, "isAlive").to.equal(true);
        });
    });
});
