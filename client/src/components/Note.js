import React from 'react';
const Note=()=>{
   return(
       <div className="list">
           <div className="list-header">Note</div>
           <div className="single-item">
           There are two tables first one shows executing jobs by worker threads and second table represents Queue of waiting jobs .
           Each Job has a priority in waiting queue . jobs coming up in the table have a greator priority and will be executed by worker threads first
           jobs can aborted and deleted and thier priority can be changed . someone will not able to abort , delete or change priority of running job
           </div>
       </div>
   )
}
export default Note;