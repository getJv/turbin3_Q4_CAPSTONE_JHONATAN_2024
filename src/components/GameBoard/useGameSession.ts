import { useState } from 'react'

const GAME_SPRITES = {
  SIZE_UNIT: 'px',
  HIDDEN: 'hidden_tile',
  FLAG: 'flag',
  TILE: 'tile',
  TILE_NUMBER_PREFIX: 'tile_',
  MINE_HIT: 'mine_hit',
  FACE_LIMBO: 'face_limbo',
  FACE_DOWN: 'face_down',
  FACE_LOSE: 'face_lose',
  FACE_WIN: 'face_win',
}

export const useGameSession = () => {
  const [flags, setFlags] = useState<string[]>([])

  const isTileHidden = (divTile: HTMLDivElement) => {
    return divTile.classList.contains(GAME_SPRITES.HIDDEN)
  }
  const isTileFlagged = (divTile: HTMLDivElement) => {
    return flags.includes(divTile.id)
  }

  const toggleFlags = (divTile: HTMLDivElement) => {
    const isFlagged = flags.includes(divTile.id)
    if (isFlagged) {
      divTile.classList.remove(GAME_SPRITES.FLAG)

      setFlags(flags.filter((i) => i != divTile.id))
    } else {
      divTile.classList.add(GAME_SPRITES.FLAG)
      setFlags([...flags, divTile.id])
    }
  }

  return { flags, toggleFlags, isTileHidden, isTileFlagged }
}
