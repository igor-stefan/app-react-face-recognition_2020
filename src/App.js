import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import Particles from 'react-particles-js';
import {particleOptions} from './particle.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'

class App extends Component {
  render(){
    return (

      <div className="App">
      <Particles 
        className = 'particles'
        params={particleOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      
      {/*
        <FaceRecognition />
      */
      }
    </div>
    )
  }
}

export default App;