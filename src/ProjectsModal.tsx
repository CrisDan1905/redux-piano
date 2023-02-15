import { type AnyAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hide } from './modules/modals/slice'
import { getProjectsList, projectsListSelector } from './modules/projectsList/slice'
import { loadProject } from './modules/strokes/slice'

export const ProjectsModal = (): React.ReactElement => {
  const dispatch = useDispatch()
  const projectsList = useSelector(projectsListSelector)

  const onLoadProject = (projectId: string): void => {
    dispatch(loadProject(projectId) as unknown as AnyAction)
    dispatch(hide())
  }

  useEffect(() => {
    dispatch(getProjectsList() as unknown as AnyAction)
  }, [])

  return (
    <div className='window modal-panel'>
      <div className='title-bar'>
        <div className='title-bar-text'>Load Project</div>
        <div className='title-bar-controls'>
          <button
            aria-label='Close'
            onClick={() => dispatch(hide())}
          />
        </div>
      </div>
      <div className='projects-container'>
        {(projectsList || []).map(project =>
          <div className='project-card' key={project.id} onClick={() => { onLoadProject(project.id) }}>
            <img src={project.image} alt='thumbnail' />
            <div>{project.name}</div>
          </div>
        )}
      </div>
    </div>
  )
}
