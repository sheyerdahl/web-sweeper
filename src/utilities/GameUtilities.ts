import { ITile } from "../slices/gameBoardSlice"
import { getRandomInt } from "./MiscUtilities"
import { store } from '../store'
import { updateTile, setGamePlayState } from "../slices/gameBoardSlice"

export type NeighborTiles = {
    [key: number]: ITile
}

export function revealStartingTile(tiles: Array<ITile>): ITile {
    const blankTiles: Array<{tileId: number, tile: ITile}> = []
    let chosenTile: ITile

    tiles.forEach((tile, index) => {
        if (tile.hasMine) {return}
        
        const mineNeighbors = getMineNeighbors(tile)

        if (Object.keys(mineNeighbors).length === 0) {
            blankTiles.push({tileId: index, tile: tile})
        }
    })

    let tileId: number
    if (blankTiles.length > 0) {
        const chosenBlankTile = blankTiles[getRandomInt(blankTiles.length)]

        chosenTile = chosenBlankTile.tile
        tileId = chosenBlankTile.tileId
    } else {
        tileId = getRandomInt(tiles.length)

        chosenTile = tiles[tileId]
        while (chosenTile.hasMine) {
            tileId = getRandomInt(tiles.length)
            chosenTile = tiles[tileId]
        }

    }

    
    store.dispatch(updateTile({tileId, dataToUpdate: {revealed: true}}))

    return chosenTile
}

export function generateTiles(xTiles: number, yTiles: number, minesAmount: number): Array<ITile> {
    const tiles: Array<ITile> = []

    for (let yIndex = 0; yIndex < yTiles; yIndex++) {
        for (let xIndex = 0; xIndex < xTiles; xIndex++) {
            const newTile: ITile = {
                position: {x: xIndex, y: yIndex},
                revealed: false,
                hasMine: false,
                hasFlag: false
            }

            tiles.push(newTile)
        }
    }

    for (let mineIndex = 0; mineIndex < minesAmount; mineIndex++) {
        let chosenTile: ITile = tiles[getRandomInt(tiles.length)]
        while (chosenTile.hasMine) {
            chosenTile = tiles[getRandomInt(tiles.length)]
        }

        chosenTile.hasMine = true
    }

    return tiles
}



export function getNeighbors(mainTile: ITile): NeighborTiles {
    const tiles = store.getState().gameBoard.tiles
    const mainTileX = mainTile.position.x
    const mainTileY = mainTile.position.y
    const neighborTilesX: NeighborTiles = {}
    const neighborTiles: NeighborTiles = {}

    tiles.forEach((tile, index) => {
        const tileX = tile.position.x

        if (tileX - 1 === mainTileX) {
            neighborTilesX[index] = tile
        } else if (tileX + 1 === mainTileX) {
            neighborTilesX[index] = tile
        } else if (tileX === mainTileX) {
            neighborTilesX[index] = tile
        }
    })

    for (const tileId in neighborTilesX) {
        const tile = neighborTilesX[tileId]
        const tileX = tile.position.x
        const tileY = tile.position.y

        if (tileY === mainTileY && tileX === mainTileX) {
            continue
        }

        if (tileY - 1 === mainTileY) {
            neighborTiles[tileId] = tile
        } else if (tileY + 1 === mainTileY) {
            neighborTiles[tileId] = tile
        } else if (tileY === mainTileY) {
            neighborTiles[tileId] = tile
        }
    }

    return neighborTiles
}

export function getImmediateNeighbors(mainTile: ITile): NeighborTiles {
    const tiles = store.getState().gameBoard.tiles
    const mainTileX = mainTile.position.x
    const mainTileY = mainTile.position.y
    const immediateNeighborTiles: NeighborTiles = {}

    tiles.forEach((tile, index) => {
        const tileX = tile.position.x
        const tileY = tile.position.y

        if (tileX - 1 === mainTileX && tileY === mainTileY) {
            immediateNeighborTiles[index] = tile

        } else if (tileX + 1 === mainTileX && tileY === mainTileY) {
            immediateNeighborTiles[index] = tile

        } else if (tileX === mainTileX && tileY - 1 === mainTileY) {
            immediateNeighborTiles[index] = tile

        } else if (tileX === mainTileX && tileY + 1 === mainTileY) {
            immediateNeighborTiles[index] = tile

        }
    })

    return immediateNeighborTiles
}

export function getMineNeighbors(mainTile: ITile): NeighborTiles {
    const neighbors = getNeighbors(mainTile)
    
    const mineNeighbors: NeighborTiles = {}

    for (const tileId in neighbors) {
        const tile = neighbors[tileId]
        if (tile.hasMine) {
            mineNeighbors[tileId] = tile
        }
    }

    return mineNeighbors
}

export function blankRevealNeighbors(mainTile: ITile): void {
    // Recursive Function, will reveal all neighbor tiles if mainTile has no neighboring mines
    if (mainTile.hasMine) {return}

    const mineNeighbors = getMineNeighbors(mainTile)

    if (Object.keys(mineNeighbors).length === 0) {
        CheckWinCondition()
        
        const neighbors = getNeighbors(mainTile)

        for (const tileId in neighbors) {
            const tile = neighbors[tileId]
            
            if (!tile.revealed && !tile.hasMine) {
                const numberTileId = Number(tileId)
                
                store.dispatch(updateTile({tileId: numberTileId, dataToUpdate: {revealed: true, hasFlag: false}}))
                setTimeout(() => blankRevealNeighbors(tile), 30)
            }
        }
    }
}

export function CheckWinCondition(): void {
    const tiles = store.getState().gameBoard.tiles
    const tilesAmount = tiles.length
    let tilesRevealed = 0
    let mineTiles = 0

    tiles.forEach(tile => {
        if (tile.revealed) {
            tilesRevealed += 1
        }

        if (tile.hasMine) {
            mineTiles += 1
        }
    })

    if (tilesRevealed + mineTiles >= tilesAmount) {
        store.dispatch(setGamePlayState("Win"))
    }
}