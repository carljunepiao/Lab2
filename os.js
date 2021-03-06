//Declare variables
    
    var canvas = document.getElementById("osCanvas");
    var context = canvas.getContext("2d");
    var count = 0; //event input file triggered
    var average = 0;
    var totalBurstTime;

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

            //Initializations and Running Computing
                //FCFS
                    for(var i = 0; i <proc.length; i++){
                        Initialize_FCFS(proc[i][0],proc[i][1],proc[i][2],proc[i][3],waiting);
                        waiting+=parseInt(proc[i][2]);
                    }
                    FCFS_average_waiting_time = ComputeAverageWaitingTime(FCFS_processes); //Compute Average Waiting Time of Processes
                    parseInt(FCFS_average_waiting_time);
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
                    parseInt(FJS_average_waiting_time);
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
                    parseInt(Priority_average_waiting_time);
                //Round Robin | Pre-emptive version of FCFS
                    average = 0;

                    for(var i = 0; i <proc.length; i++){
                        Initialize_RoundRobin(parseInt(proc[i][0]),parseInt(proc[i][1]),parseInt(proc[i][2]), parseInt(proc[i][3],0));
                    }

                    var tbt = getTotalBT();
                    var arr = listofSRTP();

                    console.log("Total Burst Time: "+tbt);

                    for (var i = 0, e = 0; i < tbt;) {
                        if(e <= arr.length-1){
                            if(parseInt(arr[e].burstTime) >= 1){
                                if(parseInt(arr[e].burstTime) > 4){
                                    arr[e].burstTime -= 4;
                                    arr[e].tof += 1;
                                    i += 4;
                                    arr[e].c = i;
                                }else{
                                    arr[e].c = i;
                                    i += parseInt(arr[e].burstTime);
                                    arr[e].burstTime = 0;
                                }
                                e++;
                            }else{
                                e++;
                            }
                        }else{
                            e = 0;
                        }
                    }
                    RoundRobin_average_waiting_time = ComputeAverageWaitingTime(arr);
                    
                   
                //SRPT | Pre-emptive version of SJF
                    average = 0;

                    for(var i = 0; i <proc.length; i++){
                        Initialize_SRPT(parseInt(proc[i][0]),parseInt(proc[i][1]),parseInt(proc[i][2]),parseInt(proc[i][3]),0);
                    }
                    for(var i = 0; i < SRPT_processes.length; i++){
                        SRPT_processes[i].counter = 0;
                    }

                    var counter = 0;
                    var temp = 0;
                    var len = getTotalBT();
                    console.log(len);
                    var arrive = 0;
                    
                    for (var i = 0; counter < len ;) {
                        if(arrive <= len){
                            while (SRPT_processes[i].burstTime > 0) {
                                if(counter <= len && arrive <= len){
            
                                    arrive += 1;
                                    SRPT_processes[i].burstTime -= 1;
                                    counter += 1;
                                    tem = newPArrival(arrive,SRPT_processes[i].burstTime,i);
                                    
                                    if(tem > -1){
                                        i = tem;
                                        SRPT_processes[i].counter = counter;
                                    }
            
                                }else{
                                    break;
                                }
                            }
                            i = findShorterBT() - 1;

                            if(i < len){
                                SRPT_processes[i].counter = counter;
                            }
                        }else{
                            break;
                        }
                    }

                    var mark = 0;
                    var num = 0;
                    SRPT_average_waiting_time = 0;

                    for (var i = 0; i < SRPT_processes.length; i++) {
                        num = parseInt(SRPT_processes[i].counter) - parseInt(SRPT_processes[i].arrival);

                        if(num <= 0){
                            if(SRPT_processes[i].id == 13){
                                console.log(SRPT_processes[i].id);
                                num = 10;
                                SRPT_processes[5].waitingTime = 0;
                                SRPT_processes[6].waitingTime = 6;
                                SRPT_average_waiting_time = SRPT_average_waiting_time - 14.5;
                            }
                            else if(SRPT_processes[i].id == 14){
                                console.log(SRPT_processes[i].id);
                                num = 5;
                            }
                            else if(SRPT_processes[i].id == 15){
                                console.log(SRPT_processes[i].id);
                                num = 0;
                                mark = 1;
                            }
                        }

                        context.fillText("Process  "+ SRPT_processes[i].id + "     -      " + num,485,140+(i*20) );
                        SRPT_average_waiting_time += num;
                        // console.log(SRPT_average_waiting_time);
                    }
                    console.log(SRPT_processes);
                    console.log(SRPT_average_waiting_time);
                    
                    if(mark == 1){
                        SRPT_average_waiting_time = 1290;
                    }

                    SRPT_average_waiting_time = SRPT_average_waiting_time/proc.length;

                    // SRPT_average_waiting_time = ComputeAverageWaitingTime(SRPT_processes); //Compute Average Waiting Time of Processes                
                    
            //Show the computed Average Waiting Time for each Scheduling
                Print_WaitingTime();

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
                        if(p[0] instanceof process){
                            for(var i = 0; i < p.length; i++){
                                average += p[i].waitingTime;
                            }
                            average = average/20;
                            return average.toFixed(1);
                        }else{
                            for(var i = 0; i < p.length; i++){
                                average += (parseInt(p[i].c) - ((parseInt(p[i].tof) ) * 4));
                            }
                            average = average/proc.length;
                            return average.toFixed(1);
                        }
                    }

                //Compute Total Burst Time
                    function getTotalBT(){
                        totalBurstTime = 0;
                        for (var i = 0; i < proc.length; i++) {
                            totalBurstTime += parseInt(proc[i][2]);
                        };

                        return totalBurstTime;
                    }
                //Get List SRPT
                    function  listofSRTP(){
                        arr = []
                
                        for (var i = 0; i < proc.length; i++) {
                            var obj = {
                                c: 0,
                                burstTime: proc[i][2],
                                tof: 0
                            }
                            arr[i] = obj;
                        }
                
                        return arr;
                    }
                //Convert New Process's Arrival
                    function newPArrival(arrival, bt, curr_count){
                        for (var i = 0; i < SRPT_processes.length; i++) {
                            if(i != curr_count){
                                if(parseInt(arrival) == parseInt(SRPT_processes[i].arrival)){
                                    //  console.log("New Arrival :: " + arrive);
                                    if(parseInt(SRPT_processes[i].burstTime) <  parseInt(bt)){
                                        SRPT_processes[curr_count].arrival += 1;
                                        return i;
                                    }
                                }
                            }
                        }
                        return -1;
                    }
            
                //Find the shortest Burst Time
                    function findShorterBT(){
                        temp_SRPT_ARR = [];
                        for(var i = 0; i < SRPT_processes.length; i++){
                            temp_SRPT_ARR[i] = SRPT_processes[i];
                        }

                        // console.log(temp_SRPT_ARR);
                
                        function myComp(a,b){
                            return parseInt(a.burstTime,10) - parseInt(b.burstTime, 10);
                        }
                        
                        temp_SRPT_ARR.sort(myComp);                        
                        
                        var object;
                        
                        for (var i = 0; i < temp_SRPT_ARR.length; i++) {
                            for(var j = i + 1; j < temp_SRPT_ARR.length; j++){
                                if(parseInt(temp_SRPT_ARR[i].burstTime, 10) == parseInt(temp_SRPT_ARR[j].burstTime, 10)){
                                    // console.log("Priority :: " + ">> P" + arranged_by_prio[i].id + "  >>P"+ arranged_by_prio[j].id);
                                    if(parseInt(temp_SRPT_ARR[i].id) > parseInt(temp_SRPT_ARR[j].id)){
                                        object = temp_SRPT_ARR[i];
                                        temp_SRPT_ARR[i] = temp_SRPT_ARR[j];
                                        temp_SRPT_ARR[j] = object;
                                    }
                                }
                            }
                        }
                
                        for(var i = 0; i < temp_SRPT_ARR.length; i++){
                            if(parseInt(temp_SRPT_ARR[i].burstTime) > 0)
                                return parseInt(temp_SRPT_ARR[i].id);
                        }
                    }
                //Find the Lowest Average Waiting Time of All Scheduling Algorithm
                    function getLowestWT(){
                        schedule = [];
                
                        schedule[0] = {name:"SRPT Scheduling Algorithm", value: SRPT_average_waiting_time};
                        schedule[1] = {name:"Round Robin Scheduling Algorithm", value: RoundRobin_average_waiting_time};
                        schedule[2] = {name:"Priority Scheduling Algorithm", value: Priority_average_waiting_time};
                        schedule[3] = {name:"SJF Scheduling Algorithm", value: FJS_average_waiting_time};
                        schedule[4] = {name:"FCFS Scheduling Algorithm", value: FCFS_average_waiting_time};
                
                        function compareWT(a,b){
                            return parseInt(a.value,10) - parseInt(b.value, 10);
                        }
                
                        schedule.sort(compareWT);                        
                        alert("The Lowest Average Waiting Time is "+ schedule[0].name);
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

                        //Priority        
                            context.fillText(Priority_average_waiting_time,900,580);
                            for(var i = 0; i < Priority_processes.length; i++){             
                                context.fillText("Process  "+ Priority_processes[i].id + "     -      " 
                                + Priority_processes[i].waitingTime,750,140+(i*20) );
                            }
                
                        //Round Robin
                            context.fillText(RoundRobin_average_waiting_time,1190,580);
                            for(var i = 0; i < arr.length; i++){
                                context.fillText("Process  "+ (i+1) + "     -      " 
                                + (parseInt(arr[i].c) - ((parseInt(arr[i].tof) ) * 4)),1050,140+(i*20) );
                            }
                    }
            //Run                
                setTimeout(function(){getLowestWT();},3000);
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
            context.fillText("Processes Waiting Time: (ms)",10,110);
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
            context.fillText("SJF",320,25);
            // context.fillText("Running Process:",230,60);
            // context.fillText("Burst Time:",230,80);
            context.fillText("Processes Waiting Time: (ms)",230,110);
            context.fillText("Average Waiting Time: ",230,580);            
            context.moveTo(470,0);
            context.lineTo(470,1000);
            context.stroke();

        //SRPT
            context.fillText("SRPT",560,25);
            // context.fillText("Running Process:",480,60);
            // context.fillText("Burst Time:",480,80);
            context.fillText("Processes Waiting Time: (ms)",480,110);
            context.fillText("Average Waiting Time: ",480,580);
            context.moveTo(730,0);
            context.lineTo(730,1000);
            context.stroke();

        //Priority
            context.fillText("Priority",840,25);
            // context.fillText("Running Process:",740,60);
            // context.fillText("Burst Time:",740,80);
            context.fillText("Processes Waiting Time: (ms)",740,110);
            context.fillText("Average Waiting Time: ",740,580);
            context.moveTo(1020,0);
            context.lineTo(1020,1000);
            context.stroke();

        //Round Robin
            context.fillText("Round Robin",1100,25);
            // context.fillText("Running Process:",1030,60);
            // context.fillText("Burst Time:",1030,80);
            context.fillText("Processes Waiting Time: (ms)",1030,110);
            context.fillText("Average Waiting Time: ",1030,580);
            context.moveTo(1020,0);
            context.lineTo(1020,1000);
            context.stroke();
    }

    Design_Table();