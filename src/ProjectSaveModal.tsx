import { type AnyAction } from '@reduxjs/toolkit'
import { type ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCanvas } from './CanvasContext'
import { hide } from './modules/modals/slice'
import { saveProject } from './modules/strokes/slice'
import { getCanvasImage } from './utils/canvasUtils'
import { getBase64Thumbnail } from './utils/scaler'

export const ProjectSaveModal = (): React.ReactElement => {
  const [projectName, setProjectName] = useState('')
  const dispatch = useDispatch()
  const canvasRef = useCanvas()

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProjectName(e.target.value)
  }

  const onProjectSave = async (): Promise<void> => {
    const file = await getCanvasImage(canvasRef.current)

    if (!file) {
      return
    }

    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 })
    dispatch(saveProject({ projectName, thumbnail }) as unknown as AnyAction)
    setProjectName('')
    dispatch(hide())
  }

  return (
    <div className='window modal-panel'>
      <div className='title-bar'>
        <div className='title-bar-text'>Save</div>
      </div>
      <div className='window-body'>
        <div className='field-row-stacked'>
          <label htmlFor='' className='projectName'>Project name</label>
          <input type='text' id='projectName' onChange={onProjectNameChange} />
        </div>
        <div className='field-row'>
          <button onClick={onProjectSave}>Save</button>
          <button onClick={() => dispatch(hide())}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
