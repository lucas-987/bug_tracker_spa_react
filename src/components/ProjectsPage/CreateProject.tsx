import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createProject } from "../../features/Project/projectSlice";
import Project from "../../interfaces/Project";

function CreateProject() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const dispatch = useAppDispatch();

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

        dispatch(createProject(newProject));

        setTitle("");
        setDescription("");
        setIsOpen(false);
    }

    if(isOpen) {
        return (
            <div className="projectAddForm">
                <form className="formFullWidth" onSubmit={createNewProject}>
                    <div className="formGroup">
                        <label htmlFor="title">Title</label>
                        <input name="title" type="text" value={title} placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                        
                    <div className="formGroup">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={description} placeholder="Description (optionnal) ..."
                            rows={10} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                        
                    <button>Create</button>
                </form>
            </div>
        );
    }
    else {
        return (
            <div className="project" onClick={() => setIsOpen(true)}>
                <img className="projectAddIcon"
                    src="assets/plus.svg" draggable="false" />
            </div>
        );
    }
    
}

export default CreateProject;