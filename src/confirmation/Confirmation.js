import React from 'react';

class Confirmation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render = () => {
        const payment = this.props.payment;
        return (
            <div className="App">
                <h1>Confirmation Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <h3>Thank you for your payment!</h3>
                    </div>
                    <div className='form-group'>
                        <label className='font-weight-bold'>Payment confirmation number: </label>
                        <span>&nbsp;</span>
                        <span>{payment.confirmationNumber}</span>
                    </div>
                    <div className='form-group'>
                        <label className='font-weight-bold'>Amount: </label>
                        <span>&nbsp;</span>
                        <span>${payment.amount}</span>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>Make another Payment</button>
                    </div>
                </form>
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onMakeAnotherPaymentSubmit();
    }

}

export default Confirmation;
