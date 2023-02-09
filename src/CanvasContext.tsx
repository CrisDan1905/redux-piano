import { createContext, useContext, useRef, type FC, type RefObject, type ReactNode } from 'react'

export const CanvasContext = createContext<RefObject<HTMLCanvasElement>>({} as RefObject<HTMLCanvasElement>)

export const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = (): RefObject<HTMLCanvasElement> => useContext(CanvasContext)
