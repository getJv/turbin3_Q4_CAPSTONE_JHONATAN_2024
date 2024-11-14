import { useState } from 'react'

export interface GameDifficulty {
  title: string
  columns: number
  rows: number
  mines: number
}

export const useGameDifficult = () => {
  const difficulties: GameDifficulty[] = [
    { title: 'easy', columns: 9, rows: 9, mines: 10 },
    { title: 'medium', columns: 16, rows: 16, mines: 40 },
    { title: 'hard', columns: 30, rows: 16, mines: 99 },
  ]

  const [difficulty, setDifficulty] = useState<GameDifficulty>(difficulties[0])

  const handleDifficulty = (newValue: GameDifficulty) => {
    setDifficulty(newValue)
  }

  return {
    difficulties,
    difficulty,
    handleDifficulty,
  }
}
