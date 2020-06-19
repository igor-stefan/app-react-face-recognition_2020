import React, { Component } from 'react'


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
           method: 'post',
           headers: {'Content-type': 'application/json'},
           body: JSON.stringify({
               name: this.state.registerName,
               email: this.state.registerEmail,
               password: this.state.registerPassword
           })
       })
       .then(response => response.json())
       .then(user => {
           if(user.id) {
               this.props.loadUser(user); 
               this.props.onRouteChange('home');
            }
       })
    }
    
    render(){
        return(
            <article className="mw5 center bg-none shadow-1 br4 pa3 mv3 ba b--black-10">
                <main className="pa1 black-80">
                <div className="measure">
                    <fieldset
                    id="sign_up" className="ba b--transparent ph0 mh0"
                    >
                    <legend className="center f2 b fw8 ph0 mh0">Register</legend>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Name</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text"
                            name="name"
                            id="name" 
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="w-90 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                         />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}
                        />

                    </div>
                    </fieldset>
    
                    <div className="">
                    <input
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow dim pointer f6 dib"
                        type="submit" 
                        value="Register"
                        onClick={this.onSubmitRegister}
                       />
                    </div>
                </div>
                </main>
            </article>
        );
    }
}

export default Register;