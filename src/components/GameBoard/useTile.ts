import { useState } from 'react'

interface UseTileProps {
  //flags: string[]
  toggleFlags: (current: HTMLDivElement) => void
  isTileHidden: (current: HTMLDivElement) => boolean
  isTileFlagged: (current: HTMLDivElement) => boolean
}

export const useTile = ({ toggleFlags, isTileHidden, isTileFlagged }: UseTileProps) => {
  const [tiles, setTiles] = useState<Record<string, React.RefObject<HTMLDivElement>>[]>([])
  const registerTiles = (tileId: string, tileRef: React.RefObject<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    tiles[tileId] = tileRef

    setTiles([...tiles])
  }

  const _getTileStatuses = (current: HTMLDivElement) => {
    const isFlagged = isTileFlagged(current)
    const isHidden = isTileHidden(current)
    let isMined = false //GAME_SESSION.MINED_TILES.includes(tile.id)
    let nearMines = 0
    let nearFlags = 0
    /*  _getNeighbors(tile).forEach(neighbor => {
        if (neighbor && GAME_SESSION.MINED_TILES.includes(neighbor.id)) {
          nearMines++;
        }
      });
      _getNeighbors(tile).forEach(neighbor => {
        if (neighbor && GAME_SESSION.FLAGS_PLANTED.includes(neighbor.id)) {
          nearFlags++;
        }
      });*/
    return { isFlagged, isHidden, isMined, nearMines, nearFlags }
  }

  const handleLeftClick = (current: HTMLDivElement) => {
    console.log('handleLeftClick', current)
    //_revealTile(tile, tile.id);
  }

  const handleMiddleClick = (currentTile: HTMLDivElement) => {
    console.log('handleMiddleClick', currentTile)

    /*
    if (isHidden || nearMines === 0 || nearFlags < nearMines) {
      return
    }
    let neighbors = _getNeighbors(tile)
    neighbors.push(tile)
    neighbors.forEach((neighbor) => {
      _revealTile(neighbor, neighbor.id)
    })*/
  }

  const handleRightClick = (currentTile: React.RefObject<HTMLDivElement>) => {
    if (!currentTile.current) {
      return
    }
    const { isHidden } = _getTileStatuses(currentTile.current)

    if (!isHidden) {
      return
    }
    toggleFlags(currentTile.current)
  }

  const handleTileClick = (event: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    switch (event.buttons) {
      case 1: {
        //handleLeftClick(ref?.current)
        return
      }
      case 2: {
        handleRightClick(ref)
        return
      }
      default: {
        //handleMiddleClick(ref.current)
        return
      }
    }

    // TODO: updateMinesCounter();
  }

  return {
    handleTileClick,
    tiles,
    registerTiles,
  }
}
