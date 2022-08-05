import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Bug from '../../interfaces/Bug';
import Project from '../../interfaces/Project';
import bugService from './bugService';
import projectService, { Result } from './projectService';

const RESULT_MESSAGE_SUCCESS_NO_DATA = "Succesfull result with no data";

export interface ProjectState {
    projects: Project[];
    selectedProject: Project | null;
    selectedBug: Bug | null;
};

const initialState: ProjectState = {
    projects: [],
    selectedProject: null,
    selectedBug: null
}

/***** Projects async thunk **/

export const getAllProjects = createAsyncThunk(
    "project/getAll",
    async () => {
        try {
            return await projectService.getAll();

        } catch(e) {
            console.log("getAllProject Async thunk error");
            console.log(e);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const deleteProject = createAsyncThunk(
    "project/delete",
    async (id: number) => {
        try {
            return await projectService.deleteById(id);

        } catch(e) {
            console.log("deleteProject Async thunk error");
            console.log(e);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
);

export const createProject = createAsyncThunk(
    "project/create",
    async (project: Project) => {
        try {
            return await projectService.create(project);

        } catch (error) {
            console.log("createProject Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const updateProject = createAsyncThunk(
    "project/update",
    async (project: Project) => {
        try {
            return await projectService.update(project);

        } catch (error) {
            console.log("updateProject Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

/*** Bugs async thunk */

export const getProjectBugs = createAsyncThunk(
    "project/bugs/get",
    async (projectId: number, thunkAPI) => {
        try{
            thunkAPI.dispatch(selectProject(projectId));
            return await bugService.getProjectBugs(projectId);

        } catch (error) {
            console.log("getProjectBugs Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const getBugById = createAsyncThunk/*<Result, number, {state: ProjectState}>*/(
    "project/bugs/getById",
    async (bugId: number, {dispatch, getState}) => {
        let result: Result;
        try {
            dispatch(selectBug(bugId));
            const state = getState() as ProjectState;
            if(state.selectedBug == null) {
                return await bugService.getById(bugId);
            }
            else {
                result = {
                    success: true,
                    message: RESULT_MESSAGE_SUCCESS_NO_DATA
                }
                return result
            }

        } catch (error) {
            console.log("getBugById Async thunk error");
            console.log(error);
        }

        result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export interface BugAsyncThunkParams {
    projectId?: number;
    bugId?: number;
    bug?: Bug;
}
export const createBug = createAsyncThunk(
    "project/bugs/create",
    async ({projectId, bug}: BugAsyncThunkParams) => {
        try{
            return await bugService.create(bug!, projectId!)

        } catch (error) {
            console.log("getProjectBugs Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const updateBug = createAsyncThunk(
    "project/bugs/update",
    async (bug: Bug) => {
        try{
            return await bugService.update(bug);

        } catch (error) {
            console.log("getProjectBugs Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const deleteBug = createAsyncThunk(
    "project/bugs/delete",
    async (bugId: number) => {
        try{
            

        } catch (error) {
            console.log("getProjectBugs Async thunk error");
            console.log(error);
        }

        const result: Result = {
            success: false,
            message: "Unknown error"
        };
        return result;
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        selectProject(state, action: PayloadAction<number>) {
            const projectId = action.payload;
            const project = state.projects.find((project: Project) => project.id === projectId);
            state.selectedProject = project === undefined ? null : project;
        },

        selectBug(state, action: PayloadAction<number>) {
            const bugId = action.payload;
            const bug = state.selectedProject?.bugs?.find((bug: Bug) => bug.id === bugId);
            state.selectedBug = bug === undefined ? null : bug;
        }
    },
    extraReducers: (builder) => {
        builder
        /** Projects */
        .addCase(getAllProjects.pending, (state, action) => {
            console.log("getAllProjects.pending");
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) state.projects = result.data;
        })
        .addCase(getAllProjects.rejected, (state, action) => {
            console.log("getAllProjects.rejected");
        })

        .addCase(deleteProject.pending, (state, action) => {
            console.log("deleteProject.pending");
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) state.projects = state.projects.filter((project) => project.id != result.data);
        })
        .addCase(deleteProject.rejected, (state, action) => {
            console.log("deleteProject.rejected");
        })

        .addCase(createProject.pending, (state, action) => {
            console.log("createProject.pending");
        })
        .addCase(createProject.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) state.projects = [...state.projects, result.data];
        })
        .addCase(createProject.rejected, (state, action) => {
            console.log("createProject.rejected");
        })

        .addCase(updateProject.pending, (state, action) => {
            console.log("updateProject.pending");
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) {
                
                const data = result.data as Project
                state.projects = state.projects.map((project) => {
                    if(project.id === data.id) {
                        project.title = data.title
                        if(data.description != undefined) project.description = data.description
                    }

                    return project
                })

                const currentProject = state.selectedProject
                if(currentProject != null && currentProject.id == data.id ) {
                    state.selectedProject!.title = result.data.title
                    if(data.description != undefined) state.selectedProject!.description = data.description
                }
            }
        })
        .addCase(updateProject.rejected, (state, action) => {
            console.log("updateProject.rejected");
        })

        /** Bugs */
        .addCase(getProjectBugs.pending, (state, action) => {
            console.log("getProjectBugs.pending");
        })
        .addCase(getProjectBugs.fulfilled, (state, action) => {
            const result: Result = action.payload

            if(result.success) state.selectedProject!.bugs = result.data;
        })
        .addCase(getProjectBugs.rejected, (state, action) => {
            console.log("getProjectBugs.rejected");
        })

        .addCase(getBugById.pending, (state, action) => {
            console.log("getBugById.pending");
        })
        .addCase(getBugById.fulfilled, (state, action) => {
            const result: Result = action.payload

            if(result.success) {
                if(result.message == undefined || result.message !== RESULT_MESSAGE_SUCCESS_NO_DATA) {
                    state.selectedBug = result.data
                }
            }
        })
        .addCase(getBugById.rejected, (state, action) => {
            console.log("getBugById.rejected");
        })

        .addCase(createBug.pending, (state, action) => {
            console.log("createBug.pending");
        })
        .addCase(createBug.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) state.selectedProject!.bugs = [...(state.selectedProject!.bugs as Bug[]), result.data];
        })
        .addCase(createBug.rejected, (state, action) => {
            console.log("createBug.rejected");
        })

        .addCase(updateBug.pending, (state, action) => {
            console.log("updateBug.pending");
        })
        .addCase(updateBug.fulfilled, (state, action) => {
            const result: Result = action.payload;

            if(result.success) {
                const data = result.data as any

                const bugIndex = state.selectedProject?.bugs?.findIndex((bug) => {
                    return bug.id === data.id
                })

                const currentBug = state.selectedBug

                if(bugIndex != null && bugIndex != -1) {
                    const oldBug: Bug = state.selectedProject!.bugs![bugIndex]
                    let updatedBug = {...oldBug}

                    if("title" in data && data.title != undefined) updatedBug.title = data.title
                    if("description" in data && data.description != undefined) updatedBug.description = data.description
                    if("priority" in data && data.priority != undefined) updatedBug.priority = data.priority
                    if("status" in data && data.status != undefined) updatedBug.status = data.status
                    if("due_date" in data && data.due_date != undefined) updatedBug.due_date = data.due_date
                    if("end_date" in data && data.end_date != undefined) updatedBug.end_date = data.end_date

                    state.selectedProject!.bugs![bugIndex] = updatedBug

                    if(currentBug != null && currentBug.id == data.id) {
                        state.selectedBug = updatedBug;
                    }
                }
                else {
                    if(currentBug != null && currentBug.id == data.id) {
                        if("title" in data && data.title != undefined) state.selectedBug!.title = data.title
                        if("description" in data && data.description != undefined) state.selectedBug!.description = data.description
                        if("priority" in data && data.priority != undefined) state.selectedBug!.priority = data.priority
                        if("status" in data && data.status != undefined) state.selectedBug!.status = data.status
                        if("due_date" in data && data.due_date != undefined) state.selectedBug!.due_date = data.due_date
                        if("end_date" in data && data.end_date != undefined) state.selectedBug!.end_date = data.end_date
                    }
                }
            }
        })
        .addCase(updateBug.rejected, (state, action) => {
            console.log("updateBug.rejected");
        })

        .addCase(deleteBug.pending, (state, action) => {
            console.log("deleteBug.pending");
        })
        .addCase(deleteBug.fulfilled, (state, action) => {
            
        })
        .addCase(deleteBug.rejected, (state, action) => {
            console.log("deleteBug.rejected");
        })
    }
})

export const { selectProject, selectBug } = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectCurrentProject = (state: RootState) => state.project.selectedProject;
export const selectCurrentBug = (state: RootState) => state.project.selectedBug;

export default projectSlice.reducer;