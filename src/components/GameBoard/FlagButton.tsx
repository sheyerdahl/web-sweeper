import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../store"
import { toggleFlagToggle } from "../../slices/gameBoardSlice"

function FlagButton(): JSX.Element {
    const dispatch = useDispatch()
    const flagToggle = useSelector((state: RootState) => state.gameBoard.flagToggle)

    const isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi")

    const handleClick = () => {
        dispatch(toggleFlagToggle())
    }

    return (
        <div 
        className={`fixed br4 pointer top-1 flag-button ba bw2 white b--black
        ${flagToggle ? "bg-green" : "bg-light-red"}
        ${isMobileDevice ? "" : "dn"}
        `} 
        onClick={() => handleClick()}>
            <p>
                Flag Toggle
            </p>
        </div>
    )
}

export default FlagButton