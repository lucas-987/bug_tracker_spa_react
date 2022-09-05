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

    const createNewBug = (e: React.SyntheticEvent) => {
        e.preventDefault()

        //check if the fields are ok


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
                    <div className="form-group">
                        <label htmlFor="title">{TITLE_LABEL}</label>
                        <input name="title" type="text" placeholder={TITLE_PLACEHOLDER}
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">{DESCRIPTION_LABEL}</label>
                        <textarea name="description" placeholder={DESCRIPTION_PLACEHOLDER}
                            rows={10} 
                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">{PRIORITY_LABEL}</label>
                        <input name="priority" type="number" placeholder={PRIORITY_PLACEHOLDER} min="0"
                            value={priority} onChange={(e) => setPriority(Number(e.target.value))}/>
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