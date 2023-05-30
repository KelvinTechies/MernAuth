import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'
import {apiSlice} from './Slices/apiSlice'
const Store = configureStore({
    reducer:{
        auth:AuthReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddlewware)=>getDefaultMiddlewware().concat(apiSlice.middleware),
    devTools:true
})

export default Store;