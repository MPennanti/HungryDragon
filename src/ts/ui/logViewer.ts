///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as React from "react/addons";
import * as Immutable from "immutable";

export interface LogViewerProps {
    log: Immutable.List<string>;
}

export default class LogViewer extends React.Component<LogViewerProps, {}> {
    public render(): React.ReactElement<any> {
        let items = this.props.log.toArray().map((item: string) => {
            return React.DOM.li(null, item);
        });
        return React.DOM.ul(
            null,
            items
        );
    }
}
