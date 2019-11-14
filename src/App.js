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
          field1: "75",
          field2: 1,
          field3: "15",
          field4: 0,
          field5: "567"
          },]
  };


  

  componentDidMount() {

    let rando=(Math.floor(Math.random() * ((Math.floor(70)) - (Math.ceil(1)) + 1)) + 1);

        let ran=(Math.floor(Math.random() * ((Math.floor(70)) - (Math.ceil(1)) + 1)) + 1);
        let run=(Math.floor(Math.random() * ((Math.floor(70)) - (Math.ceil(1)) + 1)) + 1);
        
        var randomcolor="rgb("+rando+"%,"+ran+"%,"+run+"%)"
         document.body.style.background=randomcolor;
    this.getsmoke();
    this.interval = setInterval(() => {
      this.getsmoke();
    }, 100);
     
      
    
  }



  getsmoke() {
    fetch("https://api.thingspeak.com/channels/228181/feeds.json?")  //906153  //228181
      .then(res => {
        return res.json();
      })
      .then(res => {
        var ch=res.channel;
       
        var b=this.state.feeds;
        
  
       
        
        for(let i in b)
        {
        
          this.setState({lat:ch.latitude});
          this.setState({lng:ch.longitude});

           this.setState({
            smoke: b[i].field1+"kg"
          });

          var d=b[i].field2;
          if(d===0)
          {
            this.setState({
              smokedef:"Cylinder gas is Full Level"
            });
            document.getElementById("progress").style.backgroundColor="#4CAF50";
            document.getElementById("smokedef").style.background="#4CAF50";
          }
          else if(d===0.5)
          {
            this.setState({
              smokedef: "Cylinder gas is medium level"
            });
            document.getElementById("progress").style.backgroundColor="yellow";
            document.getElementById("smokedef").style.background="yellow";
          }
          else
          {
            this.setState({
              smokedef: "Need to Refill the gas"
            });
            document.getElementById("progress").style.backgroundColor="red";
            document.getElementById("smokedef").style.background="red";
           //alert("ALERT! Gas quantity is low");
          }
          


          this.setState({
            smokeper: b[i].field3+"%"
          });

          var e=b[i].field4;
          if(e===1)
          {
            this.setState({
              gasdef:"Oh ! Gas is Leaking...."
            });
            //alert("ALERT! Oh my god Gas is leaking...");
            document.getElementById("textt").style.background="red";
           
          }
          else if(e===0)
          {
            this.setState({
              gasdef: "Clean Environment"
            });
            document.getElementById("textt").style.background="green";
          }
          


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
         
         <h2> <img src="Title.png" height="60px" width="50px" alt="img"/> L.P.G Cylinder Monitering System</h2>
         <div className="containerr" id="containers">
       <h1>Gas percentage</h1>

       <input type="text" id="text" value={this.state.smoke} disabled/>
       <input type="text" id="smokedef" value={this.state.smokedef} disabled/>
  
<div className="container" id="containerrs" >

  <div className="skills" id="progress" style={{width:this.state.smokeper}}>{this.state.smokeper}</div>
</div>

</div>





<div className="containerr">

<h1>Environment</h1>

<input type="text" id="textt" value={this.state.gasdef} disabled/>

                                
</div>
<h1 style={{marginLeft:"30px"}}>Location</h1>
<div id="maps" style={{height:"500px",display:"flex",flexDirection:"column",border:"10px solid black",margin:"10px"}} >
<GoogleMapReact
  bootstrapURLKeys={{ key: "AIzaSyAURjs26CsEHQegexOTvQxcHGk0tbMqFM4"}}
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
   
   <i>Copyright@2019 Naveen reddy ,developed using react libraries.</i><br/>
   <i>Smart L.P.G Cylinder Monitering System - IoT Project.</i>
   <hr style={{color:"white"}}/>
   </div>


</div>
  );
     }
}

export default App;







