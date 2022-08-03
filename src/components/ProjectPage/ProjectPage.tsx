import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProjectBugs, selectCurrentProject, updateProject } from "../../features/Project/projectSlice"
import Project from "../../interfaces/Project";
import Header from "../Header";
import AddBugAlert from "./AddBugAlert";
import BugsTable from "./BugsTable";
import ProjectDescription from "./ProjectDescription";

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

    return (
        <div>
            <Header title={project?.title} editable={true} onEdited={onTitleEdited} />

            {showAlert && <AddBugAlert projectId={project?.id!} onClose={() => setShowAlert(false)} onClick={() => setShowAlert(false)} />}

            <ProjectDescription project={project} />

            <BugsTable bugs={project?.bugs != null ? project.bugs : []}
                addNewBug={() => setShowAlert(true)} />
        </div>
    );
}

export default ProjectPage;