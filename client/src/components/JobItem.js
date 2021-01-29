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
                changeFunction("");
            }, 2000);
        } 
    });
    const abortCurrjob=async()=>{
     abortJob(job).then(()=>{
       changeFunction("job aborted");
     });
    }
    const deleteCurrJob=async()=>{
        deleteJob(job).then(async()=>{
            changeFunction("job deleted");
       });
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