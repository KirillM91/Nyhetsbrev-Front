import axios from "axios";
import { INewUser } from "../Models/INewUser";

export function postUser (newUser: INewUser) {

    axios.post("http://localhost:3001/users/newuser",
    newUser,
    {headers: {"content-type": "application/json"}}    
    )
    .then(() => {
        console.log("success!");        
    })
    .catch(error => {
        console.log(error);        
    })
    
}