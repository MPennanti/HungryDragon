///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as Immutable from "immutable";

export type ImmutableObject = Immutable.Map<string, any>;

export default class Model {
    protected _data: ImmutableObject;

    constructor(data: ImmutableObject) {
        this._data = data;
    }

    protected setValue<T extends Model>(type: { new (data: ImmutableObject): T; }, name: string, value: any): T {
        return new type(this._data.set(name, value));
    }
}
