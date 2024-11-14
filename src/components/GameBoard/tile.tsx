import { useRef } from 'react'
import { useTile } from '@/components/GameBoard/useTile.ts'

interface TileProps {
  index: number
}

export const Tile = ({ index }: TileProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { handleRightClick, handleMiddleClick, handleLeftClick } = useTile()

  const handleTileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // TODO: search replace for depreated func
    const pressedBtn = event.nativeEvent.which

    if (!ref.current) {
      return
    }

    switch (pressedBtn) {
      case 1: {
        handleLeftClick(ref.current)
        return
      }
      case 2: {
        handleMiddleClick(ref.current)
        return
      }
      case 3: {
        handleRightClick(ref.current)
        return
      }
    }

    // TODO: updateMinesCounter();
  }

  return <div id={`tile_'${index}`} ref={ref} className={'tile /*hidden*/'} onClick={handleTileClick}></div>
}
