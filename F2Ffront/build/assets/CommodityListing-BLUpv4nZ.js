import{R as T,j as e,r as h,a as I}from"./index-BzkZyVbb.js";import{c as M,a as p,d as f,e as U,F as P,f as $}from"./index.esm-eChD1dHV.js";import{c as g,C as E}from"./circle-check-big-CNA7E4-M.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=g("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=g("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=g("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);class z extends T.Component{constructor(i){super(i),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,d){console.error("Uncaught error:",i,d)}render(){return this.state.hasError?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-red-50 p-4",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8 text-center max-w-md",children:[e.jsx(w,{className:"mx-auto text-red-500 mb-4",size:64}),e.jsx("h2",{className:"text-2xl font-bold text-red-600 mb-4",children:"Unexpected Error Occurred"}),e.jsx("p",{className:"text-gray-600 mb-6",children:this.state.error?this.state.error.toString():"Something went wrong"}),e.jsxs("div",{className:"flex space-x-4 justify-center",children:[e.jsx("button",{onClick:()=>window.location.reload(),className:"bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition",children:"Reload Page"}),e.jsx("button",{onClick:()=>this.setState({hasError:!1}),className:"bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition",children:"Try Again"})]})]})}):this.props.children}}const v=(m,i)=>{const d=m.target.value;(d===""||!isNaN(d)&&parseFloat(d)>=0)&&i(m.target.name,d)},O=()=>{const m=M().shape({commodity:p().required("Commodity is required").min(2,"Commodity name too short"),varietyType:p().required("Variety type is required"),quantity:f().required("Quantity is required").positive("Quantity must be positive"),totalIn:p().oneOf(["kg","mt","quintal","ton"],"Invalid unit").required("Total In is required"),price:f().required("Price is required").positive("Price must be positive"),state:p().required("State is required"),district:p().required("District is required"),images:U().min(1,"At least one image is required").max(2,"Maximum 2 images allowed")}),[i,d]=h.useState([]),[y,b]=h.useState(!1),[c,u]=h.useState({open:!1,message:"",type:"success"});h.useEffect(()=>{let a;return c.open&&(a=setTimeout(()=>{u(t=>({...t,open:!1}))},5e3)),()=>clearTimeout(a)},[c.open]);const N=["Maharashtra","Karnataka","Tamil Nadu","Uttar Pradesh","Gujarat","Rajasthan","Punjab","Kerala","West Bengal","Madhya Pradesh","Bihar","Odisha"],C={Maharashtra:["Mumbai","Pune","Nagpur","Nashik","Aurangabad"],Karnataka:["Bangalore","Mysore","Hubli","Mangalore","Belgaum"],"Tamil Nadu":["Chennai","Coimbatore","Madurai","Tiruchirapalli","Salem"],"Uttar Pradesh":["Lucknow","Kanpur","Varanasi","Agra","Meerut"],Gujarat:["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar"],Rajasthan:["Jaipur","Jodhpur","Udaipur","Ajmer","Bikaner"],Punjab:["Amritsar","Ludhiana","Jalandhar","Patiala","Bathinda"],Kerala:["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Alappuzha"],"West Bengal":["Kolkata","Darjeeling","Asansol","Siliguri","Howrah"],"Madhya Pradesh":["Bhopal","Indore","Gwalior","Jabalpur","Ujjain"],Bihar:["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga"],Odisha:["Bhubaneswar","Cuttack","Rourkela","Puri","Berhampur"]},k=[{value:"kg",label:"Kilograms (kg)"},{value:"mt",label:"Metric Tons (mt)"},{value:"quintal",label:"Quintal"},{value:"ton",label:"Ton"}],A=(a,t)=>{const r=Array.from(a.target.files);if(r.length+i.length>2){u({open:!0,message:"Maximum 2 images allowed",type:"error"});return}d(n=>[...n,...r]),t("images",[...i,...r])},B=(a,t)=>{const r=i.filter((n,o)=>o!==a);d(r),t("images",r)},q=async(a,{resetForm:t})=>{var n,o;const r=new FormData;Object.keys(a).forEach(l=>{l!=="images"&&r.append(l,a[l])}),i.forEach(l=>{r.append("images",l)});try{b(!0);const l=await I.post("/api/commodities",r,{headers:{"Content-Type":"multipart/form-data"}});u({open:!0,message:"Commodity added successfully",type:"success"}),t(),d([])}catch(l){u({open:!0,message:((o=(n=l.response)==null?void 0:n.data)==null?void 0:o.message)||"Failed to add commodity",type:"error"})}finally{b(!1)}},S=({open:a,onClose:t,message:r,type:n,icon:o})=>a?e.jsxs("div",{className:`
          fixed bottom-4 left-1/2 transform -translate-x-1/2 
          px-4 py-3 rounded-lg shadow-lg z-50
          flex items-center space-x-3
          w-96 max-w-full
          ${n==="success"?"bg-green-600 text-white":"bg-red-600 text-white"}
          animate-slide-up
        `,children:[e.jsx("div",{className:"absolute bottom-0 left-0 h-1 bg-white/30 animate-progress-bar"}),o,e.jsx("span",{className:"flex-grow",children:r}),e.jsx("button",{onClick:t,className:"hover:bg-white/20 rounded-full p-1 transition-colors",children:e.jsx(j,{size:20})})]}):null;return e.jsxs("div",{className:"max-h-screen bg-gray-50 flex items-center justify-center p-5 mt-2",children:[e.jsxs("div",{className:"w-full max-w-md bg-white border-2 border-[#2CB21A] rounded-xl p-6 shadow-lg",children:[e.jsx("h2",{className:"text-3xl font-bold text-center text-[#2CB21A] mb-6",children:"Add New Commodity"}),e.jsx(P,{initialValues:{commodity:"",varietyType:"",quantity:"",totalIn:"",price:"",state:"",district:"",images:[]},validationSchema:m,onSubmit:q,children:({values:a,errors:t,touched:r,setFieldValue:n,handleChange:o})=>{var l;return e.jsxs($,{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("input",{name:"commodity",placeholder:"Commodity Name",value:a.commodity,onChange:o,className:`
                    w-full px-3 py-2.5 border-2 rounded-lg 
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
                    ${t.commodity&&r.commodity?"border-red-500":"border-[#2CB21A]"}
                  `}),t.commodity&&r.commodity&&e.jsx("p",{className:"text-red-500 text-sm mt-1 pl-1",children:t.commodity})]}),e.jsxs("div",{children:[e.jsx("input",{name:"varietyType",placeholder:"Variety Type",value:a.varietyType,onChange:o,className:`
                    w-full px-3 py-2.5 border-2 rounded-lg 
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
                    ${t.varietyType&&r.varietyType?"border-red-500":"border-[#2CB21A]"}
                  `}),t.varietyType&&r.varietyType&&e.jsx("p",{className:"text-red-500 text-sm mt-1 pl-1",children:t.varietyType})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("select",{name:"state",value:a.state,onChange:s=>{o(s),n("district","")},className:`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${t.state&&r.state?"border-red-500":"border-[#2CB21A]"}
                  `,children:[e.jsx("option",{value:"",children:"Select State"}),N.map(s=>e.jsx("option",{value:s,children:s},s))]}),e.jsxs("select",{name:"district",value:a.district,onChange:o,disabled:!a.state,className:`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${t.district&&r.district?"border-red-500":"border-[#2CB21A]"}
                    ${a.state?"":"opacity-50 cursor-not-allowed"}
                  `,children:[e.jsx("option",{value:"",children:"Select District"}),a.state&&((l=C[a.state])==null?void 0:l.map(s=>e.jsx("option",{value:s,children:s},s)))]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx("input",{type:"number",name:"quantity",placeholder:"Quantity",value:a.quantity,onChange:s=>v(s,n),className:`w-full px-3 py-2.5 border-2 rounded-lg ${t.quantity&&r.quantity?"border-red-500":"border-[#2CB21A]"}`}),e.jsx("input",{type:"number",name:"price",placeholder:"Price",value:a.price,onChange:s=>v(s,n),className:`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${t.price&&r.price?"border-red-500":"border-[#2CB21A]"}
                  `})]}),e.jsxs("div",{children:[e.jsxs("select",{name:"totalIn",value:a.totalIn,onChange:o,className:`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${t.totalIn&&r.totalIn?"border-red-500":"border-[#2CB21A]"}
                  `,children:[e.jsx("option",{value:"",children:"Select Unit"}),k.map(s=>e.jsx("option",{value:s.value,children:s.label},s.value))]}),t.totalIn&&r.totalIn&&e.jsx("p",{className:"text-red-500 text-sm mt-1 pl-1",children:t.totalIn})]}),e.jsxs("div",{children:[e.jsx("input",{type:"file",multiple:!0,accept:"image/*",onChange:s=>A(s,n),className:"hidden",id:"file-upload"}),e.jsxs("label",{htmlFor:"file-upload",className:`\r
                    flex items-center justify-center \r
                    border-2 border-dashed \r
                    border-[#2CB21A] \r
                    p-4 cursor-pointer \r
                    hover:bg-green-50\r
                    rounded-lg\r
                    transition-all duration-300\r
                  `,children:[e.jsx(R,{className:"mr-2 text-[#2CB21A]"}),e.jsx("span",{children:"Upload Images (Max 2)"})]}),i.length>0&&e.jsx("div",{className:"mt-3 flex space-x-2",children:i.map((s,x)=>e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:URL.createObjectURL(s),alt:`upload-${x}`,className:"w-16 h-16 object-cover rounded border-2 border-[#2CB21A] shadow"}),e.jsx("button",{type:"button",onClick:()=>B(x,n),className:"absolute top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all",children:e.jsx(j,{size:14})})]},x))})]}),e.jsx("button",{type:"submit",disabled:y,className:`\r
                  w-full py-2 rounded-lg \r
                  bg-[#2CB21A] \r
                  text-white \r
                  hover:bg-green-600 transition \r
                  duration-150 ease-in-out\r
                  disabled:opacity-50\r
                `,children:y?"Adding...":"Add Commodity"})]})}})]}),e.jsx(S,{open:c.open,onClose:()=>u({...c,open:!1}),message:c.message,type:c.type,icon:c.type==="success"?e.jsx(E,{className:"text-white"}):e.jsx(w,{className:"text-white"})})]})};export{O as default};
