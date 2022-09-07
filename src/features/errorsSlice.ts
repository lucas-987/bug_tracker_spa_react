import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import Error from "../interfaces/Error"
import { v4 as uuid } from "uuid" 

export interface ErrorsState {
    errors: Error[]
}

const initialState: ErrorsState = {
    errors: []
}

export const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        addError(state, action: PayloadAction<Error>) {
            let newError = {
                ...action.payload
            }
            newError.id = uuid()
            state.errors = [newError, ...state.errors];
        },

        removeError(state, action: PayloadAction<string>) {
            state.errors = state.errors.filter(error => error.id !== action.payload)
        }
    }
})

export const { addError, removeError } = errorsSlice.actions

export const selectErrors = (state: RootState) => state.errors.errors

export default errorsSlice.reducer