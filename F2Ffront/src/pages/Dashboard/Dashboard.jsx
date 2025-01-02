import cardBgImg from "/assets/imgs/cardBgImg.svg";
import moreIcon from "/assets/icons/moreIcon.svg";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";


const Dashboards = () => {
  const dashboardData = [
    {
      id: 1,
      links: "/admin/orders",
      counts: "1,245",
      bgcolor: "#98C890",
      details: "Total Commodity",
    },
    {
      id: 2,
      links: "/admin/orders-completed",
      counts: "3,980",
      bgcolor: "#ADDCE7",
      details: "Enquiry Received",
    },
  ];

  const produceData = [
    { id: 1, title: "Sellers", counts: "2.3K" },
    { id: 2, title: "Buyers", counts: "3.1K" },
  ];

  return (
    <div className="mt-[100px] pl-5">
      {/* Dashboard Cards */}
      <Grid item xs={12} lg={9}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-4">
          {dashboardData.map((cdata) => (
            <div
              className="flex flex-col text-left relative p-4 pt-5 rounded-lg pb-11 shadow-lg"
              style={{ backgroundColor: cdata.bgcolor }}
              key={cdata.id}
            >
              <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-primary-Color2">{cdata.counts}</h3>
              <p className="text-base md:text-sm 2xl:text-lg font-semibold text-primary-Color2 mt-1">{cdata.details}</p>
              <div className="absolute top-0 right-0">
                <img alt="Background" src={cardBgImg} />
              </div>
              <Link to={cdata.links} className="flex gap-1 justify-center absolute bottom-0 left-0 right-0 rounded-bl-lg rounded-br-lg text-xs leading-7 font-semibold text-primary-Color2">
                More info
                <img alt="More Icon" src={moreIcon} />
              </Link>
            </div>
          ))}
        </div>
      </Grid>

      {/* Produce Summary */}
      <Grid className="">
        <div className="bg-primary-Color6 rounded-xl py-5 px-4 flex flex-col gap-8 shadow-lg">
          <h3 className="text-base text-primary-Color2 font-semibold">Produce Summary</h3>
          <div className="flex flex-col gap-7">
            {produceData.map((pdata) => (
              <div className="flex items-center gap-3 justify-between" key={pdata.id}>
                <h1 className="text-base font-normal text-primary-Color2">{pdata.title}</h1>
                <p className="text-base font-semibold text-primary-Color1">{pdata.counts}</p>
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Dashboards;