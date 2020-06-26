const firebaseConfig = {
    apiKey: "",
    authDomain: "hey-smit.firebaseapp.com",
    databaseURL: "https://hey-smit.firebaseio.com",
    projectId: "hey-smit",
    storageBucket: "hey-smit.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

var taskId = 10;
function upload() {
    text = document.getElementById("inputCity").value;
    color = document.getElementById("inputState").value;
    // count = document.getElementById("count").value;
    if (color == "red"){
        textcolor = "white";
    }
    else{
        textcolor = "black";
    }
    //    console.log(text,color);
    firebase.database().ref('notes/taskId/').once('value').then(function (snapshot) {
        count = snapshot.val().count; 
        console.log(count);
        inc(count,text,color,textcolor);
        count = count + 1;
        firebase.database().ref('notes/taskId/').set({
            count : count
        })
    })
}
function inc(count,text,color,textcolor){
    console.log(count);
    firebase.database().ref('notes/' + count + "/").set({
        message: text,
        color: color,
        star: false,
        textcolor : textcolor
    })

    
    $("#task-container").empty();
}

function displayTask(data) {
    $("#task-container").empty();
    database = firebase.database();
    var ref = database.ref('notes');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    var task_list = data.val();

    var keys = Object.keys(task_list);
    // count = keys.length;
    // console.log(count);

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var text = task_list[k].text;
        var color = task_list[k].color;
        var message = task_list[k].message;
        var textcolor = task_list[k].textcolor;
        myFunction(text, color, message,textcolor,i);
    }

}

function errData(err) {
    console.log("error");
    console.log(err)
}

function myFunction(text, color, message,textcolor,taskId){
    var container = document.getElementById("task-container");
        var el = document.createElement("div");
        el.className = "task-card";
        el.id = "task-card";
        // el.innerHTML = text;
        el.style.color = textcolor;
        el.style.backgroundColor = color;
        container.append(el);

        var ml = document.createElement("p");
        ml.id = "task-message";
        ml.innerHTML = message + '<br>';
        ml.style.color = textcolor;
        ml.style.backgroundColor = color;
        el.append(message);

       
        code = `<button class="btn btn-primary" value="Edit" onClick="taskEdit(${taskId})">Edit</button>`;
        
        var bl = document.createElement("p");
        bl.innerHTML = code;
        el.append(bl);

    // console.log(text, color, star);
}


function taskEdit(taskId) {
    console.log(taskId);
    firebase.database().ref('notes/' + taskId +'/').once('value').then(function (snapshot) {
        var message = snapshot.val().message;
        var color = snapshot.val().color;
        document.getElementById("inputCity").value = message;
        document.getElementById("inputState").value = color;
        document.getElementById("count").value = taskId;
    })
    
    


    // document.getElementById("inputCity").value = message;
    // document.getElementById("inputState").value = color;
    // document.getElementById("count").value = taskId;

}

function taskDelete() {
    ref = firebase.database().ref('notes/' + 1 + "/")
    ref.remove();
    refresh();
}

function refresh() {
    window.location.reload();
}