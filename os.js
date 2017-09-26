var canvas = document.getElementById("osCanvas");
var context = canvas.getContext("2d");
var count = 0; //input file triggered

/* Desciption and Instruction

    Implement the FCFS, SJF, SRPT, Priority and Round-robin scheduling. Sample data is given to you
    (please refer to process1.txt and process2.txt).
    · For FCFS and SJF, assume all processes arrived at time 0 in that order.
    · For SRPT, consider the arrival time of each processes.
    · For Priority, assume that lower-value priorities have higher priorities (that means 0 is the highest priority).
    · For round-robin scheduling, assume a uniform time slice of 4 millisecond.

    Display the waiting time for each process for every algorithm, as well as their average computing time.
    Also, perform an algorithm evaluation, based on the datasets given to you.

    Made by: Charlito Piao
*/

var processes = [];

//Entity Process
function process(id,arrival,time,priority){
    this.id = id;
    this.arrival = arrival;
    this.burstTime = time;
    this.priority = priority;
}

document.getElementById('file').onchange = function(){
    var text = [];
    var file = this.files[0];
    var reader = new FileReader();
    
    reader.onload = function(progressEvent){
        count++;

        if(count == 2){ //Reset processes values
            processes = [];
        }
        
        var lines = this.result.split('\n');
        var temp = [];
        var temp2 = [];
        var proc = [];

        for(var line = 1; line < lines.length; line++){
            var temp = lines[line].split(' ');
            text.push(temp[0]);
        }

        for(var i = 0; text.length > i; i++){
            temp[i] = text[i].split(' ');
            temp2.push(temp[i][0]);
        }

        for(var i = 0; i < temp2.length; i++){
            proc.push(temp2[i].replace(/\s/g,' ').split(" "));
        }

        for(var i = 0; i < proc.length; i++){
            for(var j = 0; j < proc[i].length; j++){
                if(proc[i][j] === ""){
                    proc[i] = proc[i].filter(function(item) { 
                        return item !== proc[i][j];
                    })
                }
            }
        }

        //initialize values for each process
        for(var i = 0; i <proc.length; i++){
            Initialize(proc[i][0],proc[i][1],proc[i][2],proc[i][3]);
        }

        console.log(processes);
    };
    reader.readAsText(file);

    //Put values in each proces of processes
    function Initialize(i, arrivalTime,burstTime,priorityNumber){
        processes.push(new process(i,arrivalTime,burstTime,priorityNumber));
    }

    function Main(){
        // ssds
        console.log("main running");
    }

    // setInterval(Main,1000); //loop and update page
};

//run design table
Design();

//Design Table
function Design(){
    context.fillStyle = "white";
    context.fillRect(0,0,1250,700);
    context.fillStyle = "black";
    context.font = "16px Calibri";
    
    //FCFS
    context.fillText("FCFS",30,25);
    context.fillText("Process Running:",40,80);    
    context.fillText("Burst Time:",40,130);    

    //FCFS Design Table
    context.moveTo(480,0);
    context.lineTo(480,1000);
    context.stroke();

    context.moveTo(0,40);
    context.lineTo(1330,40);
    context.stroke();
}