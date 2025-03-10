// // src/components/Employee.tsx
// "use client"; 
// import React from "react";
// import { FaTrash, FaSearch,  FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import "@/styles/globals.css";
// import { useRouter } from "next/navigation";
// import { useSession, signIn } from "next-auth/react";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

// const employees = [
//   { firstName: "Joshua", lastName: "Bakare", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Admin" },
//   { firstName: "Jane", lastName: "Clement", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
//   { firstName: "Hannah", lastName: "Johnson", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
//   { firstName: "John", lastName: "Ngoka", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
//   { firstName: "Omotayo", lastName: "Adeleke", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
//   { firstName: "Gloria", lastName: "Amadi", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
// ];

// const Employee = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p>Loading...</p>;
//   if (!session) return <button onClick={() => signIn()}>Sign in</button>;
  

//   return (
//     <div className="flex">
//     {/* Sidebar */}
//     <Sidebar />

//     <div className="flex-1">
//       {/* Header */}
//       <Header />
//     <div className="table-containers ml-16">
//       <div className="flex justify-between items-center px-6">
//           {/* Left Side - Title */}
//           <h2 className="text-2xl font-bold mb-4 ml-4">Employees</h2>

//           {/* Right Side - Add Button */}
//           <button
//           className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
//           onClick={() => router.push("/AddEmployee")}
//         >
//           Add New
//         </button>
//       </div>
//       <div className="table-container flex justify-between items-center px-6">
//           {/* Left Side - Title */}
//           <h2 className="text-2xl font-bold mb-4 ml-4">Josh Bakery Ventures</h2>

//           {/* Right Side - Add Button */}
//           <p className="text-gray-600 text-sm ml-4">123 Baker Street, Nairobi, Kenya</p>
//       </div>
//       {/* <div className="flex items-center space-x-4 mb-4">
//         <select className="border p-2 rounded-md">
//           <option>Change role</option>
//           <option>Admin</option>
//           <option>Staff</option>
//         </select>
//         <button className="btn-primary">Change</button>
//         <div className="relative">
//             <input
//               type="text"
//               placeholder="Enter staff name here..."
//               className="border p-2 pl-10 rounded-md w-64"
//             />
//             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//       </div> */}
//       <div className="flex justify-between items-center mb-4">
//   {/* Left Side: Role Selection, Change Button, Search Input */}
//   <div className="flex items-center space-x-4">
//     <select className="border p-2 rounded-md">
//       <option>Change role</option>
//       <option>Admin</option>
//       <option>Staff</option>
//     </select>
//     <button className="btn-primary">Change</button>
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Enter staff name here..."
//         className="border p-2 pl-10 rounded-md w-64"
//       />
//       <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//     </div>
//   </div>

//   {/* Right Side: Navigation Options */}
//   <div className="flex items-center space-x-3">
//     <span className="text-gray-500">1 of 2</span>
//     <button className="text-green-500"><FaArrowLeft /></button>
//     <button className="text-green-500"><FaArrowRight /></button>
//   </div>
// </div>


//       <table className="table">
//         <thead>
//           <tr>
//             <th><input type="checkbox" /></th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp, index) => (
//             <tr key={index} className="table-container hover:bg-gray-50">
//               <td><input type="checkbox" /></td>
//               <td className="font-semibold">{emp.firstName}</td>
//               <td className="font-semibold">{emp.lastName}</td>
//               <td>{emp.email}</td>
//               <td>{emp.phone}</td>
//               <td>{emp.role}</td>
//               <td><FaTrash className="delete-icon" /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Employee;

import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Define Employee type
type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

const Employee = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const response = await fetch("/api/add-employee"); // Adjust API path if needed
  //       if (!response.ok) throw new Error("Failed to fetch employees");
  //       const data = await response.json();
  //       setEmployees(data);
  //     } catch (error) {
  //       console.error("Error fetching employees:", error);
  //     }
  //   };

  //   fetchEmployees();
  // }, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/add-employee");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Normalize field names if needed
        const formattedData = data.map((emp: any) => ({
          _id: emp._id,
          firstName: emp.firstName , // Handle different cases
          lastName: emp.lastName ,
          email: emp.email,
          phone: emp.phone,
          role: emp.role
        }));
  
        setEmployees(formattedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
  
    fetchEmployees();
  }, []);
  
  
  

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="table-containers ml-16">
          <div className="flex justify-between items-center px-6">
            <h2 className="text-2xl font-bold mb-4 ml-4">Employees</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={() => router.push("/AddEmployee")}>
              Add New
            </button>
          </div>

          <div className="table-container flex justify-between items-center px-6">
            <h2 className="text-2xl font-bold mb-4 ml-4">Josh Bakery Ventures</h2>
            <p className="text-gray-600 text-sm ml-4">123 Baker Street, Nairobi, Kenya</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <select className="border p-2 rounded-md">
                <option>Change role</option>
                <option>Admin</option>
                <option>Staff</option>
              </select>
              <button className="btn-primary">Change</button>
              <div className="relative">
                <input type="text" placeholder="Enter staff name here..." className="border p-2 pl-10 rounded-md w-64" />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-500">1 of 2</span>
              <button className="text-green-500">
                <FaArrowLeft />
              </button>
              <button className="text-green-500">
                <FaArrowRight />
              </button>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="table-container hover:bg-gray-50">
                  <td><input type="checkbox" /></td>
                  <td className="font-semibold">{emp.firstName}</td>
                  <td className="font-semibold">{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.role}</td>
                  <td><FaTrash className="delete-icon" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
