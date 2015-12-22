import * as React from "react";
import Action from "../game/action/action";
import ActionMap, {actionMapOrder} from "../game/action/actionMap";

export interface ActionGridProps {
    actionMap: ActionMap;
    onActionExecute: (action: Action) => void;
}

export default class ActionGrid extends React.Component<ActionGridProps, {}> {

    public render(): React.ReactElement<any> {
        let actions = this.getActions(this.props.actionMap);
        return <div className="hd-ActionGrid">
            {actions}
        </div>;
    }

    public getActions(actionMap: ActionMap): React.ReactElement<any>[] {
        return actionMapOrder.map((direction: string): React.ReactElement<any> => {
            return this.getAction(this.props.actionMap[direction], direction);
        });
    }

    public getAction(action: Action, direction:string): React.ReactElement<any> {
        return <div key={direction} className="hd-ActionGrid-Cell">
            <button onClick={(ev) => this.handleClick(action, ev) }>{action.name}</button>
        </div>;
    }

    public handleClick(action: Action, ev: React.MouseEvent): void {
        this.props.onActionExecute(action);
        ev.stopPropagation();
    }
}
