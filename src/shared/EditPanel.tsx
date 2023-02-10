import { useSelector, useDispatch } from 'react-redux'
import { redo, undo } from '../modules/historyIndex/slice'
import { strokesLengthSelector } from '../modules/strokes/slice'

export const EditPanel = (): React.ReactElement => {
  const dispatch = useDispatch()
  const undoLimit = useSelector(strokesLengthSelector)

  return (
    <div className='window edit'>
      <div className='title-bar'>
        <div className='title-bar-text'>Edit</div>
      </div>
      <div className='window-body'>
        <div className='field-row'>
          <button className='button undo' onClick={() => dispatch(undo(undoLimit))}>Undo</button>
          <button className='button redo' onClick={() => dispatch(redo(null))}>Redo</button>
        </div>
      </div>
    </div>
  )
}
