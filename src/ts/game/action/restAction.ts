import * as Helpers from "../gameHelpers";
import GameState, { HOUR_LENGTH } from "../gameState";
import Action from "./action";

export default class RestAction extends Action {
    public name = "Rest";

    protected doExecute(state: GameState): GameState {
        let result = state;

        result = Helpers.appendLog(result, "You relax for an hour.");
        result = Helpers.tick(result, HOUR_LENGTH);
        result = result.setCanSpawn(true);
        return result;
    }
}
