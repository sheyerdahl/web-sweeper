import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type GamePlayState = "Lose" | "Win" | "Active" | "Inactive"

export interface ITile {
  position: {x: number, y: number}
  revealed: boolean
  hasMine: boolean
  hasFlag: boolean
}

export interface GameBoardState {
  tiles: Array<ITile>
  gamePlayState: GamePlayState
  boardWidth: number
  boardHeight: number
}

export const gameBoardInitialState: GameBoardState = {
  tiles: [],
  gamePlayState: "Inactive",
  boardWidth: 0,
  boardHeight: 0
}

interface UpdateTilePayload {
  tileId: number
  dataToUpdate: {}
}

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState: gameBoardInitialState,
  reducers: {
    setGameBoardState: (state, action: PayloadAction<object>) => {
      const payload = action.payload

      return {...state, ...payload}
    },

    setTiles: (state, action: PayloadAction<Array<ITile>>) => {
      state.tiles = action.payload
    },

    updateTile: (state, action: PayloadAction<UpdateTilePayload>) => {
      state.tiles[action.payload.tileId] = {...state.tiles[action.payload.tileId], ...action.payload.dataToUpdate}
    },

    setGameBoardDimensions: (state, action: PayloadAction<{boardWidth: number, boardHeight: number}>) => {
      state.boardWidth = action.payload.boardWidth
      state.boardHeight = action.payload.boardHeight
    },

    setGamePlayState: (state, action: PayloadAction<GamePlayState>) => {
      state.gamePlayState = action.payload  
    },

    toggleTileFlag: (state, action: PayloadAction<number>) => {
      state.tiles[action.payload].hasFlag = !state.tiles[action.payload].hasFlag
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGameBoardState, setTiles, setGameBoardDimensions, updateTile, setGamePlayState, toggleTileFlag } = gameBoardSlice.actions

export default gameBoardSlice.reducer