import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin } from './auth-actions'

const initialState = {
    isAuth: false,
    loading: false,
    token: "",
    error: "",
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeStatusCode(state) {
            state.statusCode = null
        },
        logout(state) {
            state.isAuth = false
            state.token = ""
            state.error = ""
            state.statusCode = null
        }
    },
    extraReducers: (builder) => { // login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.isAuth = true
            state.loading = false
            state.token = payload.token
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.isAuth = false
            state.error = payload.message
            state.loading = false
            state.token = ""
        })
    }
})

export const { changeStatusCode, logout } = auth.actions
export default auth.reducer