import React,{useState,useRef,useEffect} from "react";
import {abortJob,deleteJob,changeJob} from "../api/jobs";
const JobItem = ({job,showButtons}) => {
    const [changeStatus,changeFunction] = useState("");  
    const [priority,changePriority] = useState(-1);  
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
    const abortCurrjob=()=>{
     abortJob(job).then((res)=>{ 
       if(res!=="aborted")
           changeFunction(res); // if job was not successfully aborted then display the error message
       else 
           changeFunction("Job Aborted");  // if job was successfully aborted then display the success message
     });
    }
    const deleteCurrJob=()=>{
        deleteJob(job).then((res)=>{  
          if(res!=="removed")
            changeFunction(res); // if job was not successfully deleted then display the error message
          else 
            changeFunction("Job Deleted"); // if job was successfully deleted then display the success message
       })
    }
    const changeJobPriority=()=>{
      if(priority<=0)
      changeFunction("Assign Priority greator than zero");
      else{
        changeJob(job,priority).then((res)=>{  
        if(res!=="priority changed")
          changeFunction(res); // if job was not successfully deleted then display the error message
        else 
          changeFunction("Priority changed"); // if job was successfully deleted then display the success message
     });
      }
    }
    return(
      <div className="list-item">
        {showButtons ? <div>Waiting Job : <b>{job}</b></div> : <div>Running Job : <b>{job}</b></div> }
        <div className='job-functions'>
          <div>
            {showButtons && <button onClick={abortCurrjob} className="button-secondary">Abort Job</button> }
            {showButtons && <button onClick={deleteCurrJob} className="button-secondary">Delete Job</button> }
          </div>
          <div>
            {showButtons && <input type='number' onChange={(e)=>changePriority(e.target.value)} placeholder='Enter Priority'/> }
            {showButtons && <button onClick={changeJobPriority} className="button-secondary-plus"><b>Change Priority</b></button> }
          </div>           
        </div>
        {!!changeStatus && <div>{changeStatus}</div>}

      </div>  
    )
}
export default JobItem;