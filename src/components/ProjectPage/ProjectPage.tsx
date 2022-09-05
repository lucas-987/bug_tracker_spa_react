import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Bug from "../../interfaces/Bug";
import Project from "../../interfaces/Project";
import bugService from "../../services/bugService";
import projectService from "../../services/projectService";
import Description from "../common/Description";
import Header from "../Header";
import AddBugAlert from "./AddBugAlert";
import BugsTable from "./BugsTable";

function ProjectPage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [project, setProject] = useState<Project>();

    let { id } = useParams();
    
    useEffect(() => {
        const projectId = Number(id)
        getProject(projectId)
    }, []);

    const getProject = (id: number) => {
        projectService.getById(id)
            .then(result => {
                setProject(result.data)
            })
    }

    const onProjectUpdated = (newProject: Project) => {
        projectService.update(newProject)
            .then(result => {
                if(result.success) {
                
                    const data = result.data as Project
                    
                    if(project != null && project.id == data.id ) {
                        let updatedProject = {...project} as Project
                        updatedProject.title = data.title
                        if(data.description != undefined) updatedProject.description = data.description

                        setProject(updatedProject)
                    }
                }
            })
    }

    const onBugCreated = (newBug: Bug) => {
        if(project != null) {
            bugService.create(newBug, project.id)
                .then(result => {
                    if(result.success) {
                        if(project != null) {
                            let updatedProject = {...project} as Project
                            updatedProject.bugs = updatedProject.bugs ? [...updatedProject.bugs, result.data] : [result.data]
                            
                            setProject(updatedProject)
                        }
                    }
                })
        }
    }

    const onTitleEdited = (newTitle: string) => {
        if(newTitle && project != null) {
            let newProject: Project = {
                id: project.id,
                title: newTitle
            }

            onProjectUpdated(newProject)
        }
    }

    const onDescriptionEdited = (newDescription: string) => {
        if(project != null) {
            let newProject: Project = {
                id: project.id,
                title: project.title,
                description: newDescription
            };
    
            onProjectUpdated(newProject)
        }
    }

    return (
        <div>
            <Header title={project?.title} editable={true} onEdited={onTitleEdited} />

            {showAlert && <AddBugAlert projectId={project?.id!} onClose={() => setShowAlert(false)}
                 onClick={() => setShowAlert(false)} onBugCreated={onBugCreated} />}

            <Description text={project?.description}
                wrapperClassName="project-description-wrapper" descriptionClassName="project-description"
                descriptionEditedCallback={onDescriptionEdited} />

            <BugsTable bugs={project?.bugs != null ? project.bugs : []}
                addNewBug={() => setShowAlert(true)} />
        </div>
    );
}

export default ProjectPage;