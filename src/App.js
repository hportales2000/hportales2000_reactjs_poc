// @flow
import React, {Component} from 'react';
import './App.css';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import Login from './login/Login';
import RestaurantList from './restaurant-list/RestaurantList';
import {HashRouter as Router} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import Route from 'react-router-dom/es/Route';
import RestaurantManagement from './restaurant-management/RestaurantManagement';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            displayLoginView: true,
            displayRestaurantManagement: false,
            displayRestaurantList: false,
            restaurantData: null,
        };
    }

    render() {

        if (!this.state.authenticated) {
            return (
                <div className="App">
                    <Login onAuthenticated={this.onAuthenticated}/>
                </div>
            );
        }

        if (this.state.authenticated) {
            return(
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <RestaurantList />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/restaurant">
                            <RestaurantManagement addRestaurant={this.addRestaurant}/>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/restaurant/:id">
                            <RestaurantManagement addRestaurant={this.addRestaurant}/>
                        </Route>
                    </Switch>
                </Router>
            )
        }
    };

    onAuthenticated = (data) => {
        this.setState({authenticated: true});
    };

    addRestaurant = (data) => {
        const newRestaurantList = this.state.restaurantList.concat(data.data);
        this.setState({restaurantList: newRestaurantList});
    };
}

export default App;
