import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { Card, Button , Input , CardTitle, CardText ,Label ,Form, FormGroup} from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './app.css';

import joi from 'joi';
const axios=require('axios');
var userIcon =L.icon({
  iconUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize:[25,41],
  iconAnchor:[12.5,41],
  popupAnchor:[0,-41],
})
var myIcon =L.icon({
  iconUrl:'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red.png',
  iconSize:[30,41],
  iconAnchor:[12.5,41],
  popupAnchor:[0,-41],
})

const schema = joi.object().keys({
    name: joi.string().alphanum().min(1).max(30).required(),
    message: joi.string().min(1).max(100).required(),
});
const API_URl = window.location.hostname == 'localhost' ? 'http://localhost:5000/api/v1/messages':'URL';

export default class App extends React.Component
{
  constructor(props){
    super(props);
    this.formSubmitted = this.formSubmitted.bind(this);

  }
  state = {
   lat: 51.505,
   lng: -0.09,
   zoom: 2,
   haveloc:false,
   userMessage:{
     name:'',
     message:''
   },
   sendingMessage:false,
   sentMessage:false,
   messages:[]
  }
  componentDidMount()
  {  axios.get('http://localhost:5000/api/v1/messages')
      .then(res =>
        {this.setState({
           messages:res.data
        })
      })
    navigator.geolocation.getCurrentPosition((position) =>{
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        havloc:true,
        zoom:13,
      })
    } ,() => {
       console.log("location not given ");
       fetch('https://ipapi.co/json')
       .then(res => res.json())
        .then(location => {
            this.setState({
              lat:location.latitude,
              lng:location.longitude,
              haveloc:true,
              zoom:13,
            });
        });
    });
  };
  formSubmitted = (event) => {
    event.preventDefault();
    this.setState({
      sendingMessage:true
    })
    const userMessage ={
         name:this.state.userMessage.name,
         message:this.state.userMessage.message
    };

    const result=joi.validate(userMessage.schema);
    if(!result.error){
      axios.post(API_URl, ({
             ...userMessage,
             latitude:this.state.lat,
             longitude:this.state.lng,
           }))
       .then((res) => {
       console.log(`statusCode: ${res.statusCode}`)
       console.log(res)
       setTimeout(()=>{
         this.setState({
           sendingMessage:false,
           sentMessage:true
         });
       },4000);
      })
      .catch((error) => {
       console.error(error)
})
   }
  };
  valueChanged = (e) => {
           const {name,value} = event.target;
            this.setState((prevState) =>({
              userMessage: {
                ...prevState.userMessage,
                [name]:value
               }
            }))
  };
  render(){
  const position = [this.state.lat, this.state.lng]
   return (
     <div className="map">
     <Map className="map" center={position} zoom={this.state.zoom}>
         <TileLayer
           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker position={position} icon={myIcon}>
        <Popup>
           <strong>{this.state.userMessage.message}</strong>
         </Popup>
       </Marker>
       { this.state.messages ? this.state.messages.map(message=>(
         <li key={message._id}>
          <Marker position={[message.latitude,message.longitude]} icon={userIcon}>
         <Popup>
            <strong>{message.message}</strong>
          </Popup>
        </Marker>
        </li>
       )):''}
    </Map>
    <Card body className="msg-form">
    <CardTitle>Welcome to Guest app</CardTitle>
    <CardText>Leave a message with your location, Thanks for stopping by! </CardText>
    {!this.state.sentMessage && !this.state.sendingMessage ?
        ( <Form>
           <FormGroup role="form">
             <Label for="name">Name</Label>
             <Input onChange={this.valueChanged} type="text" name="name" id="name" placeholder="Enter you Name" />
             <Label for="message">Message</Label>
             <Input onChange={this.valueChanged} type="text" name="message" id="message" placeholder="Enter you Message" />
           </FormGroup>
            <Button className="centerButton" type="submit" onClick={this.formSubmitted} color="info">Send</Button>
            </Form>
       ): (this.state.sendingMessage ? <img alt="Loading ..." src="https://media.giphy.com/media/8rFvX2jLDn2vkVihUG/giphy.gif"></img>
       :<CardText>Thanks for Submitting a Message</CardText>)}
   </Card>
   </div>
  );
}
}


/*
fetch(API_URl,{
  method:'POST',
  header:{
    'content-type':'application/json',
  },
  body:({
    ...userMessage,
    latitude:this.state.lat,
    longitude:this.state.lng,
  })
})
.then(res => res.json())
.then(message=>{
  console.log(message);
});*/
