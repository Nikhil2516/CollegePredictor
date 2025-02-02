import { useState } from "react"
import {useAuthContext} from "./useAuthContext"


export const useLogin =() =>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async (email,password)=>{
        setIsLoading(true);
        setError(null);

        console.log("1");

        const response = await fetch('/api/user/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const json = await response.json()
        console.log("4")

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:"LOGIN",payload:json})
            console.log(5)
            setIsLoading(false)
        }   


    }

    return {login,isLoading,error}
}
