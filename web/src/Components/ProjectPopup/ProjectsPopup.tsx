import React, { Dispatch } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './ProjectsPopup.scss';

interface popupProps {
  setPopupActive: any;
}

function ProjectsPopup({ setPopupActive }: popupProps) {
  return (
    <div id='projectsPopup'>
      <div className='popupWindow'>
        <button className='projectButton cancel' onClick={() => setPopupActive(false)}>
          <AiOutlineCloseCircle /> Cancel
        </button>
      </div>
    </div>
  )
}

export default ProjectsPopup;
