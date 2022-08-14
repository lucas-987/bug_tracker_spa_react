import { Filters } from "./BugsTable"

interface Props {
    filter: Filters;
    changeFilter: (newFilter: Filters) => void;
    addNewBug: () => void;
}

const TITLE = "Title"
const PRIORITY = "Priority"
const START_DATE = "Start date"
const DUE_DATE = "Due date"
const END_DATE = "End date"
const OPEN = "open"
const CLOSE = "close"

function BugsTableHeader({ addNewBug, filter, changeFilter }: Props) {
    return (
        <header className="bugsTableHeader">
            <span className="headerTitle">{TITLE}</span>
            <span className="headerPriority">{PRIORITY}</span>
            <span className="headerStartDate">{START_DATE}</span>
            <span className="headerDueDate">{DUE_DATE}</span>
            <span className="headerActions">
                <a className={filter == "open" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("open")}>{OPEN}</a>
                <a className={filter == "close" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("close")}>{CLOSE}</a>
                <img className="addIcon" draggable="false" src="assets/plus.svg"
                    onClick={addNewBug} />
            </span>
        </header>
    );
}

export default BugsTableHeader