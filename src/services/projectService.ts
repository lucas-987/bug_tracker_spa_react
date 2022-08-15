import Project from "../interfaces/Project";

const API_URL = "http://localhost:3000/api/project/";

const headers = {
    'Content-Type': 'application/json'
}

export interface Result {
    success: boolean;
    data?: any;
    message?: string;
}

const getAll = async () => {

    const response = await fetch(API_URL, { headers });

    let result: Result;

    switch(response.status) {
        case 200:
            result =  {
                success: true,
                data: await response.json()
            };
            break;
        case  500:
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

const getById = async (projectId: number) => {
    const response = await fetch(API_URL + `${projectId}`, {
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

const deleteById = async (id: number) => {
    const response = await fetch(API_URL + `${id}`, {
        headers,
        method: "DELETE"
    });

    let result: Result;

    switch(response.status) {
        case 200:
            result = {
                success: true,
                data: id
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

const create = async (project: Project) => {
    const body = {
        title: project.title,
        description: project.description
    }

    const response = await fetch(API_URL, {
        headers,
        method: "POST",
        body: JSON.stringify(body)
    })

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

const update = async (project: Project) => {
    let body: any = {
        title: project.title
    }

    if(project.description !== undefined) body.description = project.description

    const response = await fetch(API_URL + `${project.id}`, {
        headers,
        method: "PUT",
        body: JSON.stringify(body)
    })

    let result: Result;

    switch(response.status) {
        case 200:
            result = {
                success: true,
                data: project
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

const projectService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

export default projectService;