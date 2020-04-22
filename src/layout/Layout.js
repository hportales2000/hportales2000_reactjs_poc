import React, {Component} from "react";
import App from "../App";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <Header onLogout = {this.logout}/>
                </header>
                <App/>
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    };

}

export default Layout;
