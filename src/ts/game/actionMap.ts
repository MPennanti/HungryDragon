///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as Immutable from "immutable";
import Model from "./model";
import {Action, EmptyAction} from "./action";

export interface IActionMap {
    nw?: Action;
    n?: Action;
    ne?: Action;
    w?: Action;
    c?: Action;
    e?: Action;
    sw?: Action;
    s?: Action;
    se?: Action;
}

export const actionMapOrder = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];

const emptyAction = new EmptyAction();

export default class ActionMap extends Model implements IActionMap {

    public get nw(): Action {
        return this._data.get("nw", emptyAction);
    }

    public get n(): Action {
        return this._data.get("n", emptyAction);
    }

    public get ne(): Action {
        return this._data.get("ne", emptyAction);
    }

    public get w(): Action {
        return this._data.get("w", emptyAction);
    }

    public get c(): Action {
        return this._data.get("c", emptyAction);
    }

    public get e(): Action {
        return this._data.get("e", emptyAction);
    }

    public get sw(): Action {
        return this._data.get("sw", emptyAction);
    }

    public get s(): Action {
        return this._data.get("s", emptyAction);
    }

    public get se(): Action {
        return this._data.get("se", emptyAction);
    }

    public static from(data?: IActionMap): ActionMap {
        return new ActionMap(Immutable.Map<string, any>(data));
    }
}
