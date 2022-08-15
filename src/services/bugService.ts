import Bug from "../interfaces/Bug"
import { Result } from "./projectService"

const API_URL = "http://localhost:3000/api/";
const PROJECT_API_URL = API_URL + "project/";
const BUG_API_URL = API_URL + "bug/";

const headers = {
    'Content-Type': 'application/json'
}

const getProjectBugs = async (projectId: number) => {
    const response = await fetch(PROJECT_API_URL + `${projectId}/` + "bug", {
        headers
    });

    let result: Result;

    switch(response.status) {
        case 200:
            result = {
                success: true,
                data: await response.json()
            };
            break;
        case 400:
            result = {
                success: false,
                message: (await response.json()).message
            };
            break;
        case 404:
            result = {
                success: false,
                message: "Project not found"
            };
            break;
        case 500:
            result = {
                success: false,
                message: "Internal server error"
            };
            break;
        default:
            result = {
                success: false,
                message: "Unknown error"
            }
            break;
    }

    return result;
}

const getById = async (bugId: number) => {
    const response = await fetch(BUG_API_URL + `${bugId}`, {
        headers
    });

    let result: Result;

    switch(response.status) {
        case 200:
            result = {
                success: true,
                data: await response.json()
            };
            break;
        case 400:
            result = {
                success: false,
                message: (await response.json()).message
            };
            break;
        case 404:
            result = {
                success: false,
                message: "Bug not found"
            };
            break;
        case 500:
            result = {
                success: false,
                message: "Internal server error"
            };
            break;
        default:
            result = {
                success: false,
                message: "Unknown error"
            }
            break;
    }

    return result;
}

const create = async (bug: Bug, projectId: number) => {
    let body: any = {
        title: bug.title,
        description: bug.description,
        priority: bug.priority,
        status: "open"
    }

    if(bug.due_date != null) body.due_date = bug.due_date

    const response = await fetch(PROJECT_API_URL + `${projectId}/` + "bug", {
        headers,
        method: "POST",
        body: JSON.stringify(body)
    })

    let result: Result

    switch(response.status) {
        case 200:
            let data = await response.json();
            delete data['project'];
            result = {
                success: true,
                data: data
            };
            break;
        case 404:
            result = {
                success: false,
                message: "Project not found"
            }
            break;
        case 400:
            result = {
                success: false,
                message: (await response.json()).message
            };
            break;
        case 500:
            result = {
                success: false,
                message: "Internal server error"
            };
            break;
        default:
            result = {
                success: false,
                message: "Unknown error"
            }
            break;
    }

    return result;
}

/*
    use the following values to unset required fields :
        priority: -1
        status: ""
        title: ""

    it is important that id of bug is valid
*/
const update = async (bug: Bug) => {
    let body: any = {
    }

    if(bug.title) body.title = bug.title;
    if(bug.description != null) body.description = bug.description
    if(bug.priority >= 0) body.priority = bug.priority
    if(bug.status) body.status = bug.status
    if(bug.due_date != null) body.due_date = bug.due_date
    if(bug.end_date != null) body.due_date = bug.due_date

    const response = await fetch(BUG_API_URL + `${bug.id}`, {
        headers,
        method: "PUT",
        body: JSON.stringify(body)
    })

    let result: Result

    switch(response.status) {
        case 200:
            body.id = bug.id
            result = {
                success: true,
                data: body
            };
            break;
        case 404:
            result = {
                success: false,
                message: "Bug not found"
            }
            break;
        case 400:
            result = {
                success: false,
                message: (await response.json()).message
            };
            break;
        case 500:
            result = {
                success: false,
                message: "Internal server error"
            };
            break;
        default:
            result = {
                success: false,
                message: "Unknown error"
            }
            break;
    }

    return result;
}

const bugService = {
    getProjectBugs,
    getById,
    create,
    update
};

export default bugService;