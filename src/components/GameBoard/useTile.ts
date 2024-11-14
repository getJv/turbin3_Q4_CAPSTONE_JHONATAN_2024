export const useTile = () => {
  const handleLeftClick = (current: HTMLDivElement) => {
    console.log('handleMiddleClick', current)
  }

  const handleMiddleClick = (current: HTMLDivElement) => {
    console.log('handleMiddleClick', current)
  }

  const handleRightClick = (current: HTMLDivElement) => {
    console.log('handleRightClick', current)
  }

  return {
    handleLeftClick,
    handleMiddleClick,
    handleRightClick,
  }
}
