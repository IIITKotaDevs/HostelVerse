module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-background': 'url("/src/assets/img/LandingBackground.png")',
        'dashboard': 'url("/src/assets/img/dashboard.png")',
        'leave-application': 'url("/src/assets/img/LeaveApplication.png")',
        'room-issue': 'url("/src/assets/img/RoomComplaint.png")',
        'profile': 'url("/src/assets/img/profile.png")',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        'primary': 'rgba(241, 174, 0, 1)',
        'primary2': 'rgba(252, 209, 41, 1)',
      },
      fontSize: {
        'xxs': '10px',
      },
    },
  },
  plugins: [],
}
