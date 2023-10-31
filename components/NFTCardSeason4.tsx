import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  
} from "@thirdweb-dev/react";
import type { FC } from "react";
import {
  nftDropSeason4,
  
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import { fixNFTMetadata } from "../utils/fixNFTMetadata";

interface NFTCardProps {
  tokenId: number;

}


const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropSeason4, "nft-drop");
  const { data: nft } = useNFT(contract, tokenId);
  const meta = nft ? fixNFTMetadata(nft.metadata) : undefined;

  return (
    <>
    
      {meta && (
        <div>
          <ThirdwebNftMedia
            requireInteraction={true}
            metadata={meta}
            className={styles.nftVideo}
            />
          <h3>{meta.name}</h3>
          
        </div>
      )}
    </>
  );
};
export default NFTCard;