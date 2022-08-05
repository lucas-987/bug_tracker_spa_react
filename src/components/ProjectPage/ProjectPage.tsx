import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProjectBugs, selectCurrentProject, updateProject } from "../../features/Project/projectSlice"
import Project from "../../interfaces/Project";
import Description from "../common/Description";
import Header from "../Header";
import AddBugAlert from "./AddBugAlert";
import BugsTable from "./BugsTable";

function ProjectPage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    let { id } = useParams();
    
    useEffect(() => {
        const projectId = Number(id)
        dispatch(getProjectBugs(projectId))
    }, []);
    
    const project = useAppSelector(selectCurrentProject);

    const onTitleEdited = (newTitle: string) => {
        if(newTitle) {
            let newProject: Project = {
                id: project!.id,
                title: newTitle
            }

            dispatch(updateProject(newProject))
        }
    }

    const onDescriptionEdited = (newDescription: string) => {
        let newProject: Project = {
            id: project!.id,
            title: project!.title,
            description: newDescription
        };

        dispatch(updateProject(newProject))
    }

    return (
        <div>
            <Header title={project?.title} editable={true} onEdited={onTitleEdited} />

            {showAlert && <AddBugAlert projectId={project?.id!} onClose={() => setShowAlert(false)} onClick={() => setShowAlert(false)} />}

            <Description text={project?.description}
                wrapperClassName="projectDescriptionWrapper" descriptionClassName="projectDescription"
                descriptionEditedCallback={onDescriptionEdited} />

            <BugsTable bugs={project?.bugs != null ? project.bugs : []}
                addNewBug={() => setShowAlert(true)} />
        </div>
    );
}

export default ProjectPage;