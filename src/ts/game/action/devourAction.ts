import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import Action from "./action";

export default class DevourAction extends Action {
    public name = "Devour";

    protected doExecute(state: GameState): GameState {
        let result = state;
        let enemy = state.enemy;

        if (enemy) {
            result = Helpers.appendLog(result, `You consume the ${enemy.name}!`);
            let player = result.player;
            result = result.setPlayer(player.setStomachFullness(player.stomachFullness + enemy.mass));
            result = result.setEnemy(null);
        }
        return result;
    }
}
