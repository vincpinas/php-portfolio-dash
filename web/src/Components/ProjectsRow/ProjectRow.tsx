import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Project, ParsedProject } from '../../interface';
import { deleteProject } from '../../requests';
import './ProjectsRow.scss';

interface ProjectRowProps {
  project: Project;
  refetch: () => void;
}

function ProjectRow({ project, refetch }: ProjectRowProps) {
  const [parsedProject, setParsedProject] = useState<ParsedProject|Project>(project);
  useEffect(() => {
    setParsedProject({
      id: project.id, title: project.title, introduction: project.introduction,
      status: project.status, img_src: project.img_src, description: project.description,
      learned: project.learned, links: JSON.parse(project.links), skills: JSON.parse(project.skills),
      categories: JSON.parse(project.categories),
    })
  }, [project])
  const { id, title, introduction, status, img_src, description, learned } = parsedProject;
  const links = typeof parsedProject.links === "object" ? parsedProject.links : JSON.parse(project.links)
  const skills = typeof parsedProject.skills === "object" ? parsedProject.skills : JSON.parse(project.skills)
  const categories = typeof parsedProject.categories === "object" ? parsedProject.categories : JSON.parse(project.categories)
  const sString = (string: string) => {
    return string.substring(0, 20) + "..."
  }
  const useDeleteProject = () => {
    deleteProject(id).then(() => refetch())
  }


  return (
    <ul className='projectRow'>
      <li>{id}</li>
      <li>{sString(title)}</li>
      <li>{sString(introduction)}</li>
      <li>{sString(description)}</li>
      <li>{sString(learned)}</li>
      <li>{status}</li>
      <li>{img_src}</li>
      <li>{sString(links.github)}, {sString(links.live)}</li>
      <li>{skills[2]}</li>
      <li>{categories}</li>
      <li><button onClick={useDeleteProject}><AiOutlineDelete /></button></li>
    </ul>
  )
}

export default ProjectRow;
