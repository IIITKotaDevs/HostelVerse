import { Fragment, useState, useEffect, useCallback } from 'react';
import TextField from "@material-ui/core/TextField";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentDetails } from "../queries/hooks";
import baseurl from "../config";
import axios from 'axios';

const Payment = () => {
	const [amount, setAmount] = useState('');
	const [orderid, setOrderid] = useState('');
	const [receiptid, setReceiptid] = useState('');
	const [studentData, setStudentData] = useState([]);
	const [paymentid, setPaymentid] = useState('');
	const [signature, setSignature] = useState('');

	const studentDetails = useStudentDetails({
	    studentid: localStorage.getItem(localStorageKey.id),
    });

    useEffect(() => {
	    setStudentData(studentDetails?.data?.student);
	    // console.log(studentDetails?.data?.student);
	}, [studentDetails]);	

	const getOrderID = async (e) => {
		e.preventDefault();

		const res = await axios.post(
        `${baseurl}/createOrder`,
        {
          studentid: localStorage.getItem(localStorageKey.id),
          hostelid: studentData?.hostelid,
          name: studentData?.profile?.name,
          contactno: studentData?.profile?.contactno,
          email: studentData?.email,
          amount: 3000,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        });

        console.log(res.data.data.orderid);
        setOrderid(res.data.data.orderid);
        setReceiptid(res.data.data.receiptid);
	}

	const loadScript = async (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;

			script.onload = () => {
				resolve(true);
			}

			script.onerror = () => {
				resolve(false);
			}

			document.body.appendChild(script);
		})
	}

	const displayRazorpay = async (amount) => {
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
		console.log('loaded');

		if(!res) {
			alert('You are offline! Failed to load Razorpay!');
			return
		}

		const options = {
			key: "rzp_test_QYbGQZv8esMMkg",
			currency: "INR",
			amount: 3000,
			name: "Hostelverse",
			description: "Thanks for paying the fees!",
			order_id: orderid,

			handler: async function (response) {
				alert(response.razorpay_payment_id);
				await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
				alert('Payment successful!');
			},
			prefill: {
				name: "Hostelverse"
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	const verifyPayment = async(paymentId, orderId, sign) => {

		const res = await axios.post(
        `${baseurl}/verifyPayment`,
        {
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: sign,
          receipt_id: receiptid
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        });

        console.log(res);
	}

    return (
    	<Fragment>
	        <h1 className='text-center text-3xl font-bold text-blue-500'>Payment Page</h1>
	        
	        <div className='mx-auto text-center'>
	        	<TextField
	            id="amount"
	            value={amount}
	            onChange={(e) => setAmount(e.target.value)}
	            label="Amount"
	            variant="standard"
	            className=""
          		/>	
	        </div>

	        <button className='mx-12 rounded-lg hover:bg-blue-500 text-white text-center p-4 bg-blue-400' onClick={getOrderID}>Get Order ID</button>

	        <button className='mx-12 rounded-lg hover:bg-blue-500 text-white text-center p-4 bg-blue-400' onClick={() => displayRazorpay(300)}>Pay</button>
        </Fragment>
    );
};

export default Payment;
