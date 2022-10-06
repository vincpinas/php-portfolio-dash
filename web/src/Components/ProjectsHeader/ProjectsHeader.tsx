import React, { useRef, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import Tooltip from '../Tooltip/Tooltip';
import './ProjectsHeader.scss';

interface PHeaderProps {
  refetch: () => void;
  results: number;
}

function ProjectsHeader({ refetch, results }: PHeaderProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [animation, setAnimation] = useState<boolean>();
  function refresh(ref: React.RefObject<HTMLButtonElement>) {
    if (!animation && ref.current) {
      setAnimation(true);
      refetch()
      ref.current.style.animationName = 'rotate'
      ref.current.style.animationDuration = '1.1s'
      setTimeout(() => {
        if(ref.current) {
          ref.current.style.animation = 'none';
          ref.current.style.animation = '';
        }
        setAnimation(false);
      }, 1000);
    }
  }

  return (
    <div id='projectsHeaderComponent'>
      <span>
        <Tooltip text='Refetch'>
          <button ref={ref}><IoMdRefresh onClick={() => refresh(ref)} /></button>
        </Tooltip>
      </span>
      <p>Results: {results}</p>
    </div>
  )
}

export default ProjectsHeader