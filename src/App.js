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
        zoom:13,
       
        feeds: [
          {
          created_at: "2019-11-09T04:28:46Z",
          entry_id: 1,
          field1: 16,
          field2: 76,
          field3: 0,
          field4: 12,
          },]
  };


  

  componentDidMount() {

  
    
    this.getsmoke();
    this.interval = setInterval(() => {
      this.getsmoke();
    }, 1500);
     
      
    
  }



  getsmoke() {
    fetch("https://api.thingspeak.com/channels/228181/feeds.json?")  //906153  //228181 //759839
      .then(res => {
        return res.json();
      })
      .then(res => {
      
       
        var b=this.state.feeds;
          
    let rando=(Math.floor(Math.random() * ((Math.floor(100)) - (Math.ceil(1)) + 1)) + 1);

    let ran=(Math.floor(Math.random() * ((Math.floor(100)) - (Math.ceil(1)) + 1)) + 1);
    //let run=(Math.floor(Math.random() * ((Math.floor(70)) - (Math.ceil(1)) + 1)) + 1);

  
        
        for(let i in b)
        {
        
          this.setState({lat:res.channel.latitude});
          this.setState({lng:res.channel.longitude});
       
           this.setState({
            gas:rando+"kg"
          });
        
          this.setState({
            field2:ran
          });
        
          if(ran>=75)
          {
            this.setState({
              gasdef:"Gas volume is Maximum Level"
            });
            document.getElementById("progress").style.backgroundColor="	#7FFF00";
            document.getElementById("smokedef").style.background="green";
          }
          else if(ran>=15 && ran<75)
          {
            this.setState({
              gasdef: "Gas volume is medium level"
            });
            document.getElementById("progress").style.backgroundColor="yellow";
            document.getElementById("smokedef").style.background="#FF7F50";
          }
          else
          {
            this.setState({
              gasdef: "Need to Refill the gas"
            });
            document.getElementById("progress").style.backgroundColor="red";
            document.getElementById("smokedef").style.background="red";
           //alert("ALERT! Gas quantity is low");
          }
          
         

          this.setState({
            gasper: ran+"%"
          });
        
        
          if(b[i].field3===1)
          {
            this.setState({
              smokedef:"Oh ! Gas is Leaking...."
            });
            //alert("ALERT! Oh my god Gas is leaking...");
            document.getElementById("textt").style.background="red";
           
          }
          else
          {
            this.setState({
              smokedef: "Clean Environment"
            });
            document.getElementById("textt").style.background="green";
          }
          


          this.setState({
            smokeper: b[i].field4+"%"
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
         <div style={{background: "#efree"}}> 

         <h4> <img src="Title.png" id="titleimg" alt="img"/> L.P.G Monitering System</h4>
      

           </div>
         
         <div className="containerr" id="containers">
       <h1>Gas Level</h1>
       <div className="container" id="containerrs" >

     <div className="skills" id="progress" style={{width:this.state.gasper,maxWidth:"100%"}}>{this.state.gasper}</div>
      </div>
      <input type="text" id="smokedef" value={this.state.gasdef} disabled/>
       <input type="text" id="text" value={this.state.gas} disabled/>
      
  


</div>





<div className="containerr">

<h1>Environment</h1>

<input type="text" id="textt" value={this.state.smokedef} disabled/>

                                
</div>

<div id="maps" style={{height:"500px",display:"flex",flexDirection:"column",border:"10px solid black",margin:"10px",background:"#0B253F"}} >
<h1 style={{marginLeft:"10px"}}>Location</h1>
<GoogleMapReact
  bootstrapURLKeys={{ key: "AIzaSyCpOGEryfLuAyGOQV0w94iPQAFko6sA5yI"}} // AIzaSyAURjs26CsEHQegexOTvQxcHGk0tbMqFM4       //AIzaSyCpOGEryfLuAyGOQV0w94iPQAFko6sA5yI
  defaultCenter={this.state.center}
  defaultZoom={this.state.zoom}
  yesIWantToUseGoogleMapApiInternals={true}
 
>
  <AnyReactComponent
    lat={this.state.center.lat}
    lng={this.state.center.lng}
    zoom={this.state.zoom}
    text={<Marker text="Im Here"/>}
  />
</GoogleMapReact>
      </div>
    <div style={{color:"white", margin:"40px",marginLeft:"20px",marginRight:"20px"}}>
   
   <i>RaspberryPi-based-Project@2019 Naveen reddy ,developed using react libraries.</i><br/>
   <i>Smart L.P.G Cylinder Monitering System - IoT Project.</i>
   <hr style={{color:"white"}}/>
   </div>


</div>
  );
     }
}

export default App;







