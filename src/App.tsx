import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorPanel } from './shared/ColorPanel'
import { EditPanel } from './shared/EditPanel'
import { clearCanvas, drawStroke, setCanvasSize } from './utils/canvasUtils'
import { beginStroke, updateStroke, currentStrokeSelector } from './modules/currentStroke/slice'
import { strokesSelector } from './modules/strokes/slice'
import { historyIndexSelector } from './modules/historyIndex/slice'
import { useCanvas } from './CanvasContext'
import { FilePanel } from './shared/FilePanel'
import { endStroke } from './modules/sharedActions'
import { ModalLayer } from './ModalLayer'

const WIDTH = 1024
const HEIGHT = 768

function App (): React.ReactElement {
  const canvasRef = useCanvas()
  const currentStroke = useSelector(currentStrokeSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)

  const getCanvasWithContext = (canvas = canvasRef.current): { canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null | undefined } => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  const isDrawing = !!currentStroke.points.length
  const dispatch = useDispatch()

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()

    if (!context || !canvas) {
      return
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas)

      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach(stroke => { drawStroke(context, stroke.points, stroke.color) })
    })
  }, [historyIndex, strokes])

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

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) return

    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color)
    })
  }, [currentStroke])

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>): void => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke({ x: offsetX, y: offsetY }))
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke({ x: offsetX, y: offsetY }))
  }

  const endDrawing = (): void => {
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }))
    }
  }

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
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  )
}

export default App
