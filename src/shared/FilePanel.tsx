import { saveAs } from 'file-saver'
import { useDispatch } from 'react-redux'
import { useCanvas } from '../CanvasContext'
import { show } from '../modules/modals/slice'
import { getCanvasImage } from '../utils/canvasUtils'

export const FilePanel = (): React.ReactElement => {
  const canvasRef = useCanvas()
  const dispatch = useDispatch()

  const exportToFile = async (): Promise<void> => {
    const file = await getCanvasImage(canvasRef.current)

    if (!file) {
      return
    }
    saveAs(file, 'drawing.png')
  }

  return (
    <div className='window file'>
      <div className='title-bar'>
        <div className='title-bar-text'>File</div>
      </div>
      <div className='window-body'>
        <div className='field-row'>
          <button className='save-button' onClick={exportToFile}>Export</button>
          <button
            className='save-button'
            onClick={() => {
              dispatch(show('PROJECTS_SAVE_MODAL'))
            }}
          >Save
          </button>
          <button
            className='load-button'
            onClick={() => {
              dispatch(show('PROJECTS_MODAL'))
            }}
          >Load
          </button>
        </div>
      </div>
    </div>
  )
}
