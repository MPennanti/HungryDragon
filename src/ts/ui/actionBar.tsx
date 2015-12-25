import * as React from "react";
import Action from "../game/action/action";

export interface ActionBarProps {
    actions: Action[]
    onActionExecute: (action: Action) => void;
}

export default class ActionBar extends React.Component<ActionBarProps, {}> {

    public render(): React.ReactElement<any> {
        let actions = this.getActions(this.props.actions);
        return <div className="hd-ActionBar">
            {actions}
        </div>;
    }

    public getActions(actions: Action[]): React.ReactElement<any>[] {
        return actions.map((action: Action, index: number): React.ReactElement<any> => {
            return this.getAction(action, index);
        });
    }

    public getAction(action: Action, key: number): React.ReactElement<any> {
        return <div key={key} className="hd-ActionBar-Action">
            <button onClick={(ev) => this.handleClick(action, ev) }>{action.name}</button>
        </div>;
    }

    public handleClick(action: Action, ev: React.MouseEvent): void {
        this.props.onActionExecute(action);
        ev.stopPropagation();
    }
}
