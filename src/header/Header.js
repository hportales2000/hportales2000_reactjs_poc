import React, {Component} from "react";
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="row no-gutters header-box">
                <div className="col site-name">
                    <h1>Restaurant Guide Management</h1>
                </div>
            </div>
        );
    };
}

export default Header;
