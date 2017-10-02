//Declare variables
    
    var canvas = document.getElementById("osCanvas");
    var context = canvas.getContext("2d");
    var count = 0; //event input file triggered
    var average = 0;

    var FCFS_average_waiting_time;
    var FJS_average_waiting_time;
    var SRPT_average_waiting_time;
    var Priority_average_waiting_time;
    var RoundRobin_average_waiting_time;
    
    var FCFS_processes = [];
    var FJS_processes = [];
    var SRPT_processes = [];
    var Priority_processes = [];
    var RoundRobin_processes = [];

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
            count++; //everytime a file text is inputted it increments count            
            //Reset processes values when another text file is inputted
                if(count > 1){
                    FCFS_processes = [];
                    FJS_processes = [];
                    SRPT_processes = [];
                    Priority_processes = [];
                    RoundRobin_processes = [];
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    Design_Table();                    
                }
            
            //File reading
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

            //Initializations
                //FCFS
                    for(var i = 0; i <proc.length; i++){
                        Initialize_FCFS(proc[i][0],proc[i][1],proc[i][2],proc[i][3],waiting);
                        waiting+=parseInt(proc[i][2]);
                    }
                    FCFS_average_waiting_time = ComputeAverageWaitingTime(FCFS_processes); //Compute Average Waiting Time of Processes
            
                //SJF
                    average = 0;
                    for(var i = 0; i <proc.length; i++){
                        Initialize_FJS(proc[i][0],proc[i][1],proc[i][2],proc[i][3],0);
                    }
                    FJS_processes.sort(function(a, b) {
                            return a.burstTime - b.burstTime || a.arrival - b.arrival;
                    });

                    var  temp = 0, num = [];
                    for(var i = 0; i < FJS_processes.length;i++){
                        temp += parseInt(FJS_processes[i].burstTime);
                        num.push(temp);
                    }
                    for(var i = 1, j = 0; i < FJS_processes.length; i++,j++){
                        FJS_processes[i].waitingTime = num[j];
                    }
                    FJS_average_waiting_time = ComputeAverageWaitingTime(FJS_processes); //Compute Average Waiting Time of Processes                

                //Priority
                    average = 0;
                    for(var i = 0; i <proc.length; i++){
                        Initialize_Priority(proc[i][0],proc[i][1],proc[i][2],proc[i][3],0);
                    }
                    Priority_processes.sort(function(a, b) {
                        return a.priority - b.priority || a.arrival - b.arrival;
                    });
                    var  temp2 = 0, num2 = [];
                    for(var i = 0; i < Priority_processes.length;i++){
                        temp2 += parseInt(Priority_processes[i].burstTime);
                        num2.push(temp2);
                    }
                    for(var i = 1, j = 0; i < Priority_processes.length; i++,j++){
                        Priority_processes[i].waitingTime = num2[j];
                    }
                    Priority_average_waiting_time = ComputeAverageWaitingTime(Priority_processes); //Compute Average Waiting Time of Processes                
                
                //Round Robin | Pre-emptive version of FCFS
                    average = 0;
                    var checktime = true;
                    var rr_processes = [];

                    for(var i = 0; i <proc.length; i++){
                        Initialize_RoundRobin(proc[i][0],proc[i][1],proc[i][2],proc[i][3],0);
                    }
                    while(checktime){
                        checktime = false;
                        for(var i = 0; i < RoundRobin_processes.length; i++){
                            if(RoundRobin_processes[i].burstTime > 0){
                                checktime = true;
                            }

                            
                        }
                    }
                    


                //SRPT | Pre-emptive version of SJF
                    average = 0;

                    //85.9

                
            Print_WaitingTime(); //Show the computed Average Waiting Time for each Scheduling

            //Helper Functions
                //Initialize values to each scheduling
                    function Initialize_FCFS(i, arrivalTime,burstTime,priorityNumber,waitingTime){
                        FCFS_processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
                    }

                    function Initialize_FJS(i, arrivalTime, burstTime, priorityNumber, waitingTime){
                        FJS_processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
                    }

                    function Initialize_SRPT(i, arrivalTime, burstTime, priorityNumber, waitingTime){
                        SRPT_processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
                    }

                    function Initialize_Priority(i, arrivalTime, burstTime, priorityNumber, waitingTime){
                        Priority_processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
                    }

                    function Initialize_RoundRobin(i, arrivalTime, burstTime, priorityNumber, waitingTime){
                        RoundRobin_processes.push(new process(i,arrivalTime,burstTime,priorityNumber,waitingTime));
                    }
                
                //Compute Average Waiting Time
                    function ComputeAverageWaitingTime(p){
                        for(var i = 0; i < p.length; i++){
                            average += p[i].waitingTime;
                        }
                        average = average/20;
                        return average.toFixed(1);
                    }
                
            //Display Design
                //Show in the table the AWT for each Scheduling
                    function Print_WaitingTime(){
                        
                        //FCFS
                            context.fillText( FCFS_average_waiting_time,170,580);
                            for(var i = 0; i < FCFS_processes.length; i++){             
                                context.fillText("Process  "+ FCFS_processes[i].id + "     -      " 
                                + FCFS_processes[i].waitingTime,10,140+(i*20) );
                            }
                        
                        //FJS
                            context.fillText(FJS_average_waiting_time,390,580);            
                            for(var i = 0; i < FJS_processes.length; i++){             
                                context.fillText("Process  "+ FJS_processes[i].id + "     -      " 
                                + FJS_processes[i].waitingTime,230,140+(i*20) );
                            }

                        //SRPT
                            context.fillText(SRPT_average_waiting_time,640,580);           
                            for(var i = 0; i < SRPT_processes.length; i++){             
                                context.fillText("Process  "+ SRPT_processes[i].id + "     -      " 
                                + SRPT_processes[i].waitingTime,430,140+(i*20) );
                            }
                
                        //Priority        
                            for(var i = 0; i < Priority_processes.length; i++){             
                                context.fillText("Process  "+ Priority_processes[i].id + "     -      " 
                                + Priority_processes[i].waitingTime,750,140+(i*20) );
                            }
                            context.fillText(Priority_average_waiting_time,900,580);
                
                        //Round Robin
                            context.fillText(RoundRobin_average_waiting_time,1190,580);
        
                    }

                //Show which process is running and its burst time, should be in the main loop
                    function Print_RunningProcess(){
                        for(var i = 0; i < FCFS_processes.length; i++){
                            

                        }
                    }
                
            //Seperate: this is for the loop and functions
                //Main Loop
                function Main(){
                    // for(var i = 0; i < FCFS_processes.length; i++){

                    //     console.log("Process No."+FCFS_processes[i].id);
                    //     // console.log("Process Burst Time:"+FCFS_processes[i].burstTime[0]);

                    //         if(FCFS_processes[i].burstTime[0] > 0){
                    //             console.log("BUrst Time: "+FCFS_processes[i].burstTime[0]);                                
                    //             FCFS_processes[i].burstTime[0]--;
                    //         }else{
                    //             FCFS_processes.shift();
                    //         }
                    // }

                    console.log("---------------------------------------------");
                        
                    Print_RunningProcess();
                }
            
            //Loop main to show runnning process and its burst time
            var counter = 0;
            var loop = setInterval(function(){
                Main();
                counter++;
                if(counter === 20){
                    clearInterval(loop);
                }
            },500); //loop and update page   


            // Main();         
        };
        reader.readAsText(file);            
    };

