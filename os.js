// var canvas = document.getElementById("osCanvas");
// var context = canvas.getContext("2d");

// /* Desciption and Instruction

//     Implement the FCFS, SJF, SRPT, Priority and Round-robin scheduling. Sample data is given to you
//     (please refer to process1.txt and process2.txt).
//     · For FCFS and SJF, assume all processes arrived at time 0 in that order.
//     · For SRPT, consider the arrival time of each processes.
//     · For Priority, assume that lower-value priorities have higher priorities (that means 0 is the highest priority).
//     · For round-robin scheduling, assume a uniform time slice of 4 millisecond.

//     Display the waiting time for each process for every algorithm, as well as their average computing time.
//     Also, perform an algorithm evaluation, based on the datasets given to you.

//     Made by: Charlito Piao
// */

// //Convert file to array
// var text = [];

// function Start(){
//     console.log("sjdis");
//     document.getElementById('file').onchange = function(){
        
//         var file = this.files[0];
    
//         var reader = new FileReader();
//         reader.onload = function(progressEvent){
//             // By lines
//             var lines = this.result.split('\n');
//             for(var line = 1; line < lines.length; line++){
//                 console.log(lines[line]);
//                 text.push(lines[line]);
//             }
//         };
//         reader.readAsText(file);
//     };    
// }

// //Entity Process
// var processes = [];

// function process(id,arrival,time,priority){
//     this.id = id;
//     this.arrival = arrival;
//     this.burstTime = time;
//     this.priority = priority;
// }

// //Put values in each proces of processes
// function Initialize(){
//     for(var i = 1; i <= 20; i++){
//         var arrivalTime = 0;
//         var burstTime = 0;
//         var priorityNumber = 0;
  
//         processes.push(new process(i,arrivalTime,burstTime,priorityNumber));
//     }
// }

// //Initialize values for processes
// Initialize();

// //Design Table
// function Design(){
//     context.fillStyle = "white";
// 	context.fillRect(0,0,1250,700);
// 	context.fillStyle = "black";
// 	context.font = "16px Calibri";
    
//     //FCFS
//     context.fillText("FCFS",30,25);
//     context.fillText("Process Running:",40,80);    
//     context.fillText("Burst Time:",40,130);    

//     //FCFS Design Table
//     context.moveTo(480,0);
//     context.lineTo(480,1000);
//     context.stroke();

//     context.moveTo(0,40);
//     context.lineTo(1330,40);
//     context.stroke();
// }

// function Main(){
// 	// ssds
// }

// setInterval(Main,1000); //loop and update page



var processes = [];
function process(){
    console.log("fisrt");

    for(var i = 0; i < 20; i++){
        processes.push(i);
    }
    for(var i = 0; i < processes.length ; i++){
        console.log(processes[i]);
    }

    initialize();

    main();
    setInterval(main,1000);
}

function initialize(){
    console.log("second");
    for(var i = 0; i < processes.length ; i++){
        processes[i] = 20;
    }
    for(var i = 0; i < processes.length ; i++){
        console.log(processes[i]);
    }
}

function main(){
    console.log("third");
    for(var i = 0; i < processes.length ; i++){
        console.log(processes[i]+2);
    }
}

process();