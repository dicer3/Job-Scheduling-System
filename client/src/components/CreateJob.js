import React,{useState,useEffect,useRef} from 'react'; 
import {createJob} from '../api/jobs';
const CreateNewJob = () => {
    const [text, setText] = useState("");
    const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) 
        mounted.current = true; 
        else{
            setTimeout(() => {
                setText(""); // make error or success disapper after some time
            }, 5000);
        } 
    });

    const makeNewJob=async()=>{
        const {id,data} = await createJob();
        if(data!=="job created")
            setText(data); // if job was not successfully created then display the error message
        else  
            setText(`Job created with ID : ${id}`); // if job is successfully created then display a success message
    }
    return (
        <div>
            <button onClick={makeNewJob} className="button-style">Create Job</button>
            <p className="job-status">{text}</p>
        </div>
    );
}

export default CreateNewJob;