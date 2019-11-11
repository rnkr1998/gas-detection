
function my()
{
var x=new XMLHttpRequest();
    x.open("GET","https://api.thingspeak.com/channels/906153/fields/1.json?",true);

x.send();
x.onload=function()
{
    var data=JSON.parse(x.responseText); 
     
    var b=data.feeds; 
    for(i in b)
    {
        var c=b[i].field1/2;
        var d=c*1000;
        document.getElementById("text").value=b[i].field1;
   
        document.getElementById("progress").style.width=d+"px";
        document.getElementById("progress").innerHTML=d+"%";
    }
     
    get();      
}


}

function get()
{
    var x=new XMLHttpRequest();
    x.open("GET","https://api.thingspeak.com/channels/906153/fields/2.json?",true);

x.send();
x.onload=function()
{
    var data=JSON.parse(x.responseText); 
     
    var b=data.feeds; 
    for(i in b)
    {
        var c=b[i].field2;
     
        document.getElementById("textt").value=b[i].field2;
        console.log(b[i].field2);
        document.getElementById("progresbar").style.width=c+"px";
        document.getElementById("progresbar").innerHTML=c+"%";
    } 
}
}
   