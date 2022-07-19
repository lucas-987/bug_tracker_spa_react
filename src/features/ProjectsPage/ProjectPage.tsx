import CreateProject from "./CreateProject";
import Project from "./Project";

const projects = [
    {
        id: 1,
        title: "Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, laudantium?"
    },
    {
        id: 2,
        title: "Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, laudantium?"
    },
    {
        id: 3,
        title: "Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, laudantium?"
    },
];

function ProjectsPage() {
    return (
        <div className="grid">

            <CreateProject />

            {projects.map((project, i) => 
                <Project key={project.id} project={project} />
            )}

        </div>
    );
}

export default ProjectsPage;