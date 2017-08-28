import * as Helpers from "../gameHelpers";
import GameState from "../gameState";
import Action from "./action";

export default class SpareMonsterAction extends Action {
    public name = "Spare";

    protected doExecute(state: GameState): GameState {
        let result = state;

        if (state.enemy) {
            result = result.setEnemy();
            result = Helpers.appendLog(result, `The ${state.enemy.name} flees!`);
        }
        return result;
    }
}
