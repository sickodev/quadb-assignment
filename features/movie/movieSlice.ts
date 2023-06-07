import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: "movies",
    initialState: {
        title: "",
        summary: "",
        rating: "",
        runtime: "",
        image: "",
        genre: "",
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setSummary: (state, action) => {
            state.summary = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setRuntime: (state, action) => {
            state.runtime = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setGenres: (state, action) => {
            state.genre = action.payload;
        },
    },
});

export const {
    setTitle,
    setSummary,
    setRating,
    setRuntime,
    setGenres,
    setImage,
} = movieSlice.actions;
export default movieSlice.reducer;
