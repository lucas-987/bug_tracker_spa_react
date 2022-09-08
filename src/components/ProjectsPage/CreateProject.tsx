import React, { useState } from "react";
import Project from "../../interfaces/Project";

const TITLE_LABEL = "Title"
const TITLE_PLACEHOLDER = TITLE_LABEL
const DESCRIPTION_LABEL = "Description"
const DESCRIPTION_PLACEHOLDER = "Description (optionnal) ..."
const CREATE_BUTTON_TEXT = "Create"

const FIELD_REQUIRED = "This field is required."

const TITLE_TOO_LONG = ["The title must be less than ", " characters (currently ", ")."]
const DESCRIPTION_TOO_LONG = ["The description must be less than ", " characters (currently ", ")."]
const MAX_TITLE_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 65535

function fieldToLong(strings: string[], maxChar: number, currentLength: number) {
    const str0 = strings[0] // ... must be less than
    const str1 = strings[1] // ... characters ... (currently 
    const str2 = strings[2] // ).

    return `${str0}${maxChar}${str1}${currentLength}${str2}`
}


interface Props {
    onProjectCreated: (newProject: Project) => void
}

function CreateProject({ onProjectCreated }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");

    const createNewProject = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let formIsValid = true;

        //check if fields are ok
        if(!title) {
            setTitleError(FIELD_REQUIRED);
            formIsValid = false;
        }
        else if(title.length > MAX_TITLE_LENGTH) {
            setTitleError(fieldToLong(TITLE_TOO_LONG, MAX_TITLE_LENGTH, title.length));
            formIsValid = false;
        }
        else setTitleError("")

        if(description.length > MAX_DESCRIPTION_LENGTH) {
            setDescriptionError(fieldToLong(DESCRIPTION_TOO_LONG, MAX_DESCRIPTION_LENGTH, description.length));
            formIsValid = false;
        }
        else setDescriptionError("")
        
        if(!formIsValid) return;

        let newProject: Project = {
            id: -1,
            title,
            description: description === "" ? null : description
        };
        
        onProjectCreated(newProject);

        setTitle("");
        setDescription("");
        setIsOpen(false);
    }

    if(isOpen) {
        return (
            <div className="project-add-form">
                <form className="form--full-width" onSubmit={createNewProject}>
                    <div className={"form-group" + (titleError != "" ? " error" : "")}>
                        <label htmlFor="title">{TITLE_LABEL}</label>
                        <input name="title" type="text" value={title} placeholder={TITLE_PLACEHOLDER}
                            onChange={(e) => setTitle(e.target.value)} />
                        <span className="error-message">{titleError}</span>
                    </div>
                        
                    <div className={"form-group" + (descriptionError != "" ? " error" : "")}>
                        <label htmlFor="description">{DESCRIPTION_LABEL}</label>
                        <textarea name="description" value={description} placeholder={DESCRIPTION_PLACEHOLDER}
                            rows={10} onChange={(e) => setDescription(e.target.value)} />
                        
                        <span className="error-message">{descriptionError}</span>
                    </div>
                        
                    <button>{CREATE_BUTTON_TEXT}</button>
                </form>
            </div>
        );
    }
    else {
        return (
            <div className="project" onClick={() => setIsOpen(true)}>
                <img className="project__add-icon"
                    src="assets/plus.svg" draggable="false" />
            </div>
        );
    }
    
}

export default CreateProject;