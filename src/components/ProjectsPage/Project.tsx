import React, { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { deleteProject } from "../../features/Project/projectSlice";
import ProjectInterface from "../../interfaces/Project";

interface Props {
    project: ProjectInterface;
};

function Project({ project } : Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = (e: React.SyntheticEvent) => {
        dispatch(deleteProject(project.id))
    }

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if(!(e.target instanceof HTMLImageElement) /*&& e.target.className != "deleteIcon filter-red"*/)
            navigate(`/project/${project.id}`);
    }

    return (
        <div className="project" onClick={onClick}>
            <img className="deleteIcon filter-red" draggable="false" src="assets/delete-trash.svg"
                onClick={onDelete} />
            <h1>{project.title}</h1>
        </div>
    );
}

export default Project;