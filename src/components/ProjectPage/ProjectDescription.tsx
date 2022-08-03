import { createRef, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { updateProject } from "../../features/Project/projectSlice";
import Project from "../../interfaces/Project";
import ReadMoreButton from "../common/ReadMoreButton";

interface Props {
    project: Project | null
}

function ProjectDescription({ project }: Props) {
    const dispatch = useAppDispatch();

    const descriptionRef = createRef<HTMLDivElement>();
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState<string>("");

    useLayoutEffect(() => {
        const { current } = descriptionRef

        if(current) {
            setShowReadMoreButton(current.scrollHeight > current.clientHeight)
        }
    }, [])

    const readMoreClicked = () => {
        setIsOpen(!isOpen)
    }

    const openEditing = () => {
        if(project != null) setEditing(true)
    }

    const descriptionEdited = () => {
        
        if(editedDescription) {
            let newProject: Project = {
                id: project!.id,
                title: project!.title,
                description: editedDescription
            };

            dispatch(updateProject(newProject))
        }

        setEditing(false)
    }

    return (
        <div className="projectDescriptionWrapper">
            {
                editing ? 
                <>
                    <img className="editIcon" onClick={() => descriptionEdited()} src="assets/ok.svg" />
                    <img className="cancelIcon" onClick={() => setEditing(false)} src="assets/close.svg" />
                    <textarea onChange={(e) => setEditedDescription(e.target.value)}>{project?.description}</textarea>
                </>
                :
                <>
                    <img className="editIcon" onClick={() => openEditing()} src="assets/edit.svg" />
                    <div ref={descriptionRef} className={"projectDescription" + (isOpen ? " open" : "")}>
                        {project?.description}
                    </div>
                    <ReadMoreButton isVisible={showReadMoreButton} isExpanded={isOpen} onClick={readMoreClicked} />
                </>
            }
        </div>
    );
}

export default ProjectDescription