import React from 'react';
const Note=()=>{
   return(
       <div className="list">
           <div className="list-header">Note</div>
           <div className="single-item">
           The Above Table shows Jobs in Process which are processed in Queue . Each Job takes 20 seconds to process 
           the jobs above in the table will be executed first then the later . jobs can aborted and deleted .
           Running Job can't be aborted (which is highest in Queue) .Aborted Job Priorirty will be increased and 
           assigned behind the Running Job , deleted Job will be removed from Queue . someone will not able to abort or delete 
           job which has finished executing , if someone does so <b>Job doesn't exist</b> message will come
           </div>
       </div>
   )
}
export default Note;