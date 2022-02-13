import React from 'react'

export default function Dashboard() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

    var objToday = new Date(),
        domEnder = (function () {
            var a = objToday;
            if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
            a = parseInt((a + "").charAt(1));
            return 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th";
        })(),
        dayOfMonth =
            today + (objToday.getDate() < 10)
                ? "0" + objToday.getDate() + domEnder
                : objToday.getDate() + domEnder,
        months = new Array(
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear();
    var today = dayOfMonth + " " + curMonth + ", " + curYear;

    const data = [
        {
            title: "Hostel No.",
            value: "1",
        },
        {
            title: "Room No.",
            value: "101",
        },
        {
            title: "Hostel No.",
            value: "1",
        },
        {
            title: "Room No.",
            value: "101",
        },
    ];
    return (
        <div className="px-16 py-10 bg-dashboard bg-cover h-screen">
            <p className="font-medium text-gray-800 text-xl">{time}</p>
            <p className="font-bold text-4xl text-primary mt-2">{today}</p>
            <div className="mt-16 flex items-center gap-8">
                <img src={man} alt="" className="w-32" />
                <div className="flex flex-col gap-1">
                    <p className="text-gray-800 font-medium text-xl">Welcome</p>
                    <p className="text-black font-bold text-3xl">Wade Warren</p>
                    <p className="text-gray-800 font-medium text-xl">
                        Have a good day !!!
                    </p>
                </div>
            </div>
            <div className="flex gap-8 mt-8">
                {data.map((item, index) => (
                    <div key={index} className="text-center bg-primary2 p-6 rounded">
                        <p className="text-sm">{item.title}</p>
                        <p className="font-bold italic font-nunito text-3xl">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
            <p className="text-xl font-bold mt-10 mb-2">Check In / Out</p>
            <button className="bg-green-700 w-1/3 text-white font-bold py-2 rounded-full text-lg">
                IN
            </button>
            <p className="text-xs mt-1">
                Pro Tip: Click on the button to Check In or Check Out.
            </p>
        </div>
    )
}
