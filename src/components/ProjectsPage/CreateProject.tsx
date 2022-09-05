import React, { useState } from "react";
import Project from "../../interfaces/Project";

const TITLE_LABEL = "Title"
const TITLE_PLACEHOLDER = TITLE_LABEL
const DESCRIPTION_LABEL = "Description"
const DESCRIPTION_PLACEHOLDER = "Description (optionnal) ..."
const CREATE_BUTTON_TEXT = "Create"

interface Props {
    onProjectCreated: (newProject: Project) => void
}

function CreateProject({ onProjectCreated }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const createNewProject = (e: React.SyntheticEvent) => {
        e.preventDefault();

        //check if fields are ok
        if(!title || title.length > 255) {
            return;
        }

        if(description.length > 65535) {
            return;
        }
        
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
                    <div className="form-group">
                        <label htmlFor="title">{TITLE_LABEL}</label>
                        <input name="title" type="text" value={title} placeholder={TITLE_PLACEHOLDER}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                        
                    <div className="form-group">
                        <label htmlFor="description">{DESCRIPTION_LABEL}</label>
                        <textarea name="description" value={description} placeholder={DESCRIPTION_PLACEHOLDER}
                            rows={10} onChange={(e) => setDescription(e.target.value)} />
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