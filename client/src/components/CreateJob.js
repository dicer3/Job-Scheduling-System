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
                setText("");
            }, 5000);
        } 
    });
    
    const makeNewJob=async()=>{
        const id = await createJob();
        setText(`job created with id ${id}`)
    }
    return (
        <div>
            <button onClick={makeNewJob}>Create Job</button>
            <p>{text}</p>
        </div>
    );
}

export default CreateNewJob;