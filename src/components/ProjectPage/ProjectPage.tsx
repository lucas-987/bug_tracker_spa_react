import { useParams } from "react-router";

function ProjectPage() {
    let { id } = useParams();

    return (
        <div>
            <h1>Project Page { id }</h1>
        </div>
    );
}

export default ProjectPage;