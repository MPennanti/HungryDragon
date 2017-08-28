import * as Helpers from "../gameHelpers";
import GameState from "../gameState";
import Zone from "../zone/zone";
import Action from "./action";

export default class MoveAction extends Action {
    public name = "Move";
    private targetZone: Zone;

    constructor(targetZone: Zone) {
        super();
        this.targetZone = targetZone;
        this.name = this.targetZone.name;
    }

    protected doExecute(state: GameState): GameState {
        let result = state;

        result = result.setZone(this.targetZone.id);
        result = Helpers.appendLog(result, `You travel to ${this.targetZone.name}`);
        result = Helpers.appendLog(result, this.targetZone.description);
        result = result.setCanSpawn(true);

        return result;
    }
}
