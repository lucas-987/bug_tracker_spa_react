import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Project from "../../interfaces/Project";

const MAX_TITLE_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 65535

interface Props {
    onProjectCreated: (newProject: Project) => void
}

function CreateProject({ onProjectCreated }: Props) {
    const { t } = useTranslation()

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
            setTitleError(t('errors.formValidation.fieldRequired'));
            formIsValid = false;
        }
        else if(title.length > MAX_TITLE_LENGTH) {
            setTitleError(t('errors.formValidation.titleTooLong', { 
                maxChar: MAX_TITLE_LENGTH,  
                actualLength: title.length
            }));
            formIsValid = false;
        }
        else setTitleError("")

        if(description.length > MAX_DESCRIPTION_LENGTH) {
            setDescriptionError(t('errors.formValidation.descriptionTooLong', { 
                maxChar: MAX_DESCRIPTION_LENGTH,  
                actualLength: description.length
            }));
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
                        <label htmlFor="title">{t('form.titleLabel')}</label>
                        <input name="title" type="text" value={title} placeholder={t('form.titlePlaceHolder')}
                            onChange={(e) => setTitle(e.target.value)} />
                        <span className="error-message">{titleError}</span>
                    </div>
                        
                    <div className={"form-group" + (descriptionError != "" ? " error" : "")}>
                        <label htmlFor="description">{t('form.descriptionLabel')}</label>
                        <textarea name="description" value={description} placeholder={t('form.descriptionPlaceHolder')}
                            rows={10} onChange={(e) => setDescription(e.target.value)} />
                        
                        <span className="error-message">{descriptionError}</span>
                    </div>
                        
                    <button>{t('buttons.create')}</button>
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