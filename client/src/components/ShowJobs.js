import React,{useState} from 'react';
import {showCurrentJobs} from '../api/jobs';
import JobItem from './JobItem';

const ShowJobs=()=>{
    const [displayJobs,setDisplayJobs]=useState(false);
    const [allJobs,changeJobs]=useState([]);
    const disapperJobs=async()=>{
        setDisplayJobs(false);
    }
    const showCurrJobs=async()=>{
        console.log("in curr jobs");
        setDisplayJobs(true);
        const jobs = await showCurrentJobs();
        changeJobs(jobs);
    }
    return (
        <div>
            <button onClick={showCurrJobs}>show current jobs</button>
            <div>{displayJobs && allJobs.length===0 ? <p>No Jobs In Queue</p> :
             allJobs.map((job)=><JobItem key={job} job={job}  />)}</div>
        </div>
    )
}

export default ShowJobs;