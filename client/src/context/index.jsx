import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x9B43720CCff76c21cB9A2368da9D13015164dA39"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  // console.log(contract);
  // console.log(address);
  // console.log(connect);

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const getCampaigns = async () => {
    const campaings = await contract.call("getCampaigns");
    const parsedCampaings = campaings.map((campaign, id) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      targetr: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pid: id,
    }));

    return parsedCampaings;
  };


  const getUserCampaigns=async()=>{
    const allCampaigns=await getCampaigns();
    const filteredCampaigns=allCampaigns.filter((campaign)=>campaign.owner===address);
    return filteredCampaigns;

  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
