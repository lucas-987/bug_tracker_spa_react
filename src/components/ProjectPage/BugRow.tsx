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
        <div className="bugs-table__row" key={bug.id}>
            <span className="bugs-table__row__title" onClick={onTitleClicked}>{bug.title}</span>
            <span className="bugs-table__row__priority">{bug.priority}</span>
            <span className="bugs-table__row__start-date">{bug.start_date == null ? "" : new Date(bug.start_date).toLocaleDateString()}</span>
            <span className="bugs-table__row__due-date">{bug.due_date == null ? "" : new Date(bug.due_date).toLocaleDateString()}</span>
            <span className="bugs-table__row__actions"></span>
        </div>
    );
}

export default BugRow