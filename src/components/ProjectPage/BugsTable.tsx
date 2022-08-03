import { useState } from "react";
import Bug from "../../interfaces/Bug";
import BugRow from "./BugRow";
import BugsTableHeader from "./BugsTableHeader";

interface Props {
    bugs: Bug[];
    addNewBug: () => void;
}

export type Filters = "open" | "close" | "none"

function BugsTable({ bugs, addNewBug }: Props) {
    const [filter, setFilter] = useState<Filters>("open")

    const filterBugs = (bug: Bug) => {
        switch(filter) {
            case "none":
                return bug;
            case "open":
                if(bug.status == "open") return bug;
                break;
            case "close":
                if(bug.status == "close") return bug;
                break;  
        }
    }

    return (
        <div className="bugsTable">
            <BugsTableHeader addNewBug={addNewBug} filter={filter} changeFilter={(newFilter) => setFilter(newFilter)} />

            {bugs.filter(filterBugs).map((bug, i) => 
                <BugRow bug={bug} key={bug.id} />
            )}
        </div>
    );
}

export default BugsTable