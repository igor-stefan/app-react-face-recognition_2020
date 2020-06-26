import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation.js'
import Logo from '../components/Logo/Logo.js'
import Particles from 'react-particles-js';
import {particleOptions} from './particle.js'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js'
import Rank from '../components/Rank/Rank.js'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import SignIn from '../components/SignIn/SignIn.js'
import Register from '../components/Register/Register.js'


const initialState = 
{
input: '',
imageUrl: '',
boxes:[],
route: 'signin',
isSignedIn: false,
user:
{
  id:'',
  name:'',
  email:'',
  password:'',
  entries: 0 ,
  joined: ''
}
}


class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries ,
      joined:  data.joined
    }})
  }

  onRouteChange = (place) => {
    (place === 'signin' || place === 'register')?
    this.setState(initialState):
    this.setState({isSignedIn: true});
    this.setState({route:place});
  }

  checkImage = (src) => {
    const checks = {};
    const img = new Image();
    img.src = src;
    let status;
    return new Promise((resolve, reject) => {
      
      img.onerror = () => {
        checks[src] = false;
        status=false;
        resolve(status);
      };
      img.onload = () => {
        checks[src] = true;
        status=true;
        resolve(status);
                }
    })
  }

  calculatePointsInImage = (actualFace,width,height) => {
    const points = {};
    points.leftCol = actualFace.left_col*width;
    points.topRow = actualFace.top_row*height;
    points.rightCol = width*(1.0-actualFace.right_col);
    points.bottomRow = height*(1.0-actualFace.bottom_row);
    return points;
  }

  calculateFaceLocation = (data) => {
    let arrayOfFacePoints = [];
    const faceLocationCoordinates = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    for(let actualFace of faceLocationCoordinates){
      actualFace = actualFace.region_info.bounding_box;
      arrayOfFacePoints.push(this.calculatePointsInImage(actualFace,width,height));
      }
      return arrayOfFacePoints;
    }

  boxesOutlineFace = (boxes_points) => {
    this.setState({boxes: boxes_points})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  detectFace = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl',{ //request to backend to make api call
            method:'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              input:this.state.input
            })
          })
      .then(response => response.json()) //get response
      .catch(err => console.log('ERROR!',err))
      .then(response => { //if response comes
        console.log('response = ',response);
        if(response.outputs[0].data.regions != null){ //send to backend to increment entries
          fetch('http://localhost:3000/image',{
            method:'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            }) //send the id of user to filter in database
          })
        .then(response => response.json()) //get the response
        .then(count => { //change te count of entries of user in frontend
          this.setState(Object.assign(this.state.user,{entries:count})) //setState END
        }) //count END
        .catch(err => console.log(err));
        this.boxesOutlineFace(this.calculateFaceLocation(response)) //calculate the points of box
        } //if response END
        else{
          this.boxesOutlineFace([{}]);
        }
      })
      .catch(err => console.log('ERROR:',err)); //if has a error then catch
      this.setState({input: ''}); //clear input
  }

  onButtonSubmit = () => {
    if( this.state.input == null || !this.state.input) {return}
    this.checkImage(this.state.input)
    .then(isImage => {isImage? this.detectFace() : this.setState({input:''})})
  }
  
  render(){
    const { isSignedIn,imageUrl,boxes,route,input,user } = this.state;
    return (
      <div className="App">
      <Particles 
        className = 'particles'
        params={particleOptions}
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { (route === 'signin')?
        <SignIn onRouteChange={this.onRouteChange}  loadUser={this.loadUser} />
        :(route === 'home'? 
          <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            valueField={input}
        />
          <FaceRecognition boxesOutlineFace={boxes} imageUrl={imageUrl} />
          </div> :
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
      }
    </div>
    )
  }
}

export default App;
