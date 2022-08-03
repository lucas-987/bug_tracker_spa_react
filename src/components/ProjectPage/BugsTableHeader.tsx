import { Filters } from "./BugsTable"

interface Props {
    filter: Filters;
    changeFilter: (newFilter: Filters) => void;
    addNewBug: () => void;
}

function BugsTableHeader({ addNewBug, filter, changeFilter }: Props) {
    return (
        <header className="bugsTableHeader">
            <span className="headerTitle">Title</span>
            <span className="headerPriority">priority</span>
            <span className="headerStartDate">start date</span>
            <span className="headerDueDate">due date</span>
            <span className="headerActions">
                <a className={filter == "open" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("open")}>open</a>
                <a className={filter == "close" ? "filterSelected" : "filter"}
                    onClick={() => changeFilter("close")}>close</a>
                <img className="addIcon" draggable="false" src="assets/plus.svg"
                    onClick={addNewBug} />
            </span>
        </header>
    );
}

export default BugsTableHeader