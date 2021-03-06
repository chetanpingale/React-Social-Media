/**
 * Created by chetan on 14/01/18.
 */
import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button, Grid, Panel} from 'react-bootstrap';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
    }
    handleButtonClick() {
        let provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        provider.setCustomParameters({
            'allow_signup': 'false'
        });
        let that = this

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            let token = result.credential.accessToken;
            let user = result.user;
            that.navigateToHome(result)
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    }
    navigateToHome (result) {
        debugger
        const data = JSON.stringify(result);
        localStorage.setItem('firebaseAuthResponse', data);
        this.props.history.push('/repository');

    }
    render() {
        return (
            <Grid className='home-container'>
                <Panel>
                    Login using social media (GitHub)<br />
                    Click Button below to proceed...
                </Panel>
                <Button bsStyle='primary' onClick={() => this.handleButtonClick()}>GitHub Login</Button>
            </Grid>
        )
    }
}

export default withRouter(Home)
