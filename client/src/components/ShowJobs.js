import React,{useState} from 'react';
import {showCurrentJobs} from '../api/jobs';
import JobItem from './JobItem';

const ShowJobs=()=>{
    const [displayJobs,setDisplayJobs]=useState(false); // boolean for displaying jobs
    const [allJobs,changeJobs]=useState([]); // all jobs variable 
    const showCurrJobs=async(e)=>{
        setDisplayJobs(true); // make boolean for displaying jobs true
        const jobs = await showCurrentJobs(); 
        changeJobs(jobs); // change the current jobs from what was recieved from backend
    }
    return (
        <div>
            <button onClick={showCurrJobs}>show current jobs</button>
            <div>{displayJobs && allJobs.length===0 ? <p>No Jobs In Queue</p> :
             allJobs.map((job)=><JobItem key={job} job={job} />)}</div>
        </div>
    )
}

export default ShowJobs;