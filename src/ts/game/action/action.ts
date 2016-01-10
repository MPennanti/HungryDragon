import GameState from "../gameState";

export default class Action {

    public name = "";
    public isEmpty = false;

    public execute(state: GameState): GameState {
        return this.doExecute(state);
    }

    protected doExecute(state: GameState): GameState {
        throw new Error("Override this in your action helper");
    }

}
