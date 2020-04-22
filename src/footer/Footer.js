import React, {Component} from "react";
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render = () => {
        return (
            <div className="footer text-center">
                <span>My First ReactJS App</span>
                <span>2020</span>
            </div>
        );
    }
}

export default Footer;
