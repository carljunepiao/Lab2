var canvas = document.getElementById("osCanvas");
var context = canvas.getContext("2d");

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

//entity process
function process(id,arrival,time,priority){
    this.id = id;
    this.arrival = arrival;
    this.burstTime = time;
    this.priority = priority;
}

//Put values in each proces of processes
function Initialize(){
    for(var i = 1; i <= 20; i++){
        var arrivalTime = 0;
        var burstTime = 0;
        var priorityNumber = 0;

        switch (i) {
            case 1:
                arrivalTime = 0;
                burstTime = 20;
                priorityNumber = 0;
                break;
            case 2:
                arrivalTime = 1;
                burstTime = 15;
                priorityNumber = 0;
                break;
            case 3:
                arrivalTime = 2;
                burstTime = 11;
                priorityNumber = 1;
                break;
            case 4:
                arrivalTime = 3;
                burstTime = 9;
                priorityNumber = 1;
                break;
            case 5:
                arrivalTime = 4;
                burstTime = 11;
                priorityNumber = 2;
                break;            
            case 6:
                arrivalTime = 4;
                burstTime = 9;
                priorityNumber = 3;
                break;
            case 7:
                arrivalTime = 5;
                burstTime = 12;
                priorityNumber = 2;
                break;
            case 8:
                arrivalTime = 5;
                burstTime = 14;
                priorityNumber = 4
                break;
            case 9:
                arrivalTime = 6;
                burstTime = 15;
                priorityNumber = 3;
                break;
            case 10:
                arrivalTime = 7;
                burstTime = 19;
                priorityNumber = 2;
                break;
            case 11:
                arrivalTime = 8;
                burstTime = 25;
                priorityNumber = 0;
                break;
            case 12:
                arrivalTime = 9;
                burstTime = 21;
                priorityNumber = 1;
                break;
            case 13:
                arrivalTime = 9;
                burstTime = 8;
                priorityNumber = 2;
                break;
            case 14:
                arrivalTime = 10;
                burstTime = 3;
                priorityNumber = 5;
                break;
            case 15:
                arrivalTime = 10;
                burstTime = 4;
                priorityNumber = 5;
                break;
            case 16:
                arrivalTime = 11;
                burstTime = 14;
                priorityNumber = 4;
                break;
            case 17:
                arrivalTime = 11;
                burstTime = 12;
                priorityNumber = 4;
                break;
            case 18:
                arrivalTime = 12;
                burstTime = 10;
                priorityNumber = 2;
                break;
            case 19:
                arrivalTime = 13;
                burstTime = 10;
                priorityNumber = 3;
                break;
            case 20:
                arrivalTime = 13;
                burstTime = 9;
                priorityNumber = 2;
                break;
            default:
                break;
        }
        processes.push(new process(i,arrivalTime,burstTime,priorityNumber));

        arrivalTime++;
        burstTime++;
        priorityNumber++;
    }
}

//FCFS
function RunBurstTimeFCFS(time){
    for(var i = 0; time> i; i++){
        
    }
}

function SJF(){

}

function SRPT(){

}

function Priority(){

}

function RoundRobin(){

}

//Run
Initialize();
// FCFS();

//Check
processes.forEach(function(element) {
    console.log(element);
}, this);

//Design
function design(){
    context.fillStyle = "white";
	context.fillRect(0,0,1250,700);
	context.fillStyle = "black";
	context.font = "16px Calibri";
    
    //FCFS
    context.fillText("FCFS",30,25);
    context.fillText("Process Running:",40,80);
    
    for(var i = 0; i < processes.length; i++){

    }
    
    context.fillText("Burst Time:",40,130);    

    //FCFS Design Table
    context.moveTo(480,0);
    context.lineTo(480,1000);
    context.stroke();

    context.moveTo(0,40);
    context.lineTo(1330,40);
    context.stroke();


}

design();

// setInterval("FCFS",500);