import { GameDifficulty } from '@/components/GameDifficulty/useGameDifficulty.ts'
import { useTile } from '@/components/GameBoard/useTile.ts'
import { Tile } from '@/components/GameBoard/tile.tsx'
import { useGameSession } from '@/components/GameBoard/useGameSession.ts'

interface GameBoardProps {
  difficulty: GameDifficulty
  tileWidthSize: number
  tileHeightSize: number
  sizeUnit: string
}

export const Grid = ({ difficulty, tileWidthSize, tileHeightSize, sizeUnit }: GameBoardProps) => {
  const { columns, rows } = difficulty
  const { flags, toggleFlags, isTileFlagged, isTileHidden } = useGameSession()
  const { handleTileClick, registerTiles } = useTile({ toggleFlags, isTileFlagged, isTileHidden })

  const tileGrid = []
  let index = 0

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      tileGrid.push(
        <Tile id={`tile_'${index++}`} key={`${x}-${y}`} registerTile={registerTiles} handleClick={handleTileClick} />,
      )
    }
  }

  return (
    <div>
      <div>Flags: {flags.length}</div>
      <div
        id="minefield"
        style={{
          width: `${columns * tileWidthSize}${sizeUnit}`,
          height: `${rows * tileHeightSize}${sizeUnit}`,
        }}
      >
        {tileGrid}
      </div>
    </div>
  )
}
