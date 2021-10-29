import React from "react";
import axios from "axios";
import PaymentsContext from "../payments/paymentsContext";
import {navigate} from "@reach/router";


export default function OrderState(props) {
    const createPaymentIntent = async (basketId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payments/${basketId}`, {
            basketId: basketId
        })

        console.log('response ', response);
        await navigate('/checkout');

        return response.data;
    }

    return (
        <PaymentsContext.Provider
            value={{
                createPaymentIntent
            }}
        >
            {props.children}
        </PaymentsContext.Provider>
    );


}
