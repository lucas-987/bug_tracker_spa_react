import { useState } from "react";
import { useTranslation } from "react-i18next";
import Bug from "../../interfaces/Bug";

interface Props {
    bug: Bug | null | undefined;
    onBugUpdated: (updatedBug: Bug) => void
}

function BugProperties({ bug, onBugUpdated }: Props) {
    const { t } = useTranslation()

    const [editing, setEditing] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(bug != null ? bug.status : "")
    const [priority, setPriority] = useState<number>(bug != null ? bug.priority : 1)
    const [dueDate, setDueDate] = useState<Date | null>((bug != null && bug.due_date != null) ? bug.due_date : null)

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
            onBugUpdated(newBug)
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
            onBugUpdated(newBug)
        }
    }

    return (
        <>
        {
            editing ?
            <form className="bug-properties form description-wrapper" onSubmit={(e) => {e.preventDefault(); onChangesValidated()}}>
                <img className="edit-icon" onClick={() => onChangesValidated()} src="assets/ok.svg" />
                <img className="cancel-icon" onClick={() => setEditing(false)} src="assets/close.svg" />
                
                <div className="property form-group">
                    <span className="label">{t('bugPage.bugProperties.statusLabel')}</span>
                    <select className="value" value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">{t('bugPage.bugProperties.open')}</option>
                        <option value="close">{t('bugPage.bugProperties.close')}</option>
                    </select>
                </div>

                <div className="property form-group">
                    <span className="label">{t('bugPage.bugProperties.priorityLabel')}</span>
                    <input className="value" type="number" min={0}
                        value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
                </div>
                        
                <div className="dates">
                    <div className="property form-group">
                        <span className="label">{t('bugPage.bugProperties.startDateLabel')}</span>
                        <input disabled className="value" type="date"
                            value={(bug != null && bug.start_date != null) ? new Date(bug.start_date).toISOString().split("T")[0] : ""} />
                    </div>

                    <div className="property form-group">
                        <span className="label">{t('bugPage.bugProperties.dueDateLabel')}</span>
                        <input className="value" type="date"
                            value={(dueDate != null) ? new Date(dueDate).toISOString().split("T")[0] : ""}
                            onChange={(e) => setDate(e)} />
                    </div>

                    <div className="property form-group">
                        <span className="label">{t('bugPage.bugProperties.endDateLabel')}</span>
                        <input disabled className="value" type="date"
                            value={(bug != null && bug.end_date != null) ? new Date(bug.end_date).toISOString().split("T")[0] : ""} />
                    </div>
                </div>
            </form>
            :
            <div className="bug-properties description-wrapper">
                <img className="edit-icon" onClick={() => setEditing(true)} src="assets/edit.svg" />

                <div className="property">
                    <span className="label">{t('bugPage.bugProperties.statusLabel')}</span>
                    <span className="value">{bug?.status}</span>
                </div>

                <div className="property">
                    <span className="label">{t('bugPage.bugProperties.priorityLabel')}</span>
                    <span className="value">{bug?.priority}</span>
                </div>
                    
                <div className="dates">
                    <div className="property">
                        <span className="label">{t('bugPage.bugProperties.startDateLabel')}</span>
                        <span className="value">{bug != null && (bug.start_date == null ? "" : new Date(bug.start_date).toLocaleDateString())}</span>
                    </div>

                    <div className="property">
                        <span className="label">{t('bugPage.bugProperties.dueDateLabel')}</span>
                        <span className="value">{bug != null && (bug.due_date == null ? "" : new Date(bug.due_date).toLocaleDateString())}</span>
                    </div>

                    <div className="property">
                        <span className="label">{t('bugPage.bugProperties.endDateLabel')}</span>
                        <span className="value">{bug != null && (bug.end_date == null ? "" : new Date(bug.end_date).toLocaleDateString())}</span>
                    </div>
                </div>
                        
                <button onClick={() => switchStatus()}>{bug?.status === "open" ? t('bugPage.bugProperties.closeIssueButton') : t('bugPage.bugProperties.openIssueButton')}</button>
            </div>
        }
        </>
    );
}

export default BugProperties