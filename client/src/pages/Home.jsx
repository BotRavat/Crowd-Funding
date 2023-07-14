import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import {DisplayCampaigns} from "../components";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaign = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCampaign();
  }, [address, contract, getCampaigns]);
  return( <div>
     <DisplayCampaigns title="All Campaigns"
     isLoading={isLoading}
     campaigns={campaigns}
     />
  </div>)
}
