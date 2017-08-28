import * as React from "react";

export interface IBarProps {
    current: number;
    total: number;
    color: string;
    showExactNumber?: boolean;
}

export default class Bar extends React.Component<IBarProps> {

    public render(): React.ReactElement<any> {
        const percent = Math.floor(this.props.current / this.props.total * 100);
        const barStyle = {
            width: percent + "%",
            background: this.props.color,
            height: 10,
            transition: "width 1s",
        };
        const barWrapperStyle = {
            border: "1px black solid",
        };
        let numberText: React.ReactElement<any>;
        if (this.props.showExactNumber) {
            numberText = <div>{Math.floor(this.props.current)}/{this.props.total}</div>;
        } else {
            numberText = <div>{percent}%</div>;
        }
        return (
            <div>
                {numberText}
                <div style={barWrapperStyle}>
                    <div style={barStyle} />
                </div>
            </div>
        );
    }
}