import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    token: '',
    profile: {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        createdAt: '',
        updatedAt: '',
        id: ''
    }
}

export const logIn = createAsyncThunk('user/logIn',
    async (userData) => { 
        try {
            const res = await Axios.post('http://localhost:3001/api/v1/user/login', userData);
            const token = res.data.body.token;

            try {
                const resProfile = await Axios.post('http://localhost:3001/api/v1/user/profile', null, {headers: {'Authorization': 'Bearer'+ token}});
                return {'token': token, 'profile': resProfile.data.body};
            } catch(e) {
                console.error(e);
            }

        } catch(e) {
            console.error(e);
        }
    }
);

export const setUserName = createAsyncThunk('user/setUserName',
    async (userData) => {
        const body = {'userName': userData.userName};
        const headers = {headers: {
            'Authorization': 'Bearer'+ userData.token,
            'Content-Type': 'application/json'
        }};
        try {
            const res = await Axios.put('http://localhost:3001/api/v1/user/profile', body, headers);
            return res.data.body.userName;
        } catch(e) {
            console.error(e);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        resetState: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.profile = action.payload.profile;
            })
            .addCase(setUserName.fulfilled, (state, action) => {
                state.profile.userName = action.payload;
            })
    }
})

export const { resetState } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;