
import {useMutation} from "@tanstack/react-query";
import { signIn,signUp } from "../service";
import { SignIn,SignUp } from "../types";
import { saveAccessToken } from "../../../utils/token-service";
import { Notification } from "../../../utils/notification";

export function useSignInMutation(){
    return useMutation({
        mutationFn: async (data: SignIn) => {
            const response = await signIn(data);
            if (response.status !== 201) {
                Notification('error', 'Sign In Failed', 'Please check your credentials.');
                throw new Error('Sign in failed');
            }
            return response;
        },
        onSuccess: (response) => {
            const { access_token } = response.data.data.tokens;
            saveAccessToken(access_token);
            Notification('success', 'Sign In Successful', 'Welcome back!');
            setTimeout(() => {
                window.location.href = '/admin-layout'; // Check this path
            }, 1000);
        },
        onError: (error) => {
            console.error('Sign in error:', error); // More detailed logging
            Notification('error', error.message);
        },
    });
}


export function useSignUpMutation(){
    return useMutation({
        mutationFn:async (data:SignUp) => {
            const response = await signUp(data);
            if(response.status !== 201) {
                const errorMessage = response.data?.message || 'Registration failed'
                Notification('error', 'Sign Up Failed', 'Please check your credentials.');
                throw new Error(errorMessage);
            }
            return response
        },
        onSuccess: () => {
            console.log('Sign-up successful, showing notification');
            Notification('success', 'Sign Up Successful', 'Welcome back!');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        },
        
        onError: (error) => {
            console.log('Sign-up error:', error);
            Notification('error', error.message);
        },
        
    
    })
}