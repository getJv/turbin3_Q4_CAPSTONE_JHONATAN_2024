import { useEffect, useRef } from 'react'

interface TileProps {
  id: string
  handleClick: (event: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => void
  registerTile: (tileId: string, tileRef: React.RefObject<HTMLDivElement>) => void
}

export const Tile = (props: TileProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      return
    }
    //props.registerTile(props.id, ref)
  }, [ref.current])

  return (
    <div
      id={props.id}
      ref={ref}
      className={'tile hidden_tile'}
      onMouseDown={(e) => props.handleClick(e, ref)}
      onClick={(e) => e.preventDefault()}
      onAuxClick={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  )
}
