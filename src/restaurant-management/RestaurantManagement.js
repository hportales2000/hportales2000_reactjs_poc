// @flow
import React, {Component} from 'react';
import "./RestaurantManagement.css"
import Route from 'react-router-dom/es/Route';

class RestaurantManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: '',
            cuisineStyles: [],
            cities: [],
            selectedCuisines: [],
            selectedCity: ''
        };

        // TODO: if navigating with 'id' means we are editing an existing restaurant, fetch restaurant info by 'id' and populate form
        // const {id} = this.props.match.params;
        // alert(id);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className='col text-right'>
                        <Route render={({history}) => (
                            <span className="navigationLink" onClick={() => {
                                history.push('/')
                            }}>
                                Return to Restaurant List
                            </span>
                        )}/>
                    </div>
                    <div className='col login-box'>
                        <h3>Create a Restaurant</h3>
                        <form onSubmit={this.handleRestaurantCreation}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="restaurantName"
                                       value={this.state.restaurantName}
                                       onChange={this.handleNameChange.bind(this)}
                                       aria-describedby="restaurantName" placeholder="Restaurant Name"/>
                            </div>
                            <div className="form-group">
                                <select id="city" className="form-control" value={this.state.selectedCity}
                                        onChange={this.handleCityChange.bind(this)}>
                                    <option value="">Select a city</option>
                                    {this.state.cities.map((city, index) => {
                                        return <option key={index} value={city}>{city}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <ul className="city-options" id="cuisineList">
                                    <div className="cuisine-header">Cuisine Style</div>
                                    {this.state.cuisineStyles.map((cuisine, index) => {
                                        return <li key={index}>
                                            <input type="checkbox" value={cuisine}
                                                   onChange={this.handleCuisineChange.bind(this)}/>
                                            <span className="cuisine-option">{cuisine}</span>
                                        </li>;
                                    })}
                                </ul>
                            </div>
                            <div className="form-group text-center">
                                <input type="submit" className="btn btn-primary" id="submit" value='Create Restaurant'>

                                </input>
                            </div>
                        </form>
                    </div>
                    <div className='col'/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getRestaurantOptions();
    }

    getRestaurantOptions = () => {
        let url = 'https://testapi.io/api/hportales2000/get-restaurant-options';
        fetch(url).then(response => response.json()).then(data => {
            this.setState({cuisineStyles: data.cuisineStyles});
            this.setState({cities: data.cities});
        });
    };

    handleRestaurantCreation = (event) => {
        event.preventDefault();
        let url = 'https://testapi.io/api/hportales2000/add-restaurant';
        fetch(url, {
            method: 'POST',
            payload: {}
        }).then(response => response.json()).then(data => {
            console.log('Added Restaurant Data', this.getFormData());
            this.clearForm();
        });
    };

    handleNameChange = (event) => {
        let selected = event.target.value;
        this.setState({restaurantName: selected});
    };

    handleCuisineChange = (event) => {
        let index;
        let selectedCuisines = this.state.selectedCuisines;

        // check if the check box is checked or unchecked
        if (event.target.checked) {
            selectedCuisines.push(event.target.value);
        } else {
            // or remove the value from the unchecked checkbox from the array

            index = selectedCuisines.indexOf(event.target.value);
            selectedCuisines.splice(index, 1)
        }

        this.setState({selectedCuisines: selectedCuisines});
    };

    handleCityChange = () => {
        let e = document.getElementById("city");
        let selected = e.options[e.selectedIndex].text;

        if (selected === "Select a city")
            this.setState({selectedCity: ''});
        else {
            this.setState({selectedCity: selected});
        }
    };

    getFormData() {
        return {
            "Name": this.state.restaurantName,
            "City": this.state.selectedCity,
            "Cuisine Style": this.state.selectedCuisines
        };
    }

    clearForm() {
        this.setState({restaurantName: ''});
        this.setState({selectedCity: ''});
        this.setState({selectedCuisines: []});
        //TODO: to be improved :)
        let e = document.getElementById("cuisineList");
        for(let i = 1; i < e.children.length; i++){
           e.children[i].children[0].checked = false;
        };
    }
}

export default RestaurantManagement;
