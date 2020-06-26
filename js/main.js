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

function upload() {
    text = document.getElementById("taskText").value;
    color = document.getElementById("taskColor").value;
    if (color == "red") {
        textcolor = "white";
    } else {
        textcolor = "black";
    }
    firebase.database().ref('notes/taskId/').once('value').then(function (snapshot) {
        count = snapshot.val().count;
        console.log(count);
        inc(count, text, color, textcolor);
        count = count + 1;
        firebase.database().ref('notes/taskId/').set({
            count: count
        })
    })
}

function inc(count, text, color, textcolor) {
    firebase.database().ref('notes/tasks/' + count + "/").set({
        message: text,
        color: color,
        star: false,
        textcolor: textcolor,
        task_id:count
    })


    $("#task-container").empty();
}

function displayTask(data) {
    $("#task-container").empty();
    database = firebase.database();
    var ref = database.ref('notes/tasks/');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    var task_list = data.val();
    var keys = Object.keys(task_list);
    console.log(keys.length);
    for (var i = 0; i<keys.length; i++) {
        var k = keys[i];
        var color = task_list[k].color;
        var message = task_list[k].message;
        var textcolor = task_list[k].textcolor;
        var task_id = task_list[k].task_id;
        console.log(color,message,textcolor,task_id);
        myFunction(color, message, textcolor, task_id);
    }
    

}

function errData(err) {
    console.log("error");
    console.log(err)
}

function myFunction(color, message, textcolor, task_id) {
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


    code = `<button class="btn btn-primary" value="Edit" onClick="taskEdit(${task_id})">Edit</button>`;
    editbtn = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
            data-whatever="@mdo" onClick="taskEdit(${task_id})" >Edit</button>`

    var bl = document.createElement("p");
    bl.innerHTML = editbtn;
    el.append(bl);

    // console.log(text, color, star);
}


function taskEdit(task_id) {
    firebase.database().ref('notes/tasks/' + task_id + '/').once('value').then(function (snapshot) {
        var message = snapshot.val().message;
        var color = snapshot.val().color;
        document.getElementById("changetask").value = message;
        document.getElementById("changecolor").value = color;
        console.log(message, color,task_id);
    })
}

function taskDelete() {
    ref = firebase.database().ref('notes/tasks/' + 1 + "/")
    ref.remove();
    refresh();
}

function refresh() {
    window.location.reload();
}


function taskUpdate(task_id) {
    new_text = document.getElementById("changetask").value;
    new_color = document.getElementById("changecolor").value;
    console.log(task_id);
    firebase.database().ref('notes/tasks/'+task_id+"/").set({
        message: new_text,
        color: new_color,
        star: false,
    })
}