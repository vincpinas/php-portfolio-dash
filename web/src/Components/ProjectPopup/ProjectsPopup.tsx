import React, { Dispatch } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './ProjectsPopup.scss';

interface popupProps {
  setPopupActive: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

function ProjectsPopup({ setPopupActive, refetch }: popupProps) {
  return (
    <div id='projectsPopupComponent'>
      <div className='popupWindow'>
        <button className='projectButton cancel' onClick={() => setPopupActive(false)}>
          <AiOutlineCloseCircle /> Cancel
        </button>
      </div>
    </div>
  )
}

export default ProjectsPopup;
