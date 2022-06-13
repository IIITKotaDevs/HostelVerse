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
        'chelsea': ['Chelsea Market', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'comfortaa': ['Comfortaa', 'sans-serif'],
        'righteous': ['Righteous', 'sans-serif'],
        'fredoka': ['Fredoka One', 'sans-serif'],
      },
      colors: {
        'primary': 'rgba(241, 174, 0, 1)',
        'primary2': 'rgba(252, 209, 41, 1)',
        gray: {
          50: '#f7f7fb',
          75: '#d8ddec',
          150: '#ececec',
        },
        green: {
          50: '#e9fbee',
        },
        blue: {
          50: '#e4f5fd',
          75: '#cfe3e4',
        },
        yellow: {
          50: '#f5f9ea',
        }
      },
      fontSize: {
        'xxs': '10px',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [],
}
