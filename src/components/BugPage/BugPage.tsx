import { useParams } from "react-router";
import Header from "../Header";

function BugPage() {
    let { id } = useParams();

    return (
        <div>
            <Header />

            <h1>Bug Page {id}</h1>
        </div>
    );
}

export default BugPage;