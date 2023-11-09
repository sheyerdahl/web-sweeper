import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  music: boolean
}

export const settingsInitialState: SettingsState = {
  music: true
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers: {
    setSettingsState: (state, action: PayloadAction<object>) => {
      const payload = action.payload
      
      return {...state, ...payload}
    },

    toggleMusic: (state) => {
      state.music = !state.music
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleMusic, setSettingsState } = settingsSlice.actions

export default settingsSlice.reducer