import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { updateBug } from "../../features/Project/projectSlice";
import Bug from "../../interfaces/Bug";

const CLOSE_ISSUE_BUTTON_TEXT = "Close issue"
const OPEN_ISSUE_BUTTON_TEXT = "Open issue"

interface Props {
    bug: Bug | null;
}

function BugProperties({ bug }: Props) {
    const [editing, setEditing] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(bug != null ? bug.status : "")
    const [priority, setPriority] = useState<number>(bug != null ? bug.priority : 1)
    const [dueDate, setDueDate] = useState<Date | null>((bug != null && bug.due_date != null) ? bug.due_date : null)

    const dispatch = useAppDispatch()

    const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === "") setDueDate(null)
        else setDueDate(new Date(e.target.value))
    }

    const onChangesValidated = () => {
        if(bug != null) {
            let newBug: Bug = {
                id: bug.id,
                title: "",
                status: status,
                priority: priority
            }
            if(dueDate != null) newBug.due_date = dueDate
            dispatch(updateBug(newBug))
            setEditing(false)
        }
    }

    const switchStatus = () => {
        if(bug != null) {
            let newBug: Bug = {
                id: bug.id,
                title: "",
                status: bug.status === "open" ? "close" : "open",
                priority: -1
            }
            dispatch(updateBug(newBug))
        }
    }

    return (
        <>
        {
            editing ?
            <form className="bugProperties form descriptionWrapper" onSubmit={(e) => {e.preventDefault(); onChangesValidated()}}>
                <img className="editIcon" onClick={() => onChangesValidated()} src="assets/ok.svg" />
                <img className="cancelIcon" onClick={() => setEditing(false)} src="assets/close.svg" />
                
                <div className="property formGroup">
                    <span className="label">Status :</span>
                    <select className="value" value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">open</option>
                        <option value="close">close</option>
                    </select>
                </div>

                <div className="property formGroup">
                    <span className="label">Priority :</span>
                    <input className="value" type="number" min={0}
                        value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
                </div>
                        
                <div className="dates">
                    <div className="property formGroup">
                        <span className="label">Start date :</span>
                        <input disabled className="value" type="date"
                            value={(bug != null && bug.start_date != null) ? new Date(bug.start_date).toISOString().split("T")[0] : ""} />
                    </div>

                    <div className="property formGroup">
                        <span className="label">Due date :</span>
                        <input className="value" type="date"
                            value={(dueDate != null) ? new Date(dueDate).toISOString().split("T")[0] : ""}
                            onChange={(e) => setDate(e)} />
                    </div>

                    <div className="property formGroup">
                        <span className="label">End date :</span>
                        <input disabled className="value" type="date"
                            value={(bug != null && bug.end_date != null) ? new Date(bug.end_date).toISOString().split("T")[0] : ""} />
                    </div>
                </div>
            </form>
            :
            <div className="bugProperties descriptionWrapper">
                <img className="editIcon" onClick={() => setEditing(true)} src="assets/edit.svg" />

                <div className="property">
                    <span className="label">Status :</span>
                    <span className="value">{bug?.status}</span>
                </div>

                <div className="property">
                    <span className="label">Priority :</span>
                    <span className="value">{bug?.priority}</span>
                </div>
                    
                <div className="dates">
                    <div className="property">
                        <span className="label">Start date :</span>
                        <span className="value">{bug != null && (bug.start_date == null ? "" : new Date(bug.start_date).toLocaleDateString())}</span>
                    </div>

                    <div className="property">
                        <span className="label">Due date :</span>
                        <span className="value">{bug != null && (bug.due_date == null ? "" : new Date(bug.due_date).toLocaleDateString())}</span>
                    </div>

                    <div className="property">
                        <span className="label">End date :</span>
                        <span className="value">{bug != null && (bug.end_date == null ? "" : new Date(bug.end_date).toLocaleDateString())}</span>
                    </div>
                </div>
                        
                <button onClick={() => switchStatus()}>{bug?.status === "open" ? CLOSE_ISSUE_BUTTON_TEXT : OPEN_ISSUE_BUTTON_TEXT}</button>
            </div>
        }
        </>
    );
}

export default BugProperties