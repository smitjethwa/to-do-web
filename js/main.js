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
    text = document.getElementById("inputCity").value;
    color = document.getElementById("inputState").value;
    count = document.getElementById("count").value;
    //    console.log(text,color);

    firebase.database().ref('notes/' + count + "/").set({
        text: text,
        color: color
    })

}

function displayTask(data) {
    // var i = 1;
    // for(i = 1;i<10;i++){
        firebase.database().ref('notes/'+4+"/").once('value').then(function (snapshot) {
            var text = snapshot.val().text;
            var color = snapshot.val().color;
            myFunction(text, color);
        }
    )
    // }
    
}

function errData(err) {
    console.log("error");
    console.log(err)
}

function myFunction(text, color) {
    var p = document.createElement("p");
    var p = document.getElementById("taskList")
    p.innerHTML = text;
    p.style.backgroundColor = color;
    p.style.color = "#FFFFFF";
    p.addEventListener("click",taskedit(text,color));
    var i = document.getElementById("delete");
    i.innerHTML = 'X';
    i.addEventListener("click",deleteNote);

}


function taskedit(text,color){
    document.getElementById("inputCity").value = text;
    document.getElementById("inputState").value = color;
    document.getElementById("count").value = 1;
}

function deleteNote(){
    ref = firebase.database().ref('notes/' + 2 + "/")
    ref.remove();
    refresh();
}

function refresh(){
    window.location.reload();
}

