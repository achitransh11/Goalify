// import React from "react";
// import "./header.styles.css"
// import { useNavigate } from "react-router-dom";
// import { NAVIGATION_ROUTES } from "../../routes/routes.constants";
// const Header = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate(NAVIGATION_ROUTES.LOGIN); // Correct way to navigate
//   };
//   const handleLogOutClick = () => {
//     navigate(NAVIGATION_ROUTES.HOME); // Correct way to navigate
//   };
//   return (
//     <div className="parent_header-container">
//       <div className="App-logo">
//         <img src="https://goalify.netlify.app/images/logo-colored.svg" alt="goalify" />
//       </div>
//       <div className="right-section">
//         <ul>
//           <li onClick={handleLoginClick}>Login</li>
//           <li onClick={handleLogOutClick}>LogOut</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import "./header.styles.css";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../routes/routes.constants"; // Import your routes here

const Header = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLoginClick = () => {
    navigate(NAVIGATION_ROUTES.LOGIN); // Navigate to login page
  };

  const handleLogoutClick = () => {
    // Clear user session from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email"); // Optionally clear email if needed

    // Navigate to login page
    navigate(NAVIGATION_ROUTES.LOGIN);
  };

  return (
    <div className="parent_header-container">
      <div className="App-logo">
        <img src="https://goalify.netlify.app/images/logo-colored.svg" alt="goalify" />
      </div>
      <div className="right-section">
        <ul>
          {isLoggedIn ? (
            <li onClick={handleLogoutClick}>Logout</li> // Show logout if logged in
          ) : (
            <li onClick={handleLoginClick}>Login</li> // Show login if not logged in
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
