import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Bug from "../../interfaces/Bug";

const MAX_TITLE_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 65535

interface Props {
    onClick?: () => void;
    onClose: () => void;
    projectId: number;
    onBugCreated: (newBug: Bug) => void
}

function AddBugAlert({ onClick, onClose, onBugCreated, projectId }: Props) {
    const { t } = useTranslation()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [priority, setPriority] = useState<number>(1)
    const [dueDate, setDueDate] = useState<Date>()

    const [titleError, setTitleError] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<string>('')

    const createNewBug = (e: React.SyntheticEvent) => {
        e.preventDefault()

        let formIsValid = true

        //check if the fields are ok
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

        let newBug:Bug = {
            id: -1,
            title,
            description: description === "" ? null : description,
            priority,
            status: "open"
        }
        if(dueDate != undefined) newBug.due_date = dueDate
        
        onBugCreated(newBug)

        setTitle("")
        setDescription("")
        setPriority(1)
        setDueDate(undefined)
        if(onClick)onClick()
    }

    const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === "") setDueDate(undefined)
        else setDueDate(new Date(e.target.value))
    }

    const onBackgroundClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target instanceof HTMLDivElement && e.target.className == "background-blur")
            onClose()
    }

    return (
        <div className="background-blur" onClick={onBackgroundClicked}>
            <div className="alert">
                <h1>{t('projectPage.addBugAlertTitle')}</h1>
                <form className="form" onSubmit={createNewBug}>
                    <div className={"form-group" + (titleError != "" ? " error" : "")}>
                        <label htmlFor="title">{t('form.titleLabel')}</label>
                        <input name="title" type="text" placeholder={t('form.titlePlaceHolder')}
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        
                        <span className="error-message">{titleError}</span>
                    </div>
                    
                    <div className={"form-group" + (descriptionError != "" ? " error" : "")}>
                        <label htmlFor="description">{t('form.descriptionLabel')}</label>
                        <textarea name="description" placeholder={t('form.descriptionPlaceHolder')}
                            rows={10} 
                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        
                        <span className="error-message">{descriptionError}</span>
                    </div>

                    <div className={"form-group"/* + (priorityError != "" ? " error" : "")*/}>
                        <label htmlFor="priority">{t('form.priorityLabel')}</label>
                        <input name="priority" type="number" placeholder={t('form.priorityPlaceHolder')} min="0"
                            value={priority} onChange={(e) => setPriority(Number(e.target.value))}/>
                        
                        <span className="error-message">{/*priorityError*/}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">{t('form.dueDateLabel')}</label>
                        <input name="dueDate" type="date" placeholder={t('form.dueDatePlaceHolder')}
                            onChange={(e) => setDate(e)}/>
                    </div>
                        
                    <button>{t('buttons.create')}</button>
                </form>
            </div>
        </div>
    );
}

export default AddBugAlert