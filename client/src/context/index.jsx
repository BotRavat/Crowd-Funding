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
  // const { contract } = useContract(
  //   "0x9B43720CCff76c21cB9A2368da9D13015164dA39"
  // );
  const { contract } = useContract(
    "0x13B68D16327D0b5e3023b20e613987c44e8085a4"
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
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      donators: campaign.donators,
      pId: id,
    }));
    // console.log(parsedCampaings)
    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  
  const donate=async(pId,amount)=>{
    const data=await contract.call('donateToCampaign',pId,{value:ethers.utils.parseEther(amount)});
    return data;
  }

  const getDonations=async(pId)=>{
    const donations=await contract.call('getDonators',pId);
    const numberOfDonations=donations[0].length;
    const parsedDonations=[];
    // for(let i=0;i<numberOfDonations;i++)/\
    let i=0;
    while(i<numberOfDonations)
   { parsedDonations.push({
   donator:donations[0][i],
   donations:ethers.utils.formatEther(donations[1][i].toString())
    })
   i++;
  }
 
    return parsedDonations;
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
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