//Design of Table
    function Design_Table(){
        context.fillStyle = "white";
        context.fillRect(0,0,1250,700);
        context.fillStyle = "black";
        context.font = "16px Calibri";
        
        //FCFS
            context.fillText("FCFS",80,25);
            // context.fillText("Running Process:",10,60);  
            // context.fillText("Burst Time:",10,80);
            context.fillText("Processes Waiting Time: ",10,110);
            context.fillText("Average Waiting Time: ",10,580);        
            context.moveTo(220,0);
            context.lineTo(220,1000);
            context.stroke();
            // context.moveTo(0,35);
            // context.lineTo(1330,35);
            // context.stroke();
            context.moveTo(0,60);
            context.lineTo(1330,60);
            context.stroke();
        //FJS
            context.fillText("FJS",320,25);
            // context.fillText("Running Process:",230,60);
            // context.fillText("Burst Time:",230,80);
            context.fillText("Processes Waiting Time: ",230,110);
            context.fillText("Average Waiting Time: ",230,580);            
            context.moveTo(470,0);
            context.lineTo(470,1000);
            context.stroke();

        //SRPT
            context.fillText("SRPT",560,25);
            // context.fillText("Running Process:",480,60);
            // context.fillText("Burst Time:",480,80);
            context.fillText("Processes Waiting Time: ",480,110);
            context.fillText("Average Waiting Time: ",480,580);
            context.moveTo(730,0);
            context.lineTo(730,1000);
            context.stroke();

        //Priority
            context.fillText("Priority",840,25);
            // context.fillText("Running Process:",740,60);
            // context.fillText("Burst Time:",740,80);
            context.fillText("Processes Waiting Time: ",740,110);
            context.fillText("Average Waiting Time: ",740,580);
            context.moveTo(1020,0);
            context.lineTo(1020,1000);
            context.stroke();

        //Round Robin
            context.fillText("Round Robin",1100,25);
            // context.fillText("Running Process:",1030,60);
            // context.fillText("Burst Time:",1030,80);
            context.fillText("Processes Waiting Time: ",1030,110);
            context.fillText("Average Waiting Time: ",1030,580);
            context.moveTo(1020,0);
            context.lineTo(1020,1000);
            context.stroke();
    }

    Design_Table();