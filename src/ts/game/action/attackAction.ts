import * as Helpers from "../gameHelpers";
import GameState from "../gameState";
import Action from "./action";

export default class AttackAction extends Action {
    public name = "Attack";

    protected doExecute(state: GameState): GameState {
        return Helpers.attack(state);
    }
}
