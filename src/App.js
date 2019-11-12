import React,{Component} from 'react';
import './style.css';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';
const AnyReactComponent = ({ text }) => <div>{text}</div>;


class App extends Component
{

  state = {
    smoke: "",
    smokeper:"",
    smokedef:"",
   
    gasdef:"",
    gasper:"",
    center:{
      lat:31.251794,
      lng:75.70501
        },
        zoom:11
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
         <h2>L.P.G Cylinder Monitering System</h2>
         <div className="containerr">
       <h1>Gas percentage</h1>

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
<h1 style={{marginLeft:"30px"}}>Location</h1>
<div id="maps">
<GoogleMapReact
  bootstrapURLKeys={{ key: "AIzaSyAURjs26CsEHQegexOTvQxcHGk0tbMqFM4"}}
  defaultCenter={this.state.center}
  defaultZoom={this.state.zoom}
  yesIWantToUseGoogleMapApiInternals={true}
 
>
  <AnyReactComponent
    lat={this.state.center.lat}
    lng={this.state.center.lng}
    text={<Marker text="Im Here"/>}
  />
</GoogleMapReact>
      </div>
    <div style={{color:"white", margin:"40px",marginLeft:"20px",marginRight:"20px"}}>
   
   <i>Copyright@2019 Naveen reddy ,developed using react libraries.</i><br/>
   <i>Smart L.P.G Cylinder Monitering System - IoT Project.</i>
   <hr style={{color:"white"}}/>
   </div>


</div>
  );
     }
}

export default App;







