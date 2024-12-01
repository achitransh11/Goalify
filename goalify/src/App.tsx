import React from "react";
import "./App.css";
import Main from "./components/main/Main";

import { UserProvider } from "./components/context/UserContext";
import { TaskProvider } from "./components/context/TaskContext";

function App() {
  return (
    <div className="App">
          <UserProvider>
      <TaskProvider>
      <Main /> {/* Home should now be inside BrowserRouter */}
      </TaskProvider>
    </UserProvider>
    </div>
  );
}

export default App;
