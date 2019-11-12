import React,{Component} from 'react';
import './style.css';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';

class App extends Component
{

  state = {
    smoke: "",
    smokeper:"",
    smokedef:"",
   
    gasdef:"",
    gasper:"",
    center:{
      lat:51.527452,
      lng:-0.124975
        }
  };





  componentDidMount() {
    this.getsmoke();
    this.interval = setInterval(() => {
      this.getsmoke();
    }, 100);

    
  }



  getsmoke() {
    fetch("https://api.thingspeak.com/channels/228181/feeds.json?")
      .then(res => {
        return res.json();
      })
      .then(res => {

        var b=res.feeds;
        for(let i in b)
        {
          var c=b[i].field1; 
        
        if(c<=15)
        {
          document.getElementById("progress").style.backgroundColor="red";
        }
        else if(c>=16 && c<=70)
        {
          document.getElementById("progress").style.backgroundColor="yellow";
        }
        else
        {
          document.getElementById("progress").style.backgroundColor="#4CAF50";
        }



           this.setState({
            smoke: b[i].field1+"kg"
          });
          this.setState({
            smokedef: b[i].field2
          });
          this.setState({
            smokeper: b[i].field1+"%"
          });
          this.setState({
            gasdef: b[i].field4
          });
          this.setState({
            gasper: b[i].field5+"%"
          });
        }
      
      });
  }

 
  



  



componentWillUnmount() {
  clearInterval(this.interval);
}

  render()
  {
     return(

       <div className="App">
         <h2>L.P.G Monitering System</h2>
         <div className="containerr">
       <h1>Volume of gas</h1>

       <input type="text" id="text" value={this.state.smoke} disabled/>
       <input type="text" id="smokedef" value={this.state.smokedef} disabled/>
  
<div className="container" >

  <div className="skills" id="progress" style={{width:this.state.smokeper}}>{this.state.smokeper}</div>
</div>

</div>





<div className="containerr">

<h1>Environment</h1>

<input type="text" id="textt" value={this.state.smokedef} disabled/>

<p>{this.state.gasdef}</p>                                   
</div>

<div className="Map">

<GoogleMapReact
   center={this.state.center}
   zoom={5}
>
<Marker
       
       lat={this.state.center.lat}
       lng={this.state.center.lng}
    
   ></Marker>
</GoogleMapReact>
</div>

    




</div>
  );
     }
}

export default App;







