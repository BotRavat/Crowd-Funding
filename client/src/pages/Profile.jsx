import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import {DisplayCampaigns} from "../components";
export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaign = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCampaign();
  }, [address, contract,getUserCampaigns]);
  return <div>
     <DisplayCampaigns title="Your Campaigns"
     isLoading={isLoading}
     campaigns={campaigns}
     />
  </div>;
}
