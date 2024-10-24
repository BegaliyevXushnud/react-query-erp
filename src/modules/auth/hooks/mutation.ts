import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../service";
import { SignIn, SignUp } from "../types";
import { saveAccessToken } from "../../../utils/token-service";
import { Notification } from "../../../utils/notification";
import { useNavigate } from "react-router-dom"; 

export function useSignInMutation() {
    const navigate = useNavigate(); 

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
            const { access_token } = response.data?.data?.tokens || {};
            if (access_token) {
                saveAccessToken(access_token);
                setTimeout(() => {
                    navigate("/admin-layout");
                    Notification('success', 'Sign In Successful', 'Welcome back!');
                }, 1000);
            } else {
                Notification('error', 'Invalid Response', 'No access token found.');
            }
        },
        onError: (error) => {
            console.error('Sign in error:', error);
            Notification('error', error.message || 'Sign in failed.');
        },
    });
}

export function useSignUpMutation() {
    const navigate = useNavigate(); 

    return useMutation({
        mutationFn: async (data: SignUp) => {
            const response = await signUp(data);
            if (response.status !== 201) {
                const errorMessage = response.data?.message || 'Registration failed';
                Notification('error', 'Sign Up Failed', 'Please check your credentials.');
                throw new Error(errorMessage);
            }
            return response;
        },
        onSuccess: () => {
            Notification('success', 'Sign Up Successful', 'Welcome!');
            setTimeout(() => {
                navigate('/'); // navigate'ni to'g'ri joyda chaqiring
            }, 2000);
        },
        onError: (error) => {
            console.error('Sign-up error:', error);
            Notification('error', error.message || 'Sign up failed.');
        },
    });
}
