import * as React from "react";
import Bar from "./bar";

export interface HealthBarProps {
    current: number;
    total: number;
    showExactNumber?: boolean;
}

export default class HealthBar extends React.Component<HealthBarProps, {}> {

    public render(): React.ReactElement<any> {
        return <Bar
            current={this.props.current}
            total={this.props.total}
            color={this.calculateColor() }
            showExactNumber={this.props.showExactNumber} />;
    }

    private calculateColor(): string {
        let percent = Math.floor(this.props.current / this.props.total * 100);
        if(percent <= 10) {
            return "red";
        } else if(percent < 80) {
            return "yellow";
        } else {
            return "green";
        }
    }
}