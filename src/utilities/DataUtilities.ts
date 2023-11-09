import { SAVE_NAME } from "../Constants";
import { RootState, store } from "../store";
import { pickDeep } from "deepdash-es/standalone";
import { setGameBoardState, gameBoardInitialState } from "../slices/gameBoardSlice";
import { setSettingsState, settingsInitialState } from "../slices/settingsSlice";

const stateToSave: string[] = [
    "music"
]

export function saveToStorage(dataString: string): void {
    localStorage.setItem(SAVE_NAME, dataString);
}

export function saveData(state: RootState): void {
    const dataToSave = pickDeep(state, stateToSave)

    const dataString: string = btoa(JSON.stringify(dataToSave))
    saveToStorage(dataString)
}

export function loadData(): RootState | undefined {
    const dataString: string | null = localStorage.getItem(SAVE_NAME)

    if (dataString !== null) {
        const state = JSON.parse(atob(dataString))

        const dataToLoad = pickDeep(state, stateToSave)

        return dataToLoad
    }
}

export function resetData(): void {
    localStorage.removeItem(SAVE_NAME)
    store.dispatch(setGameBoardState(gameBoardInitialState))
    store.dispatch(setSettingsState(settingsInitialState))
}