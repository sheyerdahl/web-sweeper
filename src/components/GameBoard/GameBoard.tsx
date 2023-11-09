import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../store"
import { clickSoundPromise } from "../../AudioManager";
import "./GameBoard.css"

import Tile from "./Tile"
import { generateTiles, revealStartingTile, blankRevealNeighbors } from "../../utilities/GameUtilities"
import { ITile, setTiles, setGameBoardDimensions, setGamePlayState } from "../../slices/gameBoardSlice"

const defaultWidth: number = 8
const defaultHeight: number = 8
const defaultMinesAmount: number = 7

function GameBoard(): JSX.Element {
    const [ dimensions, setDimensions ] = useState({boardWidth: defaultWidth, boardHeight: defaultHeight})
    const [ minesAmount, setMinesAmount] = useState(defaultMinesAmount)

    const dispatch = useDispatch()
    const gamePlayState = useSelector((state: RootState) => state.gameBoard.gamePlayState)
    const tiles = useSelector((state: RootState) => state.gameBoard.tiles)
    const boardWidth = useSelector((state: RootState) => state.gameBoard.boardWidth)

    return (
        <div>
            <h1>Web-sweeper</h1>
            <p className={
            `
            ${gamePlayState === "Lose" ? "red" : ""}
            ${gamePlayState === "Win" ? "light-green" : ""}
            `
            }>

                {gamePlayState === "Lose" ? "rest in pieces, you died..." : ""}
                {gamePlayState === "Win" ? "congratulations! victory!" : ""}
            </p>
            <div className={`tile-board`} style={{ "--board-width": boardWidth} as React.CSSProperties} >

                {
                    
                tiles.map((tile: ITile, i) => {
                    return (
                        <Tile tileId={i}/>
                    )
                })
                
                }

            </div>
            <button className="mt3 mb3 pointer br3 white bg-green b--dark-green b--dashed bw2 hvr-grow" onClick={() => {
                if (dimensions.boardWidth * dimensions.boardHeight > minesAmount) {
                    clickSoundPromise.then((clickSound: Howl): void => {
                        clickSound.play();
                    })
                    
                    const newTiles = generateTiles(dimensions.boardWidth, dimensions.boardHeight, minesAmount)
                
                    dispatch(setTiles(newTiles))
                    dispatch(setGameBoardDimensions(dimensions))
                    dispatch(setGamePlayState("Active"))
                    const startingTile = revealStartingTile(newTiles)
                    blankRevealNeighbors(startingTile)
                }
            }}>
                Generate Board
            </button>
            
            <div className="flex justify-content-center mb3">
                <div className="w-25">
                    <p className="mt1 mb2">Width</p>
                    <input className="w-30 br3 bg-light-green bw0" placeholder="8" onInput={(event) => {
                        const newWidth: number = Number((event.target as HTMLInputElement).value)
                        
                        if (String(newWidth) === '0') {
                            setDimensions({...dimensions, boardWidth: defaultWidth})
                        } else if (String(newWidth) !== 'NaN') {
                            setDimensions({...dimensions, boardWidth: newWidth})
                        }
                    }}/>
                </div>

                <div className="w-25">
                    <p className="mt1 mb2">Height</p>
                    <input className="w-30 br3 bg-light-green bw0" placeholder="8" onInput={(event) => {
                        const newHeight = Number((event.target as HTMLInputElement).value)

                        if (String(newHeight) === '0') {
                            setDimensions({...dimensions, boardHeight: defaultHeight})
                        } else if (String(newHeight) !== 'NaN') {
                            setDimensions({...dimensions, boardHeight: newHeight})
                        }
                    }}/>
                </div>

                <div className="w-25">
                    <p className="mt1 mb2">Mines</p>
                    <input className="w-30 br3 bg-light-green bw0" placeholder="7" onInput={(event) => {
                        const newMinesAmount = Number((event.target as HTMLInputElement).value)

                        if (String(newMinesAmount) === '0') {
                            setMinesAmount(defaultMinesAmount)
                        } else if (String(newMinesAmount) !== 'NaN') {
                            setMinesAmount(newMinesAmount)
                        }
                    }}/>
                </div>
            </div>

        </div>
    )
}

export default GameBoard