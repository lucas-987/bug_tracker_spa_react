import { createRef, useLayoutEffect, useState } from "react";
import ReadMoreButton from "./ReadMoreButton";

interface Props {
    text: string | null | undefined;
    descriptionEditedCallback: (newDescription: string) => void;
    wrapperClassName?: string;
    editIconClassName?: string;
    cancelIconClassName?: string;
    descriptionClassName?: string;
}

function Description(
    { 
        text, 
        descriptionEditedCallback,
        wrapperClassName = "descriptionWrapper",
        editIconClassName = "editIcon",
        cancelIconClassName = "cancelIcon",
        descriptionClassName = "description"

    }: Props) 
{
    const descriptionRef = createRef<HTMLDivElement>();
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState<string>("");

    // check if a readmore button is needed
    useLayoutEffect(() => {
        const { current } = descriptionRef

        if(current) {
            setShowReadMoreButton(current.scrollHeight > current.clientHeight)
        }
    }, [])

    const readMoreClicked = () => {
        setIsOpen(!isOpen)
    }

    const descriptionEdited = () => {
        
        if(editedDescription) {
            descriptionEditedCallback(editedDescription)
        }

        setEditing(false)
    }

    return (
        <div className={wrapperClassName}>
            {
                editing ? 
                <>
                    <img className={editIconClassName} onClick={() => descriptionEdited()} src="assets/ok.svg" />
                    <img className={cancelIconClassName} onClick={() => setEditing(false)} src="assets/close.svg" />
                    <textarea className={descriptionClassName} defaultValue={text != null ? text : ""}
                        onChange={(e) => setEditedDescription(e.target.value)} />
                </>
                :
                <>
                    <img className={editIconClassName} onClick={() => setEditing(true)} src="assets/edit.svg" />
                    <div ref={descriptionRef} className={descriptionClassName + (isOpen ? " open" : "")}>
                        {text}
                    </div>
                    <ReadMoreButton isVisible={showReadMoreButton} isExpanded={isOpen} onClick={readMoreClicked} />
                </>
            }
        </div>
    );
}

export default Description