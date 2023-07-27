import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  
} from "@thirdweb-dev/react";
import type { FC } from "react";
import {
  nftDropSeason3,
  
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";

interface NFTCardProps {
  tokenId: number;

}


const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(nftDropSeason3, "nft-drop");
  const { data: nft } = useNFT(contract, tokenId);

  return (
    <>
    
      {nft && (
        <div>
          {nft.metadata && (
            
            <ThirdwebNftMedia
            metadata={nft.metadata}
            className={styles.nftMediaSeason3}
            />
            
          )}
          <h3>{nft.metadata.name}</h3>
          
        </div>
      )}
    </>
  );
};
export default NFTCard;
