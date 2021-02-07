import React,{useState} from 'react';
import {showCurrentJobs} from '../api/jobs';
import JobItem from './JobItem';

const ShowJobs=()=>{
    const [displayJobs,setDisplayJobs]=useState(false); // boolean for displaying jobs
    const [execJobs,changeExecJobs]=useState([]); // all jobs variable 
    const [waitingJobs,changeWaitingJobs]=useState([]); // all jobs variable 
    const showCurrJobs=async(e)=>{
        setDisplayJobs(true); // make boolean for displaying jobs true
        const jobs = await showCurrentJobs(); 
        changeExecJobs(jobs.runningJobs); // change the current jobs from what was recieved from backend
        changeWaitingJobs(jobs.jobsInQueue); 
    }
    return (
        <div>
            <button onClick={showCurrJobs} className="button-style">Show Current Jobs</button>

            <div className="list">
                {displayJobs && <div className="list-header">Running Jobs </div>}
                {displayJobs && execJobs.length===0 ? <div className="single-item">No Running Jobs</div> :
                execJobs.map((job)=><JobItem key={job} job={job} showButtons={false} />)}
            </div>

            <div className="list">
                {displayJobs && <div className="list-header">Waiting Jobs </div>}
                {displayJobs && waitingJobs.length===0 ? <div className="single-item">No Jobs In Waiting Queue</div> :
                waitingJobs.map((job)=><JobItem key={job} job={job} showButtons={true} />)}
             </div>
        </div>
    )
}

export default ShowJobs;