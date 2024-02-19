import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../api/config';

export const userLogin = createAsyncThunk('auth/token', async ({ email, password }, { rejectWithValue }) => {
    try { // configure header's Content-Type as JSON
        const config = {
            headers: {
                Authorization: 'Bearer',
            }
        };

        const { data } = await BASE_API.post('/users/login/', {
            email: email,
            password: password
        }, config);

        return data;
    } catch (error) { // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ statusCode: error.response.status, message: error.response.message });
        }
    }
});