//Desciption and Instruction
    /* 
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


//Declare variables
    
    var canvas = document.getElementById("osCanvas");
    var context = canvas.getContext("2d");
    var count = 0; //event input file triggered
    var processes = [];
    var average_waiting_time;
    var FCFS_processes;
    var FJS_processes;
    var SRPT_processes;
    var Priority_processes;
    var RoundRobin_processes;
    var time_slice = 4; //For Round Robin Scheduling

//Entity Process
    
    function process(id,arrival,time,priority,waitingtime){
        this.id = id;
        this.arrival = arrival;
        this.burstTime = time;
        this.priority = priority;
        this.waitingTime = waitingtime;
        this.running = false;
    }

//Triggered when file is inputted

    document.getElementById('file').onchange = function(){
        var text = [];
        var file = this.files[0];
        var reader = new FileReader();
        var waiting = 0;

        reader.onload = function(progressEvent){
            count++;
            
            //Reset processes values when another text file is inputted
            if(count >= 2){ 
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
                Initialize(proc[i][0],proc[i][1],proc[i][2],proc[i][3],waiting);
                waiting+=parseInt(proc[i][2]);
            }
            
            FCFS_processes = processes;
            ComputeAverageWaitingTime(FCFS_processes); //Compute Average Waiting Time of Processes
            
            //FJS
            FJS_processes = OrderByFJS(processes);

        };
        reader.readAsText(file);

        //Seperate: this is for the loop and functions
    
            //Design Table
            function Design(){
                context.fillStyle = "white";
                context.fillRect(0,0,1250,700);
                context.fillStyle = "black";
                context.font = "16px Calibri";
                
                //FCFS
                    context.fillText("FCFS",60,25);
                    context.fillText("Running Process:",10,60);  
                    context.fillText("Burst Time:",10,80);
                    context.fillText("Processes Waiting Time: ",10,110);
                    for(var i = 0; i < processes.length; i++){

                        if(processes[i].running == true){
                            context.fillText("Process  "+processes[i].id, 30,80);
                            context.fillText(processes[i].burstTime, 30,100);
                        }
                        context.fillText("Process  "+ processes[i].id + "     -      " 
                        + processes[i].waitingTime,10,140+(i*20) );
                    }
                    context.fillText("Average Waiting Time: ",10,580);
                    context.fillText(average_waiting_time,10,600);

                //FCFS Design Table
                    context.moveTo(220,0);
                    context.lineTo(220,1000);
                    context.stroke();

                    context.moveTo(0,35);
                    context.lineTo(1330,35);
                    context.stroke();

                    context.moveTo(0,90);
                    context.lineTo(220,90);
                    context.stroke();

                //FJS
                    // context.fillText("FCFS",30,25);
                    // context.fillText("Process Running:",40,80);    
                    // context.fillText("Burst Time:",40,130); 

                //SRPT

                //Priority

                //Round Robin

            }

            //Main Loop
            function Main(){
                // for(var i = 0; i < processes.length; i++){
                    
                // }
                Design();
            }

            function ComputeAverageWaitingTime(p){
                var average = 0;
                // console.log(p[0]);
                for(var i = 0; i < p.length; i++){
                    average += p[i].waitingTime;
                    average = average/20;
                }
                console.log(average);
                average_waiting_time = average;
            }

            function Initialize(i, arrivalTime,burstTime,priorityNumber,waitingTime){
                processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
            }

            function OrderByFJS(processes){
                
            }

            setInterval(Main,1000); //loop and update page
    };