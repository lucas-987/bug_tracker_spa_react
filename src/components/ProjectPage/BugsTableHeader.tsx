interface Props {
    addNewBug: () => void;
}

function BugsTableHeader({ addNewBug }: Props) {
    return (
        <header className="bugsTableHeader">
            <span className="headerTitle">Title</span>
            <span className="headerPriority">priority</span>
            <span className="headerStartDate">start date</span>
            <span className="headerDueDate">due date</span>
            <span className="headerActions">
                <a>open</a>
                <a>close</a>
                <img className="addIcon" draggable="false" src="assets/plus.svg"
                    onClick={addNewBug} />
            </span>
        </header>
    );
}

export default BugsTableHeader