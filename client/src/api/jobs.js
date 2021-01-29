import axios from "axios"; 
import { v4 as uuidv4 } from 'uuid';

export const createJob = async() =>{
   let id = uuidv4();
   id=id.slice(0,4); 
   await axios.get(`/api/createjob/${id}`);
   return id;
}

export const showCurrentJobs = async() =>{
    const res = await axios.post(`/api/showalljobs`);
    console.log("res ",res.data);
    return res.data;
}

export const abortJob = async(id) => {
    const res = await axios.get(`/api/abort/${id}`);
}

export const deleteJob = async(id) => {
    const res = await axios.get(`/api/remove/${id}`);
}