// common status code
export const StatusCode = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notacceptable: 406,
    forbidden: 403,
    conflict: 409,
    timeOut: 504,
  };
  
  // common loader
  export const commonLoader = (className) => {
    if (className == "show") {
      document.body.classList.add("show-loader");
    } else {
      document.body.classList.remove("show-loader");
    }
  };
  
  // Message And Title for Common Dialog
  export const MessageAndTitle = {
    ApplyContent: "Are You Sure You Want To Delete?",
    ApplyTitle: "",
  };
  
  // message and title for status update dialog
  export const MessageActiveTitle = {
    ApplyContent: "Are You Sure You Want To Update Status?",
    ApplyTitle: "",
  };
  
  // years dropdown data function
  export const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from(new Array(70), (_, index) => ({
      value: `${currentYear - index}`,
    }));
  };
  
  // date & time formatter
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2); // Ensure two digits for day with leading zero
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;
    return formattedDate;
  };
  
  // Common function to fetch document to show
  export const commonPatchValueForFile = async (appId, file_name) => {
    const fileUrl =
      import.meta.env.VITE_APP_API_URL +
      import.meta.env.VITE_DOCUMENT_URL +
      appId +
      "/" +
      file_name;
    const extension = await file_name.split(".").pop();
    let type;
    if (extension == "pdf") {
      type = "application/pdf";
    } else if (extension == "jpg" || extension == "jpeg") {
      type = "image/jpeg";
    } else if (extension == "png") {
      type = "image/png";
    }
    const serviceToken = window.localStorage.getItem("serviceToken");
    const blob = await fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${serviceToken}`,
      },
    }).then((res) => res.blob({ type: type }));
    const file = new File([blob], `${file_name}.${extension}`, { type: type });
    return file;
  };
  
  // date formatter
  export const formaterDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
  
    const isToday = date.toDateString() === today.toDateString();
  
    if (isToday) {
      return "Today";
    }
  
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  
    return formattedDate;
  };
  