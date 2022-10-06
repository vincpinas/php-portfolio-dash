import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { fetchProjects } from '../../requests';
import ProjectsPopup from '../../Components/ProjectPopup/ProjectsPopup';
import './Projects.scss';
import ProjectRow from '../../Components/ProjectsRow/ProjectRow';
import { Project } from '../../interface';
import ProjectsHeader from '../../Components/ProjectsHeader/ProjectsHeader';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

function Projects() {
  const [projects, setProjects] = useState<Project[]|[]>([]);
  const [popupActive, setPopupActive] = useState(false);
  const { data, refetch } = useQuery('fetchProjects', fetchProjects, {
    staleTime: 9000,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    setProjects(data);
  }, [data])

  return (
    <>
      {popupActive ? <ProjectsPopup setPopupActive={setPopupActive} refetch={refetch} /> : null}
      <div id='projectsContainer'>
        <h2>Projects</h2>
        <h4>Manage all your projects in the list down here.</h4>
        <button className='projectButton open' onClick={() => setPopupActive(true)}>
          <AiOutlinePlusCircle /> Add project
        </button>
        <ProjectsHeader refetch={refetch} results={projects.length ? projects.length : 0} />
        <div className={`projectsWrapper ${projects.length > 0 ? '' : 'noResults'}`}>
          { projects.length > 0 ?
          projects.map((row: Project) => {
            return (<ProjectRow project={row} key={`project-row-id:${row.id}`} refetch={refetch} />)
          }) : <LoadingScreen text={`Seems like there are no projects here just yet.`} />
          }
        </div>
      </div>
    </>
  )
}

export default Projects