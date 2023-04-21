let count = 1;
document.getElementById("radio1").checked=true;

function nextImage (){
    count++;
    if(count>4){
        count=1;
    }

    document.getElementById("radio"+count).checked=true;
}

//Define que em determinado intervalo, a função irá repetir
setInterval(function(){
    nextImage();
}, 5000);

