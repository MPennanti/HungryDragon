import * as React from "react";
import Bar from "./bar";

export interface IHealthBarProps {
    current: number;
    total: number;
    showExactNumber?: boolean;
}

export default class HealthBar extends React.Component<IHealthBarProps> {

    public render(): React.ReactElement<any> {
        return (
            <Bar
                current={this.props.current}
                total={this.props.total}
                color={this.calculateColor()}
                showExactNumber={this.props.showExactNumber}
            />);
    }

    private calculateColor(): string {
        const percent = Math.floor(this.props.current / this.props.total * 100);
        if (percent <= 10) {
            return "red";
        } else if (percent < 80) {
            return "yellow";
        } else {
            return "green";
        }
    }
}