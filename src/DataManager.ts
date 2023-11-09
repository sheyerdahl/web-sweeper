import { store } from './store'
import { saveData } from './utilities/DataUtilities';
import { AUTO_SAVE_INTERVAL } from './Constants';
// import { increasePointsByGain } from './slices/pointsSlice'

// export function InitDataLoops(): void {
//     console.log("Init data loops!")
//     AutoSaveLoop()
//     PointsLoop()
// }

export function AutoSaveLoop(): void {
    setInterval(() => {
        saveData(store.getState())
    }, AUTO_SAVE_INTERVAL)
}

// function PointsLoop(): void {
//     const state = store.getState()

//     setTimeout(() => {
//         store.dispatch(increasePointsByGain())
//         PointsLoop()
//     }, state.points.pointsInterval)
// }

export {}