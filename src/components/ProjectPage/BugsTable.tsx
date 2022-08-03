import Bug from "../../interfaces/Bug";
import BugRow from "./BugRow";
import BugsTableHeader from "./BugsTableHeader";

interface Props {
    bugs: Bug[];
    addNewBug: () => void;
}

function BugsTable({ bugs, addNewBug }: Props) {
    return (
        <div className="bugsTable">
            <BugsTableHeader addNewBug={addNewBug} />

            {bugs.map((bug, i) => 
                <BugRow bug={bug} key={bug.id} />
            )}
        </div>
    );
}

export default BugsTable