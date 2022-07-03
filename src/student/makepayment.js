import { useState, useEffect } from 'react';
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentDetails } from "../queries/hooks";
import baseurl from "../config";
import axios from 'axios';
import Loader from '../components/Loader';

import { useHostelList } from '../queries/hooks';

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import feedback from '../assets/img/feedback.jpg'

const Payment = () => {
	const [studentData, setStudentData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hostelData, setHostelData] = useState([]);
	const [orderData, setOrderData] = useState([]);

	const getOrderHistory = async () => {
		const res = await axios.get(
		`${baseurl}/getPaymentHistory?studentid=${localStorage.getItem(localStorageKey.id)}`,
		{
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        }
		)

		setOrderData(res.data.message);
	}

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

    useEffect(() => {
    	getOrderHistory();
    	setHostelData(hostelList.data?.data);
    }, [studentData, loading === false]);

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

	        <div className=''>
	        	<h1 className='text-center text-2xl font-bold mt-4'>Recent Transactions</h1>
	        	<div className='mx-12 border-4 border-gray-300 rounded-xl'>
	        		<div className='grid grid-cols-4 bg-gray-200 border-b-2 border-black rounded-t-lg p-2 font-bold'>
	        			<h1 className='text-xl'>Payment ID</h1>
    					<h1 className='text-xl'>Date</h1>
    					<h1 className='text-xl'>Status</h1>
    					<h1 className='text-xl'>Amount</h1>
	        		</div>
	        		{
	        			orderData.length ? orderData.map((order, index) => (
	        				index % 2 == 0 ?
	        				<div className='grid grid-cols-4 bg-gray-100 p-2 ' key={index}>
	        					<h1 className='text-base'>{`${order.razorpay_payment_id.substring(0, 7)}...${order.razorpay_payment_id.substring(14)}`}</h1>
	        					<h1 className='text-base'>{order.updatedAt.substring(0, 10)}</h1>
	        					<h1 className='text-base w-16 text-center rounded-lg bg-green-500 text-white p-1'>{order.status}</h1>
	        					<h1 className='text-base'>{order.amount / 100}</h1>
	        				</div> :
	        				<div className='grid grid-cols-4 p-2' key={index}>
	        					<h1 className='text-base'>{`${order.razorpay_payment_id.substring(0, 7)}...${order.razorpay_payment_id.substring(14)}`}</h1>
	        					<h1 className='text-base'>{order.updatedAt.substring(0, 10)}</h1>
	        					<h1 className='text-base w-16 text-center rounded-lg bg-green-500 text-white p-1'>{order.status}</h1>
	        					<h1 className='text-base'>{order.amount / 100}</h1>
	        				</div>
	        			)) : <Loader />
	        		}
	        	</div>
	        </div>
	        

	        {hostelData?.name ?
	        	<div className='mx-auto text-center mt-2'>
	        		<h1>Hostel Name: {hostelData.name}</h1>
	        		<h1>Location: {hostelData.location}</h1>
	        		<h1>Fees: &#8377;{hostelData.fees}</h1>
	        	</div> :
	        	<svg
                  width="21px"
                  height="21px"
                  viewBox="0 0 21 21"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin text-2xl mx-auto"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m10.5 3.5v2" />
                    <path d="m15.5 5.5-1.5 1.5" />
                    <path d="m5.5 5.5 1.5 1.5" />
                    <path d="m10.5 17.5v-2" />
                    <path d="m15.5 15.5-1.5-1.5" />
                    <path d="m5.5 15.5 1.5-1.5" />
                    <path d="m3.5 10.5h2" />
                    <path d="m15.5 10.5h2" />
                  </g>
                </svg>
	    	}

	        {
	        	<div className="mx-auto text-center mt-4">
		          <button
		          	disabled={loading}
		            className="text-white bg-blue-500 transition-all hover:bg-blue-600 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
		            onClick={() => displayRazorpay(300)}
		          >
		            {loading ? (<h1 className='text-3xl animate-spin'>&#9696;</h1>) : <h1 className='text-2xl'>Pay</h1>}
		          </button>
		        </div>
	    	}
	      </div>
	      <div className="w-1/2 bg-no-repeat bg-cover bg-center h-screen" style={{ backgroundImage: `url(${feedback})` }} />
	    </div>
    );
};

export default Payment;
