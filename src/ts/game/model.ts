import * as Immutable from "immutable";

export type ImmutableObject = Immutable.Map<string, any>;

export default class Model {
    protected static _construct<T extends Model, U>(type: { new (data: ImmutableObject): T; }, data: U): T {
        return new type(Immutable.Map<string, any>(data));
    }

    protected _data: ImmutableObject;

    constructor(data: ImmutableObject) {
        this._data = data;
    }

    protected set(name: string, value: any): this {
        const constructor: any = this.constructor;
        return new constructor(this._data.set(name, value));
    }
}
