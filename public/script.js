let btnESend = document.getElementById("btnESend");
let ESubjectI = document.getElementById("ESubject");
let ETextI = document.getElementById("EText");
let EmailI = document.getElementById("EMail");
let Email2I = document.getElementById("Email2");
let Email3I = document.getElementById("Email3");
let newEmailBtn = document.getElementById("newEmail");
let toggleNewEmail = document.getElementById("toggleNewEmail");
let btnSave = document.getElementById("btnSave");
let fileName = document.getElementById("fileName");

btnSave.addEventListener("click", function(){
    const data = ETextI.value;

    const blob = new Blob([data]) ;
    
    const href = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = href;
    a.style.display = "none";
    a.download = fileName.value + ".txt";
    
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
})

let allEmail = [];

let ESubject = "";
let EText = "";

newEmailBtn.addEventListener("click", function(){
    for(let clearAllEmail of allEmail){
        allEmail.pop(clearAllEmail);
    }

    allEmail.push(EmailI.value); 
    allEmail.push(Email2I.value);
    allEmail.push(Email3I.value);
    console.log(allEmail);
})

ESubjectI.addEventListener("change", function(){
    ESubject = ESubjectI.value;
    console.log("e subject: " + ESubject);
})

ETextI.addEventListener("change", function(){
    EText = ETextI.value;
})


toggleNewEmail.addEventListener("click", function(){
    if(toggleNewEmail.style.backgroundColor == "red"){
        toggleNewEmail.style.backgroundColor = "green";
        Email2I.style.visibility = "visible";
        Email3I.style.visibility = "visible";
        newEmailBtn.style.top = "210px";
        btnESend.style.top = "260px";
        fileName.style.top = "310px";
        btnSave.style.top = "360px";
    }
    else{
        toggleNewEmail.style.backgroundColor = "red";
        Email2I.style.visibility = "hidden";
        Email3I.style.visibility = "hidden";
        newEmailBtn.style.top = "110px";
        btnESend.style.top = "160px";
        fileName.style.top = "210px";
        btnSave.style.top = "260px";
    }
})


btnESend.addEventListener("click", function(){
    console.log("button works");

    fetch("/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            recipient: allEmail,
            subject: ESubject,
            text: EText
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Fehler bei der Anfrage: " + error);
    });
});
