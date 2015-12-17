///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react";
import * as Immutable from "immutable";

export interface LogViewerProps {
    log: Immutable.List<string>;
}

export default class LogViewer extends React.Component<LogViewerProps, {}> {
    public render(): React.ReactElement<any> {
        let items = this.props.log.map((item: string, index: number) => {
            return <li key={index}>{item}</li>;
        });
        return <ul>{items}</ul>;
    }
}
