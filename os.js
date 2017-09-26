// var canvas = document.getElementById("osCanvas");
// var context = canvas.getContext("2d");

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
var text_1;
var text_2;

function preload(){
    text_1 = loadStrings("process1.txt");
    console.log(text_1);
}

preload();

// document.getElementById('file').onchange = function(){
//     var processes = [];

//     //Entity Process
//     function process(id,arrival,time,priority){
//         this.id = id;
//         this.arrival = arrival;
//         this.burstTime = time;
//         this.priority = priority;
//     }

//     //Convert file to array    
//     var text = [];

//     var file = this.files[0];
//     var reader = new FileReader();
    
//     reader.onload = function(progressEvent){
//         var lines = this.result.split('\n');
//         for(var line = 1; line < lines.length; line++){
//             var temp = lines[line].split(' ');
//             text.push(temp[0]);
//         }

//         //run design table
//         Design();

//         //Intiliaze values for each process
//         for(var i = 0; text.length > i; i++){
//             var temp = text[i].split(' ');
//             var temp2 = temp[i].split(' ');
//             Initialize(temp2[0],temp2[1],temp2[2],temp2[3]);
//         }

//     };
//     reader.readAsText(file);

    

//     //Put values in each proces of processes
//     function Initialize(i, arrivalTime,burstTime,priorityNumber){
//         console.log(i);
//         console.log(arrivalTime);
//         console.log(burstTime);
//         console.log(priorityNumber);
//         processes.push(new process(i,arrivalTime,burstTime,priorityNumber));
//     }

//     //Initialize values for processes
//     // Initialize();

//     //Design Table
//     function Design(){
//         context.fillStyle = "white";
//         context.fillRect(0,0,1250,700);
//         context.fillStyle = "black";
//         context.font = "16px Calibri";
        
//         //FCFS
//         context.fillText("FCFS",30,25);
//         context.fillText("Process Running:",40,80);    
//         context.fillText("Burst Time:",40,130);    

//         //FCFS Design Table
//         context.moveTo(480,0);
//         context.lineTo(480,1000);
//         context.stroke();

//         context.moveTo(0,40);
//         context.lineTo(1330,40);
//         context.stroke();
//     }

//     function Main(){
//         // ssds
//         console.log("main running");
//     }

//     setInterval(Main,1000); //loop and update page
// };