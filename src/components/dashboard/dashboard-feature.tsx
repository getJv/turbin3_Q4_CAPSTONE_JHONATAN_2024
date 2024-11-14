import { useGameDifficult } from '@/components/GameDifficulty/useGameDifficulty.ts'
import { SelectField } from '@/components/GameDifficulty/select-difficulty.tsx'
import { Grid } from '@/components/GameBoard/grid.tsx'

export default function DashboardFeature() {
  const { difficulties, difficulty, handleDifficulty } = useGameDifficult()

  return (
    <div>
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2"> Start here ...</div>
        <SelectField handleSelection={handleDifficulty} values={difficulties} />
        <div>Selected: {difficulty.title}</div>

        <Grid difficulty={difficulty} tileHeightSize={16} tileWidthSize={16} sizeUnit={'px'} />
      </div>
    </div>
  )
}
