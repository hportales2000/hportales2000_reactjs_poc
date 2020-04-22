import React from 'react';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            isUserNameValid: false,
            password: '',
            isPasswordValid: false,
            isSubmitted: false
        }
    }

    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className='col'/>
                    <div className='col login-box'>
                        <h3>Login</h3>
                        <form onSubmit={this.handleLoginSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="userName"
                                       value={this.state.userName}
                                       onChange={this.handleUserNameChange.bind(this)}
                                       aria-describedby="userName" placeholder="User Name">
                                </input>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="password"
                                       value={this.state.password}
                                       onChange={this.handlePasswordChange.bind(this)}
                                       aria-describedby="password" placeholder="Password">

                                </input>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" id="submit" value='Login'>

                                </input>
                            </div>
                            <div className="alert-danger">
                                {this.state.isSubmitted && (this.state.isUserNameValid === false || this.state.isPasswordValid === false ) ? 'All fields are required' : ''}
                            </div>
                        </form>
                    </div>
                    <div className='col'/>
                </div>
            </div>
        );
    }

    // Validating fields are not empty. Regex and more validations can be added
    handleUserNameChange = (event) => {
        this.setState({userName: event.target.value});
        if (event.target.value !== '') {
            this.setState({isUserNameValid: true});
        } else {
            this.setState({isUserNameValid: false});
        }
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        if (event.target.value !== '') {
            this.setState({isPasswordValid: true});
        } else {
            this.setState({isPasswordValid: false});
        }
    };
    //

    handleLoginSubmit = (event) => {
        event.preventDefault();
        // TODO: fetch credentials and allow or not navigation. I'm using props to display components in AppJs
        this.setState({isSubmitted: true});
        if((this.state.isUserNameValid === true && this.state.isPasswordValid === true)){
            this.props.onAuthenticated();
        }
    }
}

export default Login;
