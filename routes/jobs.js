const express = require("express");
const async = require("async");
const PriorityQueue = require("../datastuctures/priorityQueue"); // this queue refers to the synchronous queue
const router = express.Router();

const synQueue = new PriorityQueue(); // synchronous queue to maintain which jobs are currently in asynchronous queue


let workers = 1; // no of workers
const timeOut = 20; // timeout of a job
let priority = 1;
// asynchronous queue for asynchronous jobs
const taskQueue = async.priorityQueue((task,callback)=>{
     task.fn(task.id,callback);
},workers);



// new job which takes time
const newJob=(id,callback)=>{
    setTimeout(function() {
    console.log(`job finished ${id}`);    
    callback();
},timeOut * 1000)};


// @route   GET api/createjob/:id
// @desc    create a new job
router.get("/createjob/:id",(req,res)=>{

       // send error if job already exists
       if(synQueue.checkJobExists(req.params.id))
            return res.send("Job already Exists");
       priority = priority + 1;
       synQueue.enqueue(req.params.id); // push task to synchronous queue
       // push task to asynchronous queue
       taskQueue.push({fn:newJob,id:req.params.id},priority,(err)=>{
           // when task is completed , then remove it from synchronous queue
           synQueue.remove(req.params.id);
           if(err)
             console.log(err);
       })
       res.send("job created");   
});

// @route   GET api/showalljobs
// @desc    show all the jobs which are in running queue
router.post("/showalljobs",(req,res)=>{  
  res.send(synQueue.getAllCurrentJobs()); // return the curernt synchronous queue
})

// @route   GET api/abort/:id
// @desc    abort a job and shift it's priority
router.get("/abort/:id",(req,res)=>{

    if(!synQueue.checkJobExists(req.params.id))
       return res.send("Job does not exist");
    
    if(synQueue.front()===req.params.id){
        return res.send("Running job can't be Aborted");    
    }
        // remove task to synchronous queue
    taskQueue.remove((task)=>{
        return task.data.id === req.params.id
    }) 
    // remove task to asynchronous queue
    synQueue.remove(req.params.id);
    /* add task to synchronous queue with highest priority
    task would be added behind running task */
    synQueue.enqueue(req.params.id,1);
    /* add task to asynchronous queue with highest priority
      task would be added to second position behind running task
    */
    taskQueue.push({fn:newJob,id:req.params.id},1, (err)=> {
        // when task is completed , then remove it from synchronous queue
        synQueue.remove(req.params.id);
    });

    res.send("aborted");
});

// @route   GET api/delete/:id
// @desc    delete a job
router.get("/remove/:id",(req,res)=>{

    // check if job is present in queue
    if(!synQueue.checkJobExists(req.params.id))
        return res.send("Job does not exist");
 
    // check if job which is to be aborted is not running    
    if(synQueue.front()===req.params.id)
        return res.send("Running job can't be Deleted");  
    
    // remove task to asynchronous queue
    taskQueue.remove((task)=>{
        return task.data.id === req.params.id
    })
    // remove task to synchronous queue
    synQueue.remove(req.params.id);
    res.send("removed");
});
module.exports = router;