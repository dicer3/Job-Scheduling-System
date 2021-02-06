const express = require("express");
const {Worker} = require('worker_threads');
const os = require('os');
const PriorityQueue = require("../datastuctures/priorityQueue"); // this queue refers to the synchronous queue
const router = express.Router();

const synQueue = new PriorityQueue(); // synchronous queue to maintain which jobs are currently in asynchronous queue
const execJobs = []; // this array will contain the jobs which are currently executing

let workers = os.cpus().length; // no of workers
let workerInUse = 0; // to get the total no of workers that will be currrently in use

//remove job from executing queue
const removeJob=(id)=>{
    const index = execJobs.indexOf(id);
    execJobs.splice(index,1);
}

//check job is in executing executingQueue
const checkJob=(id)=>{
    const index = execJobs.indexOf(id);
    if(index!==-1)
      return true;
    else
      return false;  
}

// function to create a seprate worker 
const createWorkers = () => {
    // checking if new job can be accmodated for current workers
    if(workerInUse<workers){
        const id = synQueue.front();
        // it will extract elements from the waiting queue
        if(id==-1){
           // if no job is in the waiting queue function will return 
           console.log('no job in queue');
           return;
        }
        // make a worker and send id of job as workerdata
        const worker = new Worker('./routes/createJob.js',{
            workerData:id
        })
        console.log(`worker created ${id}`);
        // as job is going for executation remove it from waiting/synchronus queue
        synQueue.remove(id);
        // add the job to executing array
        execJobs.push(id);
        // increase the worker count    
        workerInUse = workerInUse+1;
        // recieve message from job
        worker.on('message', (message)=>{
            console.log(`got message ${message}`);
        });
        worker.on('error', (err)=>{
            console.log(`got error ${err}`);
        });
        // when worker has executed the job
        worker.on('exit', code => {
            if(code==0)
                console.log(`job completed ${id}`);
            // remove from executing array
            removeJob(id);
            // decrease workerinuse
            workerInUse = workerInUse-1;
            // call function again to execute jobs left synQueue/waitingQueue
            createWorkers();
        });
    }
    else{
        // for overloaded workers
        console.log("wait for sometime ... worker overloaded ");
    }    
}


// @route   GET api/createjob/:id
// @desc    create a new job
router.post("/createjob/:id",(req,res)=>{

       // send error if job already exists
       if(synQueue.checkJobExists(req.params.id))
            return res.send("Job already Exists");
       synQueue.enqueue(req.params.id); // push task to synchronous queue
       createWorkers();
      
       res.send("job created");   
});

// @route   GET api/showalljobs
// @desc    show all the jobs which are in running queue
router.get("/showalljobs",(req,res)=>{  
  const allJobs={
      'runningJobs':execJobs,
      'jobsInQueue':synQueue.getAllCurrentJobs()
  }  
  res.json(allJobs); // return the curernt synchronous queue
})

// @route   GET api/abort/:id
// @desc    abort a job and shift it's priority
router.put("/abort/:id",(req,res)=>{

    // check if job which is to be prioritized is not running 
    if(checkJob(req.params.id)){
        return res.send("Running job can't be Aborted");    
    }

    // check if job is present in queue
    if(!synQueue.checkJobExists(req.params.id))
       return res.send("Job does not exist");
    
    //make priority of aborted task to be 0  
    synQueue.changePriority(req.params.id,0);

    res.send("aborted");
});

// @route   GET api/changePriority/:id/:priority
// @desc    change the priority of current job
router.put("/changePriority/:id/:priority",(req,res)=>{

    // check if job which is to be prioritized is not running 
    if(checkJob(req.params.id)){
        return res.send("Running job can't be Prioritized");    
    }

    // check if job is present in queue
    if(!synQueue.checkJobExists(req.params.id))
       return res.send("Job does not exist");
    
    // changing priority of current job
    synQueue.changePriority(req.params.id,req.params.priority);

    res.send("priority changed");
});

// @route   GET api/delete/:id
// @desc    delete a job
router.delete("/remove/:id",(req,res)=>{

    // check if job which is to be removed is not running    
    if(checkJob(req.params.id))
        return res.send("Running job can't be Deleted"); 

    // check if job is present in queue
    if(!synQueue.checkJobExists(req.params.id))
        return res.send("Job does not exist"); 
    
    // remove task to synchronous queue
    synQueue.remove(req.params.id);
    res.send("removed");
});

module.exports = router;