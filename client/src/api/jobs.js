import axios from "axios"; 
import { v4 as uuidv4 } from 'uuid';

// sending request to backend for creating a new job 
export const createJob = async() =>{
   try{ 
        let id = uuidv4(); // creating a unique id for each job using uuid library
        id=id.slice(0,4); // making id little shorter
        const res = await axios.post(`/api/createjob/${id}`);
        return {id,data:res.data};
   }catch(err){
      console.log(err.response.statusText);
   }
}

// sending request to backend for showing the current status of jobs
export const showCurrentJobs = async() =>{
    try{ 
        const res = await axios.get(`/api/showalljobs`);
        return res.data;
    }catch(err){
        console.log(err.response.statusText);
    }
}

// sending request to backend for changing priority of a job
export const changeJob = async(id,priority) => {
    try{ 
        const res = await axios.put(`/api/changePriority/${id}/${priority}`);
        return res.data;
    }catch(err){
        console.log(err.response.statusText);
     }
}

// sending request to backend for aborting a job
export const abortJob = async(id) => {
    try{ 
        const res = await axios.put(`/api/abort/${id}`);
        return res.data;
    }catch(err){
        console.log(err.response.statusText);
     }
}

// sending request to backend for deleting a job
export const deleteJob = async(id) => {
    try{   
       const res = await axios.delete(`/api/remove/${id}`);
       return res.data;
    }catch(err){
        console.log(err.response.statusText);
    }   
}