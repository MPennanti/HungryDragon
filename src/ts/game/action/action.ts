import GameState from "../gameState";

export default class Action {

    private static UniqueId = 0;

    public name = "";
    public isEmpty = false;
    public id = Action.UniqueId++;

    public execute(state: GameState): GameState {
        return this.doExecute(state);
    }

    protected doExecute(_state: GameState): GameState {
        throw new Error("Override this in your action helper");
    }

}
