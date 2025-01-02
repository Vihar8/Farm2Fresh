// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import { Outlet } from "react-router-dom";
// import SidebarMenu from "../components/Sidebar";

// const LayoutAdmin = ({ children }) => {
//   const [menuCollapse, setMenuCollapse] = useState(true);

//   // const handleResize = () => {
//   //   if (window.innerWidth <= 768) {
//   //     setMenuCollapse(true);
//   //   } else {
//   //     setMenuCollapse(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   handleResize(); // Set the initial state based on screen size
//   //   window.addEventListener('resize', handleResize);

//   //   return () => {
//   //     window.removeEventListener('resize', handleResize);
//   //   };
//   // }, []);
//   return (
//     <>
//       <Header menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />

//       <SidebarMenu menuCollapse={menuCollapse} />
      
//       <div className={`adminLayout ${menuCollapse ? 'pl-0 md:pl-[100px]  md:pb-[20px]' : "pl-0 md:pl-[205px]"}`}>
//         {children}
//       </div>
//     </>
//   );
// };

// export default LayoutAdmin;


import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import SidebarMenu from "../components/Sidebar/Sidebar";

const LayoutAdmin = ({ children }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  // Example to handle resizing for collapsing or expanding the sidebar
  // const handleResize = () => {
  //   if (window.innerWidth <= 768) {
  //     setMenuCollapse(true);
  //   } else {
  //     setMenuCollapse(false);
  //   }
  // };

  // useEffect(() => {
  //   handleResize(); // Set the initial state based on screen size
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Menu */}
      <SidebarMenu menuCollapse={menuCollapse} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />

        {/* Content Below Header */}
        <div
          className={`adminLayout flex ${
            menuCollapse ? "pl-0 md:pl-[76px]" : "pl-0 md:pl-[205px]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
