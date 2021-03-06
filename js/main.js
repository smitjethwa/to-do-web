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
        // console.log(count);
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
        task_id: count
    })
    // alert("Note Added!");
    document.getElementById("success-message").innerHTML = "Data added successfully!!";
    setTimeout(function () {
        document.getElementById("success-message").style.visibility = "hidden";
    }, 3000); // <-- time in milliseconds
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
    if (task_list == null) {
        document.getElementById("empty-list").innerHTML = "Note list is Empty! Try Entering note in the list.";
    } else {
        var keys = Object.keys(task_list);
        console.log(keys.length);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var color = task_list[k].color;
            var message = task_list[k].message;
            var textcolor = task_list[k].textcolor;
            var task_id = task_list[k].task_id;
            // console.log(color,message,textcolor,task_id);
            myFunction(color, message, textcolor, task_id);
        }
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


    // code = `<button class="btn btn-primary" value="Edit" onClick="taskEdit(${task_id})">Edit</button>`;
    editbtn = `<button type="button" class="btn btn-primary editbtn" data-toggle="modal" data-target="#exampleModal"
            data-whatever="@mdo" onClick="taskEdit(${task_id})">Edit</button>`
    delbtn = `<button type="button" class="btn btn-danger delbtn" onClick="taskDelete(${task_id})">Delete</button>`

    var bl = document.createElement("p");
    bl.innerHTML = editbtn + delbtn;
    el.append(bl);

    // console.log(text, color, star);
}


function taskEdit(task_id) {
    firebase.database().ref('notes/tasks/' + task_id + '/').once('value').then(function (snapshot) {
        var message = snapshot.val().message;
        var color = snapshot.val().color;
        // console.log("Hello");   
        document.getElementById("changetask").value = message;
        document.getElementById("changecolor").value = color;
        // console.log(message, color,task_id);
        document.getElementById('task_id').value = task_id;
    })
}

function taskDelete(task_id) {
    ref = firebase.database().ref('notes/tasks/' + task_id + "/");
    ref.remove();
    displayTask();
    alert("Note removed.")
}

function refresh() {
    window.location.reload();
}


function taskUpdate() {
    new_text = document.getElementById("changetask").value;
    new_color = document.getElementById("changecolor").value;
    task_id = document.getElementById("task_id").value;
    // console.log(task_id);
    var postData = {
        // textcolor: textcolor,
        // task_id:count,
        message: new_text,
        color: new_color,
        star: false,
    };
    ref = firebase.database().ref('notes/tasks/' + task_id + "/");
    ref.update(postData);
    // refresh();
    displayTask();
    alert("Note Updated!");
}
