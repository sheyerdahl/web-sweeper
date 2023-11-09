
function InfoMenu(): JSX.Element {
    return (
            <div className="Main-content ml7">
                <p className="light-yellow">How Mine-Sweeper works:</p>
                <p>Your goal is to reveal all tiles without a mine. Tiles display how many mines are around it, including diagonally. Place flags on mines to remember them, you can't activate tiles with flags.</p>
                <p className="light-blue">Controls:</p>
                <p className="ma1">LMB: Reveal Tile</p>
                <p className="ma1">RMB: Place Flag</p>
            </div>
    )
}

export default InfoMenu