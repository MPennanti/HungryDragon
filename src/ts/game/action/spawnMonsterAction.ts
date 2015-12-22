import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import {riceBag} from "../enemies";
import Action from "./action";

export default class SpawnMonsterAction extends Action {
    public name = "Spawn Monster";

    protected doExecute(state: GameState): GameState {
        let result = state;

        if (!result.enemy) {
            result = result.setEnemy(riceBag);
            result = Helpers.appendLog(result, `You encounter a ${result.enemy.name}!`);
        }
        return result;
    }
}
