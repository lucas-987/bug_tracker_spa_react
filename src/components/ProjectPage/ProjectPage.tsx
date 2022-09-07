import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { addError } from "../../features/errorsSlice";
import Bug from "../../interfaces/Bug";
import Project from "../../interfaces/Project";
import bugService from "../../services/bugService";
import projectService from "../../services/projectService";
import Description from "../common/Description";
import ErrorMessages from "../common/errors/ErrorMessages";
import Header from "../Header";
import AddBugAlert from "./AddBugAlert";
import BugsTable from "./BugsTable";
import Error from "../../interfaces/Error";

const NETWORK_ERROR_TITLE = "Network Error"
const NETWORK_ERROR_MESSAGE = "Unable to load data. Please try to reload the page."
const NETWORK_ERROR_MESSAGE_ACTION = "Unable to execute the action. Please try again."

const REQUEST_ERROR_TITLE = "Request Error"
const INTERNAL_ERROR_TITLE = "Internal Error"

const SOMETHING_WENT_WRONG_MESSAGE = "Something went wrong. Please try again."

function ProjectPage() {
    const dispatch = useAppDispatch()

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
                if(result.success) setProject(result.data)
                else {
                    const err: Error = {
                        id: "",
                        type: "ERROR",
                        message: result.message!
                    }

                    dispatch(addError(err))
                }
            })
            .catch(err => {
                const error: Error = {
                    id: "",
                    title: NETWORK_ERROR_TITLE,
                    type: "ERROR",
                    message: NETWORK_ERROR_MESSAGE
                }

                dispatch(addError(error))
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
                    else {
                        const error: Error = {
                            id: "",
                            title: INTERNAL_ERROR_TITLE,
                            type: "ERROR",
                            message: SOMETHING_WENT_WRONG_MESSAGE
                        }
    
                        dispatch(addError(error))
                    }
                }
                else {
                    const error: Error = {
                        id: "",
                        title: REQUEST_ERROR_TITLE,
                        type: "ERROR",
                        message: result.message!
                    }

                    dispatch(addError(error))
                }
            })
            .catch(err => {
                const error: Error = {
                    id: "",
                    title: NETWORK_ERROR_TITLE,
                    type: "ERROR",
                    message: NETWORK_ERROR_MESSAGE_ACTION
                }

                dispatch(addError(error))
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
                        else {
                            const error: Error = {
                                id: "",
                                title: INTERNAL_ERROR_TITLE,
                                type: "ERROR",
                                message: SOMETHING_WENT_WRONG_MESSAGE
                            }
        
                            dispatch(addError(error))
                        }
                    }
                    else {
                        const error: Error = {
                            id: "",
                            title: REQUEST_ERROR_TITLE,
                            type: "ERROR",
                            message: result.message!
                        }
    
                        dispatch(addError(error))
                    }
                })
                .catch(err => {
                    const error: Error = {
                        id: "",
                        title: NETWORK_ERROR_TITLE,
                        type: "ERROR",
                        message: NETWORK_ERROR_MESSAGE_ACTION
                    }
    
                    dispatch(addError(error))
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
            <ErrorMessages />

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