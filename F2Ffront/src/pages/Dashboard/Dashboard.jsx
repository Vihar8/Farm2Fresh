import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import api from "../../api/axios";
import TotalUserGraph from "./TotalUserGraph";
import cardBgImg from "/assets/imgs/cardBgImg.svg";
import moreIcon from "/assets/icons/moreIcon.svg";

const Dashboards = () => {
  const [dashboardMetrics, setDashboardMetrics] = useState({});
  const [additionalMetrics, setAdditionalMetrics] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        const [dashboardResponse, metricsResponse] = await Promise.all([
          api.get("/auth/buysellacc", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDashboardMetrics(dashboardResponse.data.counts || {});
        setAdditionalMetrics(metricsResponse.data || {});
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      // Perform any necessary cleanup here
    };
  }, [location]);

  const dashboardData = useMemo(() => [
    {
      id: 1,
      links: "/buyers",
      counts: additionalMetrics.totalBuyerCommodities || 0,
      bgcolor: "#ADDCE7",
      details: "Buyer Commodities",
    },
    {
      id: 2,
      links: "/sellers",
      counts: additionalMetrics.totalSellerCommodities || 0,
      bgcolor: "#98C890",
      details: "Seller Commodities",
    },
  ], [additionalMetrics]);

  const produceData = useMemo(() => [
    { id: 1, title: "Total Sellers Accounts", counts: dashboardMetrics.sellers || 0 },
    { id: 2, title: "Total Buyers Accounts", counts: dashboardMetrics.buyers || 0 },
  ], [dashboardMetrics]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mt-[100px] pl-5">
      <Grid item xs={12} lg={9}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-4">
          {dashboardData.map(cdata => (
            <div key={cdata.id} className="flex flex-col text-left relative p-4 pt-5 rounded-lg pb-11 shadow-lg" style={{ backgroundColor: cdata.bgcolor }}>
              <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-primary-Color2">{cdata.counts}</h3>
              <p className="text-base md:text-sm 2xl:text-lg font-semibold text-primary-Color2 mt-1">{cdata.details}</p>
              <img alt="Background" src={cardBgImg} className="absolute top-0 right-0" />
              <Link
                to={cdata.links}
                className="flex gap-1 justify-center absolute bottom-0 left-0 right-0 rounded-bl-lg rounded-br-lg text-xs leading-7 font-semibold text-primary-Color2"
              >
                More info <img alt="More Icon" src={moreIcon} />
              </Link>
            </div>
          ))}
        </div>
      </Grid>

      <Grid>
        <div className="bg-primary-Color6 rounded-xl py-5 px-4 flex flex-col gap-8 mt-5 shadow-lg">
          <h3 className="text-base text-primary-Color2 font-semibold">Produce Summary</h3>
          <div className="flex flex-col gap-7">
            {produceData.map(pdata => (
              <div className="flex items-center gap-3 justify-between" key={pdata.id}>
                <h1 className="text-base font-normal text-primary-Color2">{pdata.title}</h1>
                <p className="text-base font-semibold text-primary-Color1">{pdata.counts}</p>
              </div>
            ))}
          </div>
        </div>
      </Grid>

      <TotalUserGraph
        buyerCount={dashboardMetrics.buyers || 0}
        sellerCount={dashboardMetrics.sellers || 0}
      />
    </div>
  );
};

export default Dashboards;