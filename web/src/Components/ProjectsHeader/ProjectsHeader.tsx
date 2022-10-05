import React, { useRef, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import './ProjectsHeader.scss';

interface PHeaderProps {
  refetch: () => void;
}

function ProjectsHeader({ refetch }: PHeaderProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [animation, setAnimation] = useState<boolean>();
  function refresh(ref: any) {
    if(!animation) {
      setAnimation(true);
      refetch()
      ref.current.style.animationName = 'rotate'
      ref.current.style.animationDuration = '1.1s'
      setTimeout(() => {
        ref.current.style.animation = 'none';
        ref.current.style.animation = '';
        setAnimation(false);
      }, 1000);
    }
  }

  return (
    <div id='projectsHeaderComponent'>
      <button ref={ref}><IoMdRefresh onClick={() => refresh(ref)} /></button>
    </div>
  )
}

export default ProjectsHeader