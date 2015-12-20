import Zone, {IZoneConfig} from "./zone";

let zoneMap: { [key: string]: Zone } = {};

export function registerZone(config: IZoneConfig): string {
    zoneMap[config.id] = new Zone(config);
    return config.id;
}

export default zoneMap;
