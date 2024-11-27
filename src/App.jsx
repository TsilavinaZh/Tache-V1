// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Admin from "./AdminUI";
// import UserChat from "./components/UserRoom";
// import UserChat2 from "./components/UserRoom2";
// import UserChat3 from "./components/UserRoom3";
// import NotFoundPage from "./components/NotFond";
// import Login from "./components/Login";

// export default function App() {
//   return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="admin" element={<Admin />} />
//           <Route path="Lanto" element={<UserChat />} />
//           <Route path="Marinah" element={<UserChat2 />} />
//           <Route path="Hanta" element={<UserChat3 />} />
//           <Route path="login" element={<Login />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Router>
//   );
// }



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./AdminUI";
import UserChat from "./components/UserRoom";
import UserChat2 from "./components/UserRoom2";
import UserChat3 from "./components/UserRoom3";
import NotFoundPage from "./components/NotFond";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="Lanto" element={<UserChat />} />
        <Route path="Marinah" element={<UserChat2 />} />
        <Route path="Hanta" element={<UserChat3 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
