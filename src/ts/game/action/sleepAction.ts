import GameState, {HOUR_LENGTH} from "../gameState";
import * as Helpers from "../gameHelpers";
import Action from "./action";

export default class SleepAction extends Action {
    public name = "Sleep";

    protected doExecute(state: GameState): GameState {
        let result = state;

        result = Helpers.appendLog(result, "You fall asleep and wake up later feeling hungry.");
        result = Helpers.tick(result, 8 * HOUR_LENGTH);
        return result;
    }
}
