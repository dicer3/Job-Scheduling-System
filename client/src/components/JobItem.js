import React,{useState,useRef,useEffect} from "react";
import {abortJob,deleteJob} from "../api/jobs";
const JobItem = ({job}) => {
    const [changeStatus,changeFunction] = useState("");  
    const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) 
        mounted.current = true; 
        else{
            setTimeout(() => {
                changeFunction(""); // make error or success disapper after some time
            }, 2000);
        } 
    });
    const abortCurrjob=async()=>{
     abortJob(job).then((res)=>{ 
       if(res!=="aborted")
           changeFunction(res); // if job was not successfully aborted then display the error message
       else 
           changeFunction("Job Aborted");  // if job was successfully aborted then display the success message
     });
    }
    const deleteCurrJob=async()=>{
        deleteJob(job).then((res)=>{  
          if(res!=="removed")
            changeFunction(res); // if job was not successfully deleted then display the error message
          else 
            changeFunction("Job Deleted"); // if job was successfully deleted then display the success message
       })
    }
    return(
      <div className="list-item">
        <div>Running Job : <b>{job}</b></div>
        <div>
            <button onClick={abortCurrjob} className="button-secondary">Abort Job</button>
            <button onClick={deleteCurrJob} className="button-secondary">Delete Job</button>
            <p>{!!changeStatus && changeStatus}</p>
        </div>

      </div>  
    )
}
export default JobItem;