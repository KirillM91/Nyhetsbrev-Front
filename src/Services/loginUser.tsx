import axios from "axios";
import { IUser } from "../Models/IUser";
import { IUserLogin } from "../Models/IUserLogin";

export function loginUser (loginUser: IUserLogin) { 
    

    axios.post("http://localhost:3001/users/login",
    loginUser,
    {headers: {"content-type": "application/json"}}    
    )
    .then((response) => {        
        console.log(response.data);               
    })
    .catch(error => {
        console.log(error);        
    })        
    
    
}