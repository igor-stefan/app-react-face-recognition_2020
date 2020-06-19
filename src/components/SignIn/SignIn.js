import React, {Component} from 'react'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
       fetch('http://localhost:3000/signin', {
           method: 'post',
           headers: {'Content-type': 'application/json'},
           body: JSON.stringify({
               email: this.state.signInEmail,
               password: this.state.signInPassword
           })
       })
       .then(response => response.json())
       .then(user => {
         if(user.id){
           this.props.loadUser(user);
           this.props.onRouteChange('home');
         }
       })
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <article className="mw5 center bg-none shadow-1 br4 pa3 mv3 ba b--black-10">
                <main className="pa1 black-80">
                <div className="measure">
                    <fieldset
                    id="sign_up" className="ba b--transparent ph0 mh0"
                    >
                    <legend className="center f2 b fw8 ph0 mh0">Sign In</legend>
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
                        <label className="db fw6 lh-copy f6"htmlFor="password" >Password</label>
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
                        className="b fw9 ph3 pv2 input-reset ba b--black bg-transparent grow dim pointer f6 dib"
                        type="submit" 
                        value="Sign in"
                        onClick={this.onSubmitSignIn}
                       />
                    </div>
                    <div className="lh-copy mt3">
                    <p
                    onClick={() => onRouteChange('register')} 
                    className="pointer f6 link dim black db">Register</p>
                    </div>
                </div>
                </main>
            </article>
        );
    }
}

export default SignIn;