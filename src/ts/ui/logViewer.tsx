import * as Immutable from "immutable";
import * as React from "react";

export interface ILogViewerProps {
    log: Immutable.List<string>;
}

export default class LogViewer extends React.Component<ILogViewerProps> {
    public render(): React.ReactElement<any> {
        const items = this.props.log.map((item: string, index: number) => {
            return <li key={index}>{item}</li>;
        });
        return (
            <div className="hd-LogArea">
                <ul>{items}</ul>
            </div>
        );
    }
}
