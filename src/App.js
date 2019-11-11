import React,{Component} from 'react';
import './style.css';




class App extends Component
{

componentDidMount()
{
  var x=new XMLHttpRequest();
   x.open("GET","https://api.thingspeak.com/channels/906153/fields/1.json?",true);

x.send();
x.onload=function()
{
     var i;
    var data=JSON.parse(x.responseText); 
    
    var b=data.feeds; 
    for(i in b)
    {
        var c=b[i].field1/3000;
        var d=c*100;
        document.getElementById("text").value=b[i].field1+"kg";
   
        document.getElementById("progress").style.width=d+"px";
        document.getElementById("progress").innerHTML=d+"%";
    }
     
          
}

 this.handler();
}


handler = () => 
{
  var x=new XMLHttpRequest();
  x.open("GET","https://api.thingspeak.com/channels/228181/fields/2.json?",true);

x.send();
x.onload=function()
{
  var j;
    var dataa=JSON.parse(x.responseText); 
     
    var y=dataa.feeds; 
    for(j in y)
    {
        var f=y[j].field2;
     
        document.getElementById("textt").value=y[j].field2;
       
        document.getElementById("progresbar").style.width=f+"px";
        document.getElementById("progresbar").innerHTML=f+"%";
    } 
}
}
  render()
  {
     return(
       <div className="App">
       <h1 onClick={this.handler}>Weight Percentage</h1>

       <input type="text" id="text" disabled/>
<br/><br/>
<div className="container">
  <div className="skills" id="progress"></div>
</div>

<h1>Smoke Percentage</h1>
<input type="text" id="textt" disabled />
<br/><br/>
<div className="container">
  <div className="skills" id="progresbar"></div>
</div>
</div>  
  );
     }
}

export default App;
