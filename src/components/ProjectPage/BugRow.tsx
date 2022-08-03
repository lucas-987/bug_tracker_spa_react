import { useNavigate } from "react-router";
import Bug from "../../interfaces/Bug";

interface Props {
    bug: Bug;
}

function BugRow({ bug }: Props) {
    const navigate = useNavigate();

    const onTitleClicked = () => {
        navigate(`/bug/${bug.id}`)
    }

    return (
        <div className="bugRow" key={bug.id}>
            <span className="bugTitle" onClick={onTitleClicked}>{bug.title}</span>
            <span className="bugPriority">{bug.priority}</span>
            <span className="bugStartDate">{bug.start_date == null ? "" : new Date(bug.start_date).toLocaleDateString()}</span>
            <span className="bugDueDate">{bug.due_date == null ? "" : new Date(bug.due_date).toLocaleDateString()}</span>
            <span className="bugActions"></span>
        </div>
    );
}

export default BugRow