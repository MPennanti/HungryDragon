///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import Action from "../game/action/action";
import ActionMap, {actionMapOrder} from "../game/action/actionMap";

export interface ActionGridProps {
    actionMap: ActionMap;
    onActionExecute: (action: Action) => void;
}

export default class ActionGrid extends React.Component<ActionGridProps, {}> {

    public render(): React.ReactElement<any> {
        let actions = this.getActions(this.props.actionMap);
        return React.DOM.div(
            {
                className: "hd-ActionGrid"
            },
            [actions]
        );
    }

    public getActions(actionMap: ActionMap): React.ReactElement<any>[] {
        return actionMapOrder.map((direction: string): React.ReactElement<any> => {
            return this.getAction(this.props.actionMap[direction]);
        });
    }

    public getAction(action: Action): React.ReactElement<any> {
        return React.DOM.div(
            {
                className: "hd-ActionGrid-Cell"
            },
            React.DOM.button({ "onClick": this.handleClick.bind(this, action) }, action.name)
        );
    }

    public handleClick(action: Action, ev: React.MouseEvent): void {
        this.props.onActionExecute(action);
        ev.stopPropagation();
    }
}
