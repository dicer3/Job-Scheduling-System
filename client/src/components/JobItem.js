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
           changeFunction("job aborted");  // if job was successfully aborted then display the success message
     });
    }
    const deleteCurrJob=async()=>{
        deleteJob(job).then((res)=>{  
          if(res!=="removed")
            changeFunction(res); // if job was not successfully deleted then display the error message
          else 
            changeFunction("job deleted"); // if job was successfully deleted then display the success message
       })
    }
    return(
      <div style={{"margin":"5px"}}>{job}{"  "}
      <button onClick={abortCurrjob}>Abort Job</button>{" "}
      <button onClick={deleteCurrJob}>Delete Job</button>
      <p>{!!changeStatus && changeStatus}</p>
      </div>
    )
}
export default JobItem;