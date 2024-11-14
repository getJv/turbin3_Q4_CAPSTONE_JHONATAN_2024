import { GameDifficulty } from '@/components/GameDifficulty/useGameDifficulty.ts'
import { Tile } from '@/components/GameBoard/tile.tsx'

interface GameBoardProps {
  difficulty: GameDifficulty
  tileWidthSize: number
  tileHeightSize: number
  sizeUnit: string
}

export const Grid = ({ difficulty, tileWidthSize, tileHeightSize, sizeUnit }: GameBoardProps) => {
  const { columns, rows } = difficulty

  const grids = []
  let index = 0

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      grids.push(<Tile index={index++} key={`${x}-${y}`} />)
    }
  }

  return (
    <div
      id="minefield"
      style={{
        width: `${columns * tileWidthSize}${sizeUnit}`,
        height: `${rows * tileHeightSize}${sizeUnit}`,
      }}
    >
      {grids}
    </div>
  )
}
