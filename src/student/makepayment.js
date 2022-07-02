import { useState, useEffect } from 'react';
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentDetails } from "../queries/hooks";
import baseurl from "../config";
import axios from 'axios';

import { useHostelList } from '../queries/hooks';

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import feedback from '../assets/img/feedback.jpg'

const Payment = () => {
	const [studentData, setStudentData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [payDisable, setPayDisable] = useState(true);
	const [hostelData, setHostelData] = useState([])

	const studentDetails = useStudentDetails({
	    studentid: localStorage.getItem(localStorageKey.id),
    });

    useEffect(() => {
	    setStudentData(studentDetails?.data?.student);
	    localStorage.setItem('hostelid', studentDetails?.data?.student.hostelid);
	}, [studentDetails]);

	const hostelList = useHostelList({
		hostelid: localStorage.getItem('hostelid'),
    })

	const getOrderID = async () => {

		const res = await axios.post(
        `${baseurl}/createOrder`,
        {
          studentid: localStorage.getItem(localStorageKey.id),
          hostelid: studentData?.hostelid,
          name: studentData?.profile?.name,
          contactno: studentData?.profile?.contactno,
          email: studentData?.email,
          amount: hostelData.fees + '00',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        });

        localStorage.setItem('orderID', res.data.data.orderid);
        localStorage.setItem('receiptID', res.data.data.receiptid);
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

	const displayRazorpay = async () => {
		setLoading(true);
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

		if(!res) {
			alert('You are offline! Failed to load Razorpay!');
			return
		}

		await getOrderID();

		const options = {
			key: "rzp_test_QYbGQZv8esMMkg",
			currency: "INR",
			amount: hostelData.fees + '00',
			name: "Hostelverse",
			description: "Pay fees for the current semester",
			order_id: localStorage.getItem('orderID'),

			handler: async function (response) {

				await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
				alert('Payment successful!');
				setLoading(false);
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
          receipt_id: localStorage.getItem('receiptID'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        });

        if (res) {
        	localStorage.removeItem('orderID');
        	localStorage.removeItem('receiptID');
        }
	}

    return (
    	

        <div className="flex">
	      <div className="my-auto w-1/2">
	        <div className="flex flex-col items-center">
	          <div className="bg-gray-200 px-3 py-2.5 rounded-full border-4 border-gray-300 shadow-lg">
	            <FontAwesomeIcon icon={solid("indian-rupee-sign")} size="2x" className="text-red-400 rounded-full" />
	          </div>
	          <h1 className="text-3xl font-bold mt-4 text-gray-800">Pay Fees Form</h1>
	        </div>

	        <div className="mx-auto text-center mt-2">
	          <button
	            className="text-white bg-gray-700 transition-all hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
	            onClick={() => {
	            	setHostelData(hostelList.data?.data)
	            	setPayDisable(false)
	            }}
	          >
	            Get Fee Details
	          </button>
	        </div>

	        {hostelData.name &&
	        	<div className='mx-auto text-center mt-2'>
	        		<h1>Hostel Name: {hostelData.name}</h1>
	        		<h1>Location: {hostelData.location}</h1>
	        		<h1>Fees: &#8377;{hostelData.fees}</h1>
	        	</div>
	    	}

	        { !payDisable &&
	        	<div className="mx-auto text-center mt-4">
		          <button
		          	disabled={loading || payDisable}
		            className="text-white bg-blue-500 transition-all hover:bg-blue-600 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
		            onClick={() => displayRazorpay(300)}
		          >
		            {loading || payDisable ? (<h1 className='text-3xl animate-spin'>&#9696;</h1>) : <h1 className='text-2xl'>Pay</h1>}
		          </button>
		        </div>
	    	}
	      </div>
	      <div className="w-1/2 bg-no-repeat bg-cover bg-center h-screen" style={{ backgroundImage: `url(${feedback})` }} />
	    </div>
    );
};

export default Payment;
