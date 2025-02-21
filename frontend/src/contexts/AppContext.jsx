import React, {useContext} from "react";
import {useQuery} from 'react-query';
import * as apiClient from '../api-client.js';
import {loadStripe} from '@stripe/stripe-js';
const AppContext = React.createContext(undefined)
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({children}) => {
      
    const {isError} = useQuery("validateToken", apiClient.validateToken, {retry: false,})
    return (
        <AppContext.Provider value = {
           { // {showToast: (toastMessage) => 
            //    console.log(toastMessage)
              isLoggedIn: !isError,
              stripePromise,
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}