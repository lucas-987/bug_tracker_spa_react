import React, { useState } from "react";
import Bug from "../../interfaces/Bug";
import { useAppDispatch } from "../../app/hooks";
import { BugAsyncThunkParams, createBug } from "../../features/Project/projectSlice";

interface Props {
    onClick?: () => void;
    onClose: () => void;
    projectId: number;
}

function AddBugAlert({ onClick, onClose, projectId }: Props) {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [priority, setPriority] = useState<number>(1)
    const [dueDate, setDueDate] = useState<Date>()

    const dispatch = useAppDispatch()

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

        const dispatchParams: BugAsyncThunkParams = {
            bug: newBug,
            projectId: projectId
        }
        dispatch(createBug(dispatchParams));

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
        if(e.target instanceof HTMLDivElement && e.target.className == "backgroundBlur")
            onClose()
    }

    return (
        <div className="backgroundBlur" onClick={onBackgroundClicked}>
            <form className="newProjectAlert" onSubmit={createNewBug}>
                <h1>Create a new bug</h1>
                <div className="form">
                    <div className="formGroup">
                        <label htmlFor="title">Title</label>
                        <input name="title" type="text" placeholder="Title"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    
                    <div className="formGroup">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" placeholder="Description (optionnal) ..."
                            rows={10} 
                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="priority">Priority</label>
                        <input name="priority" type="number" placeholder="Priority" min="0"
                            value={priority} onChange={(e) => setPriority(Number(e.target.value))}/>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="dueDate">Due date (optionnal)</label>
                        <input name="dueDate" type="date" placeholder="Due date"
                            onChange={(e) => setDate(e)}/>
                    </div>
                        
                    <button>Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddBugAlert