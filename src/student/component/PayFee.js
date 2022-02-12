import React from "react";

const PayFeeItem = () => {
  return (
    <div className="my-8 py-4 mx-52 rounded-xl p-8 flex-row border-4 border-gray-500 flex shadow-xl">
      <div className=" flex-grow flex-col">
        <h1 className="text-xl">Pay Hostel Fees</h1>
        <div className="flex-row flex">
          <h1>Pay with : </h1>
          <h1 className="mx-2">Paytm</h1>
        </div>
      </div>
      <h1 className="text-2xl"> Rs 5000</h1>
    </div>
  );
};

const PayFeeLogItem = () => {
  return (
    <div className="my-8 py-4 mx-52 rounded-xl p-8 flex-row border-4 border-gray-500 flex shadow-xl">
      <div className=" flex-grow flex-col">
        <h1 className="text-xl">Hostel Fees</h1>
        <h1>22 December, 2021 </h1>
      </div>
      <div>
        <h1 className="text-2xl"> Rs 5000</h1>
        <h1> via Paytm</h1>
      </div>
    </div>
  );
};

export const PayFee = () => {
  return (
    <div className="">
      <h1 className="text-5xl text-center my-16">Pay Fees</h1>
      <PayFeeItem />
      <PayFeeItem />
      <h1 className="text-5xl text-center my-16">Payment Log</h1>
      <PayFeeLogItem />
      <PayFeeLogItem />
      <PayFeeLogItem />
    </div>
  );
};
