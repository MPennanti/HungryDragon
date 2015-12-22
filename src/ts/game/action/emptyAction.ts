import GameState from "../gameState";
import Action from "./action";

export default class EmptyAction extends Action {
    public isEmpty = true;

    protected doExecute(state: GameState): GameState {
        return state;
    }
}
