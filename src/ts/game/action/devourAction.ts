import * as Helpers from "../gameHelpers";
import GameState from "../gameState";
import Action from "./action";

export default class DevourAction extends Action {
    public name = "Devour";

    protected doExecute(state: GameState): GameState {
        let result = state;
        const enemy = state.enemy;

        if (enemy) {
            result = Helpers.appendLog(result, enemy.devourText);
            const player = result.player;
            result = result.setPlayer(player.setStomachFullness(player.stomachFullness + enemy.mass));
            result = result.setEnemy();
        }
        return result;
    }
}
