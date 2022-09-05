import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import ProjectInterface from "../../interfaces/Project";

interface Props {
    project: ProjectInterface;
    onDelete: (id: number) => void;
};

function Project({ project, onDelete } : Props) {
    const navigate = useNavigate();

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if(!(e.target instanceof HTMLImageElement) /*&& e.target.className != "deleteIcon filter-red"*/)
            navigate(`/project/${project.id}`);
    }

    return (
        <div className="project" onClick={onClick}>
            <img className="delete-icon filter-red" draggable="false" src="assets/delete-trash.svg"
                onClick={() => onDelete(project.id)} />
            <h1>{project.title}</h1>
        </div>
    );
}

export default Project;