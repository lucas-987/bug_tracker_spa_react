import { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import Project from "./Project";
import Header from "../common/header/Header";
import ProjectInterface from "../../interfaces/Project";
import projectService from "../../services/projectService";
import Error from "../../interfaces/Error";
import { useAppDispatch } from "../../app/hooks";
import { addError } from "../../features/errorsSlice";
import ErrorMessages from "../common/errors/ErrorMessages";
import { useTranslation } from "react-i18next";

function ProjectsPage() {
    const dispatch = useAppDispatch()
    const [projects, setProjects] = useState<ProjectInterface[]>([])

    useEffect(() => {
        fetchProjects()
    }, []);

    const { t } = useTranslation()

    const NETWORK_ERROR_TITLE = t('errors.global.networkErrorTitle')
    const NETWORK_ERROR_MESSAGE = t('errors.global.networkErrorMessage')
    const NETWORK_ERROR_MESSAGE_ACTION = t('errors.global.networkErrorMessageAction')
    const REQUEST_ERROR_TITLE = t('errors.global.requestErrorTitle')

    const fetchProjects = () => {
        projectService.getAll()
            .then(result => {
                if(result.success) setProjects(result.data)
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

    const onProjectCreated = (newProject: ProjectInterface) => {
        projectService.create(newProject)
            .then(result => {
                if(result.success) setProjects([...projects, result.data])
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

    const onProjectDeleted = (projectId: number) => {
        projectService.deleteById(projectId)
            .then(result => {
                if(result.success) {
                    setProjects(projects.filter(project => project.id != result.data))
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

    return (
        <>
            <Header />
            <ErrorMessages />
            <div className="grid">

                <CreateProject onProjectCreated={onProjectCreated} />

                {projects.map((project, i) => 
                    <Project key={i} project={project} onDelete={onProjectDeleted} />
                )}

            </div>
        </>

    );
}

export default ProjectsPage;