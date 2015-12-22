import * as React from "react";

export interface BarProps {
    current: number;
    total: number;
    color: string;
    showExactNumber?: boolean;
}

export default class Bar extends React.Component<BarProps, {}> {

    public render(): React.ReactElement<any> {
        let percent = Math.floor(this.props.current / this.props.total * 100);
        let barStyle = {
            width: percent + "%",
            background: this.props.color,
            height: 10,
            transition: "width 1s"
        };
        let barWrapperStyle = {
            border: "1px black solid"
        };
        let numberText: React.ReactElement<any>;
        if (this.props.showExactNumber) {
            numberText = <div>{Math.floor(this.props.current)}/{this.props.total}</div>
        } else {
            numberText = <div>{percent}%</div>
        }
        return <div>
            {numberText}
            <div style={barWrapperStyle}>
                <div style={barStyle} />
            </div>
        </div>;
    }
}