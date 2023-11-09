import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { loadAudio, vibesPromise } from "./AudioManager"
import { loadAudio } from "./AudioManager"
import { store } from './store'
import { Provider } from 'react-redux'
import { loadData } from './utilities/DataUtilities';
import { AutoSaveLoop } from './DataManager';
import { setGameBoardState } from "./slices/gameBoardSlice";
import { setSettingsState } from "./slices/settingsSlice";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

let clickedPage: boolean = false
document.addEventListener("click", () => {
  if (!clickedPage) {
    clickedPage = true
    loadAudio()
    // vibesPromise.then((vibes) => vibes.play())
  }
})

// Load data from localStorage
const loadedData = loadData()
if (loadedData !== undefined) {
  console.log(loadedData)
  store.dispatch(setGameBoardState(loadedData.gameBoard))
  store.dispatch(setSettingsState(loadedData.settings))
}

// Auto save loop
AutoSaveLoop()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
