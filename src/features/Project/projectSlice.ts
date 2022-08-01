import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Project from '../../interfaces/Project';
import projectService, { Result } from './projectService';

export interface ProjectState {
    projects: Project[]
};

const initialState: ProjectState = {
    projects: []
}

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

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
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
    }
})

export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;