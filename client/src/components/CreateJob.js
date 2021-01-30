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
            setText(`job created with id ${id}`); // if job is successfully created then display a success message
    }
    return (
        <div>
            <button onClick={makeNewJob}>Create Job</button>
            <p>{text}</p>
        </div>
    );
}

export default CreateNewJob;