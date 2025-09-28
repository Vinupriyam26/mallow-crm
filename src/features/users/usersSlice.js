import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1, { rejectWithValue }) => {
    try {
        const res = await api.get('/users', { params: { page } });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const createUser = createAsyncThunk('users/createUser', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/users', payload);
        return { ...payload, id: res.data.id || Date.now() };
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});


export const updateUser = createAsyncThunk('users/updateUser', async ({ id, payload }, { getState, rejectWithValue }) => {
    try {
        await api.put(`/users/${id}`, payload);
        const oldUser = getState().users.list.find(u => u.id === id);
        return { ...oldUser, ...payload, id };
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});



export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/users/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});


const usersSlice = createSlice({
    name: 'users',
    initialState: { list: [], status: 'idle', error: null, meta: {} },
    reducers: {
        setList(state, action) { state.list = action.payload; }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => { state.status = 'loading'; state.error = null; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meta = { page: action.payload.page, total: action.payload.total, total_pages: action.payload.total_pages };
                state.list = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || action.error.message; })
            .addCase(createUser.fulfilled, (state, action) => { state.list.unshift(action.payload); })
            .addCase(updateUser.fulfilled, (state, action) => {
                const i = state.list.findIndex(u => u.id === action.payload.id);
                if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
            })
            .addCase(deleteUser.fulfilled, (state, action) => { state.list = state.list.filter(u => u.id !== action.payload); });
    }
});


export const { setList } = usersSlice.actions;
export default usersSlice.reducer;