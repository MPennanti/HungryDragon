import * as React from "react";
import Action from "../game/action/action";

export interface IActionButtonProps {
    action: Action;
    className: string;
    onActionExecute: (action: Action) => void;
}

export default class ActionButton extends React.PureComponent<IActionButtonProps> {

    public render() {
        return (
            <div className={this.props.className}>
                <button onClick={this.handleClick}>{this.props.action.name}</button>
            </div>
        );
    }

    public handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onActionExecute(this.props.action);
        ev.stopPropagation();
    }
}
