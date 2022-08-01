import { useParams } from "react-router";

function BugPage() {
    let { id } = useParams();

    return (
        <div>
            <h1>Bug Page {id}</h1>
        </div>
    );
}

export default BugPage;