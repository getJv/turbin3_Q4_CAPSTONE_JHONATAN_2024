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

  function _getNeighbors(current: HTMLDivElement) {
    const me = current.getBoundingClientRect()
    const midWidth = me.width / 2
    const midHeight = me.width / 2

    const leftX = me.left - midWidth
    const leftY = me.top + midHeight
    const left = document.elementFromPoint(leftX, leftY)

    const rightX = me.right + midWidth
    const rightY = me.top + midHeight
    const right = document.elementFromPoint(rightX, rightY)

    const topX = me.left + midWidth
    const topY = me.top - midHeight
    const top = document.elementFromPoint(topX, topY)

    const bottomX = me.left + midWidth
    const bottomY = me.bottom + midHeight
    const bottom = document.elementFromPoint(bottomX, bottomY)

    const topRightX = me.right + midWidth
    const topRightY = me.top - midHeight
    const topRight = document.elementFromPoint(topRightX, topRightY)

    const topLeftX = me.left - midWidth
    const topLeftY = me.top - midHeight
    const topLeft = document.elementFromPoint(topLeftX, topLeftY)

    const bottomLeftX = me.left - midWidth
    const bottomLeftY = me.top + me.height
    const bottomLeft = document.elementFromPoint(bottomLeftX, bottomLeftY)

    const bottomRightX = me.right + midWidth
    const bottomRightY = me.top + me.height
    const bottomRight = document.elementFromPoint(bottomRightX, bottomRightY)

    return [top, left, bottom, right, topLeft, bottomLeft, bottomRight, topRight]
  }

  const _getTileStatuses = (current: HTMLDivElement) => {
    const isFlagged = isTileFlagged(current)
    const isHidden = isTileHidden(current)
    let isMined = false //GAME_SESSION.MINED_TILES.includes(tile.id)
    let nearMines = 0
    const neighbors = _getNeighbors(current)

    /*      _getNeighbors(current).forEach(neighbor => {
            if (neighbor && GAME_SESSION.MINED_TILES.includes(neighbor.id)) {
              nearMines++;
            }
          });*/
    const nearFlags = neighbors.filter((i) => i?.classList.contains('flag')).length

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
