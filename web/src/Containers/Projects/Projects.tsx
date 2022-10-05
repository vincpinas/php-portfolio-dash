import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { fetchProjects } from '../../requests';
import ProjectsPopup from '../../Components/ProjectPopup/ProjectsPopup';
import './Projects.scss';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const { data } = useQuery('fetchProjects', fetchProjects, {
    staleTime: 9000,
  });
  useEffect(() => {
    setProjects(data);
  }, [data])

  return (
    <>
      {popupActive ? <ProjectsPopup setPopupActive={setPopupActive} /> : null}
      <div id='projectsContainer'>
        <h2>Projects</h2>
        <h4>Manage all your projects in the list down here.</h4>
        <button className='projectButton open' onClick={() => setPopupActive(true)}>
          <AiOutlinePlusCircle /> Add project
        </button>
        <div className='projectsWrapper'></div>
      </div>
    </>
  )
}

export default Projects