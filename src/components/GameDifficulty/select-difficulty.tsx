import { GameDifficulty } from '@/components/GameDifficulty/useGameDifficulty.ts'

interface SelectFieldProps {
  values: GameDifficulty[]
  handleSelection: (newSelection: GameDifficulty) => void
}

export const SelectField = ({ values, handleSelection }: SelectFieldProps) => {
  const handlerOnChange = (title: string) => {
    const selected = values.find((item) => item.title === title)
    if (!selected) {
      return
    }
    handleSelection(selected)
  }

  return (
    <select id="difficulty" onChange={(e) => handlerOnChange(e.target.value)}>
      {values.map((item) => (
        <option key={item.title} value={item.title}>
          {item.title}
        </option>
      ))}
    </select>
  )
}
