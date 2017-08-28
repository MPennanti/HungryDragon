import * as React from "react";
import Action from "../game/action/action";
import ActionButton from "./actionButton";

export interface IActionBarProps {
    actions: Action[];
    onActionExecute: (action: Action) => void;
}

export default class ActionBar extends React.PureComponent<IActionBarProps> {

    public render() {
        const actions = this.getActions(this.props.actions);
        return (
            <div className="hd-ActionBar">
                {actions}
            </div>
        );
    }

    public getActions(actions: Action[]) {
        return actions.map((action: Action): React.ReactElement<any> => {
            return <ActionButton key={action.id} action={action} className={"hd-ActionBar-Action"} onActionExecute={this.handleAction} />;
        });
    }

    public handleAction = (action: Action): void => {
        this.props.onActionExecute(action);
    }
}
