# HostelVerse

HostelVerse is a Hostel Management System, which aims to digitize and automate the daily and monotonic tasks that a Hostel Warden or Caretaker does.

## Features

- Sign up for students using their college email id
- Automated Hostel Allotment Procedure, based on higher priority to the farthest students
- Creating Leave Applications, Room Issues that the warden can Resolve/Approve/Reject online
- Statistics for Admin, like Hostel Occupancy Rate, Issue Clearance Rate for Wardens
- Create Feedback for the hostels and give them rating
- Location based Check In/Check Out for monitoring attendance of Students

## Tech Stacks

### Frontend

- [ReactJS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) - for styling
- [GeoLocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - for getting the location of the user
- [Material UI](https://mui.com/) - for the UI
- [React Query](https://react-query.tanstack.com/) - for fetching data from the server and caching it
- [Redux Toolkit](https://redux-toolkit.js.org/) - for better state management
- [Bad-Words](https://www.npmjs.com/package/bad-words) - To filter bad words from the input
- [Font Awesome Icon](https://fontawesome.com/) - for the icons
- [Headless UI](https://headlessui.dev/) - for the UI components

### Backend

- [Azure Functions](https://azure.microsoft.com/en-in/services/functions) - Serverless Backend Technology
- [Typescript](https://www.typescriptlang.org/)
- [Azure CosmosDB API for MongoDB](https://sentry.io/) - A gloabally distributed database hosted on Azure
- [Sentry](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb/mongodb-introduction) - Application monitoring and error tracking software
- [@hapi/iron](https://hapi.dev/module/iron/) - A more secure protocol for encrypting data in form of tokens
- [Mongoose](https://mongoosejs.com/)

## Screenshots

![image](https://user-images.githubusercontent.com/74523865/170877933-f461b609-58db-4d56-830c-c023268caa43.png)
![image](https://user-images.githubusercontent.com/74523865/170877968-b8e21b7a-5520-4fc9-834e-f960c2c4f037.png)

## Installation

Install HostelVerse with yarn/npm.

Clone the repository

```bash
  git clone https://github.com/IIITKotaDevs/HostelVerse.git
```

Install Node modules

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## Future Milestones

- Integrate a payment gateway like Stripe, RazorPay for students to pay their hostel fees
- Chat with Warden: Students should be able to chat with the warden in case of any urgent matters
- Emergency Beacon: Students can use the emergency beacon to send a distress signal to the emergency services present at the campus

## Contributors

- [@VinVash](https://github.com/VinVash)
- [@HimanshuChittora](https://github.com/HimanshuiChittora)
- [@RaghhavDTurki](https://github.com/RaghhavDTurki)
