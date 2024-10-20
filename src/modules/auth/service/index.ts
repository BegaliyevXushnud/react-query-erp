
import axiosInstance from "@api";
import { SignIn,SignUp } from "../types";


// ======== Auth Sign-in ========
export function signIn(data:SignIn){
    return axiosInstance.post("/auth/sign-in",data)
}

// ======== Auth Sign-Up ==========
export function signUp (data:SignUp){
    return axiosInstance.post("/auth/user/sign-up",data)
}