import React, {Component} from "react";
import './RestaurantList.css'
import Modal from 'react-bootstrap/Modal';
import Route from 'react-router-dom/es/Route';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentAlt, faEdit, faStar, faTrash} from '@fortawesome/free-solid-svg-icons'

class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantList: [],
            filteredRestaurants: [],
            cuisines: [],
            showRemoveConfirmation: false,
            selectRestaurantToRemove: null
        };
    }

    render() {
        return (
            <div>
                {/*Confirmation Modal*/}
                <Modal show={this.state.showRemoveConfirmation} onHide={this.closeConfirmationPopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <div className="modal-message">Are you sure you want to remove the Restaurant?</div>

                        <button className="modal-button" onClick={this.removeSelectedRestaurant}>Yes</button>
                        <button className="modal-button" onClick={this.closeConfirmationPopup}>No</button>
                    </Modal.Body>
                </Modal>
                {/*Ends Confirmation Modal*/}

                <div className="row no-gutters form-group actions-box">
                    <div className="col-md-2 cuisine-filter">
                        <select id="restfilter" className="form-control" onChange={this.filterByCuisine}>
                            <option value="any">Choose a Cuisine</option>
                            {this.state.cuisines.map((cuisine, index) => {
                                return <option key={index} value={cuisine}>{cuisine}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select id="sortfilter" className="form-control" onChange={this.sortBy}>
                            <option value="any">Sort by</option>
                            <option value="ranking">Ranking</option>
                            <option value="asc">Rating: Low to High</option>
                            <option value="des">Rating: High to Low</option>
                        </select>
                    </div>
                    <div className="col add-restaurant-box">
                        <Route render={({history}) => (
                            <button className="btn btn-primary"
                                    type='button'
                                    onClick={() => {
                                        history.push('/restaurant')
                                    }}>
                                Add New Restaurant
                            </button>
                        )}/>
                    </div>
                </div>
                <div className="row no-gutters restaurant-container">
                    {this.state.restaurantList.map((rest, index) => {
                        let cuisines = rest["Cuisine Style"]
                            .substring(1, rest["Cuisine Style"].length - 2)
                            .split(",");
                        return (
                            <div className="restaurant-box" key={index}>
                                <div className="restinfo">
                                    <div className="restaurant-name">{rest["Name"]}</div>
                                    <i className="fas fa-map-marker"
                                       style={{color: "orangered", fontSize: "12px"}}/>
                                    &nbsp;
                                    <span className="restaurant-city">{rest["City"]}</span>
                                    <br/>
                                    <div className="restaurant-cuisines">
                                        <div>Cuisine Styles</div>

                                        {cuisines.map((cuisine, i) => {
                                            let cuisineToShow = cuisine.substring(1, cuisine.length - 1);
                                            cuisineToShow = cuisineToShow.includes("'") ? cuisineToShow.substring(1, cuisineToShow.length) : cuisineToShow;
                                            return (
                                                <div className="restaurant-cuisine" letiant="light" key={i}>
                                                    {cuisineToShow}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="sepline"/>
                                <div className="restaurant-stats">
                                    <div>
                                        <FontAwesomeIcon className="faIcon" icon={faCommentAlt}/>
                                        &nbsp;
                                        {rest["Number of Reviews"]}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className="faIcon" icon={faStar} />
                                        &nbsp;
                                        {rest["Rating"]}
                                    </div>
                                </div>
                                <div>
                                    <div className="action-btn">
                                        <Route render={({history}) => (
                                            <div className="remove-btn"
                                                    onClick={() => {
                                                        history.push('/restaurant/' + rest.id);
                                                    }}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                                <span className="action-item">Edit</span>
                                            </div>
                                        )}/>
                                    </div>
                                    <div className="action-btn remove-btn" onClick={() => this.handleRemoveRestaurant(index)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                        <span className="action-item">Remove</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getRestaurantList();
    }

    getRestaurantList = () => {
        let url = 'https://testapi.io/api/hportales2000/get-restaurant-list';
        fetch(url).then(response => response.json()).then(data => {
            this.setState({restaurantList: data});
            this.reRenderList();
        });
    };

    closeConfirmationPopup = () => {
        this.setState({'showRemoveConfirmation': false});
    };

    handleRemoveRestaurant = index => {
        this.setState({'selectRestaurantToRemove': index});
        this.setState({'showRemoveConfirmation': true});
    };

    removeSelectedRestaurant = () => {
        this.setState({
            'restaurantList': this.state.restaurantList.filter((restaurant, index) => {
                return index !== this.state.selectRestaurantToRemove;
            })
        });
        this.closeConfirmationPopup();
    };

    // filtering and sorting restaurant boxes
    filterByCuisine = () => {
        const e = document.getElementById("restfilter");
        const selected = e.options[e.selectedIndex].text;

        if (selected === "Select a Cuisine")
            this.setState({restaurantList: [...this.state.filteredRestaurants]});
        else {
            let restaurantList = this.state.filteredRestaurants.filter(item =>
                item["Cuisine Style"].toLowerCase().includes(selected.toLowerCase())
            );
            this.setState({restaurantList: restaurantList});
        }
    };

    sortBy = () => {
        let e = document.getElementById("sortfilter");
        let selected = e.options[e.selectedIndex].value;

        if (selected === "ranking")
            this.setState({restaurantList: [...this.state.filteredRestaurants]});
        else if (selected === "asc") {
            let restaurantList = [...this.state.restaurantList];
            restaurantList.sort(function (a, b) {
                return a["Rating"] - b["Rating"];
            });
            this.setState({restaurantList: restaurantList});
        } else {
            let restaurantList = [...this.state.restaurantList];
            restaurantList.sort(function (a, b) {
                return b["Rating"] - a["Rating"];
            });
            this.setState({restaurantList: restaurantList});
        }
    };
    //

    // preparing restaurantList to clean up Cuisines attributes. Setting restaurant lists states to by displayed
    reRenderList() {
        let cuisines = [];
        let restaurantList = [];
        for (let i = 0; i < this.state.restaurantList.length; i++) {
            restaurantList.push(this.state.restaurantList[i]);
            this.state.restaurantList[i]["Cuisine Style"]
                .substring(1, this.state.restaurantList[i]["Cuisine Style"].length - 2)
                .split(",")
                .forEach(cuisine => {
                    let c = cuisine.substring(1, cuisine.length - 1);
                    c = c.includes("'") ? c.substring(1, c.length) : c;
                    if (cuisines.indexOf(c) < 0) {
                        cuisines.push(c);
                    }
                });
        }

        this.setState({cuisines});

        this.setState({restaurantList: restaurantList}, () => {
            this.setState({filteredRestaurants: [...this.state.restaurantList]});
        });
    }


}

export default RestaurantList;