import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import Action from "./action";

export default class SpareMonsterAction extends Action {
    public name = "Spare";

    protected doExecute(state: GameState): GameState {
        let result = state;

        if (result.enemy) {
            result = result.setEnemy(null);
            result = Helpers.appendLog(result, `The ${state.enemy.name} flees!`);
        }
        return result;
    }
}
