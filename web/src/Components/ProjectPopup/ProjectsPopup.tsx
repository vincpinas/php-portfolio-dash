import React, { Dispatch, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineScheduleSend, MdOutlineSend } from 'react-icons/md';
import { useCreateProject } from '../../requests';
import { useFormik } from 'formik';
import { lAB, lAF } from '../../helpers';
import * as Yup from 'yup';
import './ProjectsPopup.scss';

interface popupProps {
  setPopupActive: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

function ProjectsPopup({ setPopupActive, refetch }: popupProps) {
  const [github, setGithub] = useState('');
  const [live, setLive] = useState('');
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const { mutate: reqCreateProj, isLoading, isSuccess, data } = useCreateProject();

  const lOC = (e: React.InputHTMLAttributes<HTMLInputElement>) => {
    formik.handleChange(e);
    lAF(e);
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      introduction: '',
      status: '',
      img_src: '',
      description: '',
      learned: '',
      links: { "github": github, "live": live },
      skills: [],
      categories: [],
    },
    validationSchema: Yup.object().shape({

    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      const proj = new FormData();
      proj.append('title', values.title);
      proj.append('introduction', values.introduction);
      proj.append('status', values.status);
      proj.append('img_src', values.img_src);
      proj.append('description', values.description);
      proj.append('learned', values.learned);
      proj.append('links', JSON.stringify(values.links));
      proj.append('skills', JSON.stringify(values.skills));
      proj.append('categories', JSON.stringify(values.categories));

      reqCreateProj(proj)
      setTimeout(() => {
        refetch();
        setPopupActive(false);
      }, 200)
    },
  });

  return (
    <div id='projectsPopupComponent'>
      <div className='popupWindow'>
        <button className='projectButton cancel' onClick={() => setPopupActive(false)}>
          <AiOutlineCloseCircle /> Cancel
        </button>
        <div id='popupFormWrapper'>
          <form className='formikForm' onSubmit={formik.handleSubmit}>
            <label htmlFor='title' className={formik.errors.title ? 'iFerr-label' : ''}>
              title*
              <input
                className={formik.errors.title ? 'iFerr-input' : ''}
                type='text' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='example@gmail.com' id='title'
                defaultValue={formik.initialValues.title}
              />
              {formik.errors.title && <span className='errorMessage'>{formik.errors.title}</span>}
            </label>
            <button type='submit' disabled={isLoading}>
              {isLoading ? <MdOutlineScheduleSend /> : <MdOutlineSend />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPopup;
