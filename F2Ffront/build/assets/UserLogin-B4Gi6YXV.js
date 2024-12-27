import{u as f,r,J as p,S as w,a as b,b as j,j as e,L as v}from"./index-BzkZyVbb.js";import{u as y,c as N,a as i}from"./index.esm-eChD1dHV.js";import{R as S,a as k}from"./EyeInvisibleFilled-CVaLpTWx.js";const P=()=>{const d=f(),{dispatch:m}=r.useContext(p),{showSnackbar:t}=r.useContext(w),[o,c]=r.useState(!1),u=()=>{c(a=>!a)},s=y({initialValues:{email:"",password:""},validationSchema:N({email:i().email("Invalid email format").required("Email is required"),password:i().min(6,"Password must be at least 6 characters").required("Password is required")}),onSubmit:async(a,{setSubmitting:x,setFieldError:n})=>{try{const l=await b.post("/auth/login",a),{token:h,user:g}=l.data;localStorage.setItem("serviceToken",h),m({type:j,payload:{user:g}}),t("SignIn successfully!","success"),d("/home")}catch{n("email","Invalid email or password"),n("password","Invalid email or password"),t("Failed to SignIn. Please try again.","error")}finally{x(!1)}}});return e.jsxs("div",{className:"flex h-screen bg-white",children:[e.jsx("div",{className:"hidden md:flex w-1/2 bg-cover bg-center",style:{backgroundImage:"url('https://images.unsplash.com/photo-1603360556632-2c5234378b7e?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}),e.jsx("div",{className:"flex flex-col justify-center w-full md:w-1/2 p-10 md:p-20 bg-gray-50",children:e.jsxs("div",{className:"max-w-lg mx-auto",children:[e.jsxs("div",{className:"flex flex-col items-center mb-10",children:[e.jsx("div",{className:"w-16 h-16 flex items-center justify-center bg-greenCustom rounded-full shadow-md",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",className:"w-8 h-8 text-white",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 11c.552 0 1 .448 1 1s-.448 1-1-1-1-.448-1-1 .448-1 1-1zm-1-2V7m0 10v-2m-4.95-4.95l-1.414-1.414m10.828 10.828l1.414 1.414M17 12h2m-10 0H5m8.485-8.485l1.414-1.414m-10.828 10.828l1.414 1.414"})})}),e.jsx("h1",{className:"mt-5 text-3xl font-bold text-black",children:"Sign In"})]}),e.jsxs("form",{onSubmit:s.handleSubmit,className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-black",children:"Email Address"}),e.jsx("input",{type:"email",id:"email",name:"email",value:s.values.email,onChange:s.handleChange,onBlur:s.handleBlur,className:`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${s.touched.email&&s.errors.email?"border-red-500":"border-gray-300"}`}),s.touched.email&&s.errors.email&&e.jsx("p",{className:"text-sm text-red-500",children:s.errors.email})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-black",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:o?"text":"password",id:"password",name:"password",value:s.values.password,onChange:s.handleChange,onBlur:s.handleBlur,className:`block w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${s.touched.password&&s.errors.password?"border-red-500":"border-gray-300"}`}),e.jsx("button",{type:"button",onClick:u,className:"absolute inset-y-0 right-3 flex items-center text-gray-500",children:o?e.jsx(S,{}):e.jsx(k,{})})]}),s.touched.password&&s.errors.password&&e.jsx("p",{className:"text-sm text-red-500",children:s.errors.password})]}),e.jsx("button",{type:"submit",disabled:s.isSubmitting,className:"w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none",children:s.isSubmitting?"Signing In...":"Sign In"})]}),e.jsxs("div",{className:"flex justify-between items-center mt-8 text-sm",children:[e.jsx("a",{href:"#",className:"text-greenCustom font-medium hover:underline",children:"Forgot password?"}),e.jsx(v,{to:"/usersignup",className:"text-greenCustom font-medium hover:underline",children:"Don't have an account? Sign Up"})]}),e.jsxs("p",{className:"mt-10 text-sm text-center text-black",children:["Connect With Us at"," ",e.jsx("a",{href:"https://farm2fresh.vercel.app/",className:"text-greenCustom font-medium hover:underline",children:"Farm2Fresh"})," ","and grow your Business."]})]})})]})};export{P as default};
