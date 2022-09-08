import React, { useState } from "react";
import Bug from "../../interfaces/Bug";

const FORM_TITLE = "Create a new bug"
const TITLE_LABEL = "Title"
const TITLE_PLACEHOLDER = TITLE_LABEL
const DESCRIPTION_LABEL = "Description"
const DESCRIPTION_PLACEHOLDER = "Description (optionnal) ..."
const CREATE_BUTTON_TEXT = "Create"
const PRIORITY_LABEL = "Priority"
const PRIORITY_PLACEHOLDER = PRIORITY_LABEL
const DUE_DATE_LABEL = "Due date (optionnal)"
const DUE_DATE_PLACEHOLDER = "Due date"

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
    onClick?: () => void;
    onClose: () => void;
    projectId: number;
    onBugCreated: (newBug: Bug) => void
}

function AddBugAlert({ onClick, onClose, onBugCreated, projectId }: Props) {
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
                <h1>{FORM_TITLE}</h1>
                <form className="form" onSubmit={createNewBug}>
                    <div className={"form-group" + (titleError != "" ? " error" : "")}>
                        <label htmlFor="title">{TITLE_LABEL}</label>
                        <input name="title" type="text" placeholder={TITLE_PLACEHOLDER}
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        
                        <span className="error-message">{titleError}</span>
                    </div>
                    
                    <div className={"form-group" + (descriptionError != "" ? " error" : "")}>
                        <label htmlFor="description">{DESCRIPTION_LABEL}</label>
                        <textarea name="description" placeholder={DESCRIPTION_PLACEHOLDER}
                            rows={10} 
                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        
                        <span className="error-message">{descriptionError}</span>
                    </div>

                    <div className={"form-group"/* + (priorityError != "" ? " error" : "")*/}>
                        <label htmlFor="priority">{PRIORITY_LABEL}</label>
                        <input name="priority" type="number" placeholder={PRIORITY_PLACEHOLDER} min="0"
                            value={priority} onChange={(e) => setPriority(Number(e.target.value))}/>
                        
                        <span className="error-message">{/*priorityError*/}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">{DUE_DATE_LABEL}</label>
                        <input name="dueDate" type="date" placeholder={DUE_DATE_PLACEHOLDER}
                            onChange={(e) => setDate(e)}/>
                    </div>
                        
                    <button>{CREATE_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default AddBugAlert