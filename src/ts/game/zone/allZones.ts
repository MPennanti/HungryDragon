import * as StartingArea from "./startingArea";
import { IZoneMap } from "./zone";

const allZones: IZoneMap = {};

function addZones(area: IZoneMap): void {
    Object.keys(area).forEach((zoneId) => {
        allZones[zoneId] = area[zoneId];
    });
}

addZones(StartingArea as any);

export default allZones;
