import type React from 'react'
import { useEffect, useRef } from 'react'
import './App.css'
import { clearCanvas, setCanvasSize } from './utils/canvasUtils'

const WIDTH = 1024
const HEIGHT = 768

function App (): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getCanvasWithContext = (canvas = canvasRef.current): { canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null | undefined } => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()

    if (!canvas || !context) {
      return
    }
    setCanvasSize(canvas, WIDTH, HEIGHT)

    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = 5
    context.strokeStyle = 'black'

    clearCanvas(canvas)
  }, [])

  return (
    <div className='window'>
      <div className='title-bar'>
        <div className='title-bar-text'>
          Redux Paint
        </div>
        <div className='title-bar-controls'>
          <button aria-label='Close' />
        </div>
      </div>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default App
