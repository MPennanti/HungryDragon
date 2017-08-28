import * as React from "react";
import Action from "../game/action/action";
import ActionMap, { actionMapOrder } from "../game/action/actionMap";
import ActionButton from "./actionButton";

export interface IActionGridProps {
    actionMap: ActionMap;
    onActionExecute: (action: Action) => void;
}

export default class ActionGrid extends React.Component<IActionGridProps> {

    public render() {
        const actions = this.getActions(this.props.actionMap);
        return (
            <div className="hd-ActionGrid">
                {actions}
            </div>
        );
    }

    public getActions(actionMap: ActionMap) {
        return actionMapOrder.map((direction: string) => {
            const action = actionMap[direction];
            return (
                <ActionButton
                    key={`${direction}/${action.id}`}
                    action={action}
                    className={"hd-ActionGrid-Cell"}
                    onActionExecute={this.handleAction}
                />
            );
        });
    }

    public handleAction = (action: Action): void  => {
        this.props.onActionExecute(action);
    }
}
