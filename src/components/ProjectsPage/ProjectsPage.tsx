import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateProject from "./CreateProject";
import Project from "./Project";
import { getAllProjects, selectProjects } from "../../features/Project/projectSlice"

function ProjectsPage() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getAllProjects())
    }, []);

    const projects = useAppSelector(selectProjects);

    return (
        <div className="grid">

            <CreateProject />

            {projects.map((project, i) => 
                <Project key={project.id} project={project} />
            )}

        </div>
    );
}

export default ProjectsPage;