class QElement { 
    constructor(element, priority) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 
  
// PriorityQueue class 
class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() { 
        this.items = []; 
    } 
    
    enqueue(element, priority) { 
        // creating object from queue element 
        var qElement = new QElement(element, priority); 
        var contain = false; 
  
        // iterating through the entire 
        // item array to add element at the 
        // correct location of the Queue 
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                // Once the correct location is found it is 
                // enqueued 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 
    
        // if the element have the highest priority 
        // it is added at the end of the queue 
        if (!contain) { 
            // assign priority if not assigned earlier
            if(this.rear()!=-1) // if already having some elements before
                qElement.priority= this.rear().priority+1;
            else // for the first element
                qElement.priority = 1;   
            this.items.push(qElement); 
        } 
        console.log("Enqueue "+qElement.element);
    } 
    
    // isEmpty function 
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    } 
    
    // front function 
    front() 
    { 
	    // returns the highest priority element 
	    // in the Priority queue without removing it. 
	    if (this.isEmpty()) 
		    return "No elements in Queue"; 
	    return this.items[0].element; 
    } 

    // rear function 
    rear() { 
        // returns the lowest priorty 
        // element of the queue 
        if (this.isEmpty()) {
            console.log("No elements in Queue");
            return -1;
        }     
        return this.items[this.items.length - 1]; 
    } 

    // getAllCurrentJobs function 
    // prints all the element of the queue 
    getAllCurrentJobs() { 
         return this.items.map(ele=>ele.element);
    } 

    //removeElement function
    //remove the specified task from queue
    remove(id){
        let index; 
        for(var i=0;i<this.items.length;i++){
            // checking if the certain process which is in queue exists i.e is in running queue
            if(this.items[i].element===id){
                index = this.items.map((ele)=>ele.element).indexOf(id);
                if(index!=-1){
                    console.log("Removed "+id);
                    this.items.splice(index,1); // if process is found then remove from queue
                } 
                else 
                    console.log("process not in queue"); // process is not in running queue
            }
        }
        if(index!=-1){
                for(let i=index;i<this.items.length;i++){
                    this.items[i].priority = this.items[i].priority-1; // if process is deleted then rearrange the priorities
            }
        }
    }

    //checkIfJobsExists
    checkJobExists(id){
        for(var i=0;i<this.items.length;i++){
            if(this.items[i].element === id)
               return true;
        }
        return false;
    }

} 

module.exports = PriorityQueue;

