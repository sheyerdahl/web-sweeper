import { memo } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../store"
import { updateTile, setGamePlayState, toggleTileFlag } from "../../slices/gameBoardSlice"
import { clickSoundPromise, popSoundPromise } from "../../AudioManager";
import { getMineNeighbors, blankRevealNeighbors, CheckWinCondition } from "../../utilities/GameUtilities";

interface TileProps {
    tileId: number
}

const numberColors = [
    "light-green",
    "light-blue",
    "dark-red",
    "yellow",
    "purple",
    "dark-pink",
    "black",
    "black"
]

const Tile = memo(function Tile({ tileId }: TileProps): JSX.Element {
    const dispatch = useDispatch()
    const gamePlayState = useSelector((state: RootState) => state.gameBoard.gamePlayState)
    const tile = useSelector((state: RootState) => state.gameBoard.tiles[tileId])
    const flagToggle = useSelector((state: RootState) => state.gameBoard.flagToggle)

    const nearbyMines = getMineNeighbors(tile)

    const handleClick = () => {
        if (gamePlayState !== "Active" || tile.revealed) {return}

        if (flagToggle) {
            handlePlaceFlag()
        } else {
            handleTileReveal()
        }
    }

    const handleTileReveal = () => {
        if (gamePlayState === "Active" && !tile.revealed && !tile.hasFlag) {
            clickSoundPromise.then((clickSound: Howl): void => {
                clickSound.play();
            })

            // setNeighbors(getNeighbors(tile))
            // setNeighbors(getMineNeighbors(tile))
            
            dispatch(updateTile({tileId: tileId, dataToUpdate: {revealed: true}}))
            blankRevealNeighbors(tile)

            if (tile.hasMine) {
                dispatch(setGamePlayState("Lose"))
            } else {
                CheckWinCondition()
            }
        }
    }

    const handlePlaceFlag = () => {
        if (gamePlayState === "Active" && !tile.revealed) {
            popSoundPromise.then((popSound: Howl): void => {
                popSound.play();
            })
            
            dispatch(toggleTileFlag(tileId))
        }
    }

    const getNumberColor = (): string | undefined => {
        const nearbyMinesAmount = Object.keys(nearbyMines).length
        if (nearbyMinesAmount > 0) {
            return numberColors[nearbyMinesAmount - 1]
        }
    }
    
    return (
        <div 
        key={tileId} 
        className={
            `tile ba b--dashed h2 w-100 no-select  
            ${!tile.revealed ? "pointer" : ""}
            ${tile.revealed && tile.hasMine ? "bg-black" : ""}
            ${tile.revealed && !tile.hasMine ? "bg-light-red" : ""}
            ${tile.hasMine && gamePlayState === "Win" ? "bg-green" : ""}

            `
        }
        onClick={() => handleClick()}
        onContextMenu={(event) => {
            // Handles flag placing on right click
            event.preventDefault()
            handlePlaceFlag()
        }}
        >
            <p className={
                `mb0 mt0 f3 tile-text
                ${tile.revealed || gamePlayState === "Win" || tile.hasFlag ? "o-100" : "o-0"}
                ${!tile.hasMine ? getNumberColor() : ""}
                `
                }>
                
                {tile.hasFlag && gamePlayState !== "Win" ? "🚩" : tile.hasMine ? "X" : Object.keys(nearbyMines).length > 0 ? Object.keys(nearbyMines).length : ""}
            </p>
        </div>
    )

})

export default Tile