import Project from "../../interfaces/Project"
import Bug from "../../interfaces/Bug"
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

const create = async (bug: Bug, projectId: number) => {
    let body: any = {
        title: bug.title,
        description: bug.description,
        priority: bug.priority,
        status: "open"
    }

    if(bug.due_date != null) body.due_date = bug.due_date

    console.log(body)

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

const bugService = {
    getProjectBugs,
    create
};

export default bugService;