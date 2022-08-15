import { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import Project from "./Project";
import Header from "../Header";
import ProjectInterface from "../../interfaces/Project";
import projectService from "../../services/projectService";

function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectInterface[]>([])
    
    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = () => {
        projectService.getAll()
            .then(result => {
                if(result.success) setProjects(result.data)
            })
    }

    const onProjectCreated = (newProject: ProjectInterface) => {
        projectService.create(newProject)
            .then(result => {
                if(result.success) setProjects([...projects, result.data])
            })
    }

    const onProjectDeleted = (projectId: number) => {
        projectService.deleteById(projectId)
            .then(result => {
                if(result.success) {
                    setProjects(projects.filter(project => project.id != result.data))
                }
            })
    }

    return (
        <>
            <Header />
            <div className="grid">

                <CreateProject onProjectCreated={onProjectCreated} />

                {projects.map((project, i) => 
                    <Project key={project.id} project={project} onDelete={onProjectDeleted} />
                )}

            </div>
        </>

    );
}

export default ProjectsPage;