import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";

import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import NFTCard from "../components/NFTCardSeason1";
import {
  nftDropSeason1,
  stakingSeason1,
  tokenContractAddress,
} from "../consts/contractAddresses";
import { fixNFTMetadata } from "../utils/fixNFTMetadata";


const Home: NextPage = () => {
  const [sendToAddress, setSendToAddress] = useState("0xD27afC6F8e8B7B4143ba7c32B338b238aeCfE474");
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

    const address = useAddress();
    const { contract: nftDropContract } = useContract(
      nftDropSeason1,
      "nft-drop"
    );
    const { contract: tokenContract } = useContract(
      tokenContractAddress,
      "token"
    );
    const { contract, isLoading } = useContract(stakingSeason1);
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
      address,
    ]);
    const [selectedNfts, setSelectedNfts] = useState<string[]>([]);
    const [selectedNftsToWithdraw, setSelectedNftsToWithdraw] = useState<string[]>([]);
  
    useEffect(() => {
      if (!contract || !address) return;
  
      async function loadClaimableRewards() {
        const stakeInfo = await contract?.call("getStakeInfo", [address]);
        setClaimableRewards(stakeInfo[1]);
      }
  
      loadClaimableRewards();
    }, [address, contract]);
  

  async function stakeNfts(ids: string[]) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingSeason1
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingSeason1, true);
    }
    await contract?.call("stake", [ids]);
    setSelectedNfts([]);  // clear the selected NFTs after staking
  }

if (isLoading) {
    
    return (
      
      <div className={styles.loading}>      
      </div>
    )
  }

  async function withdrawNfts(ids: string[]) {
    if (!address) return;
    await contract?.call("withdraw", [ids]);
    setSelectedNftsToWithdraw([]);
  }


  async function sendAllSelectedNFTs() {
    if (!address || selectedNfts.length === 0) {
      return;
    }
  
    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingSeason1
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingSeason1, true);
    }
  
    // Schleife durch die ausgewählten NFTs und sende sie an die angegebene Adresse
    for (const tokenId of selectedNfts) {
      // Verwende die "transferFrom"-Funktion des Contracts
      await nftDropContract?.call("transferFrom", [address, sendToAddress, tokenId]);
    }
  
    // Nach dem Senden leere die ausgewählten NFTs
    setSelectedNfts([]);
  }

    return (
      <div className={styles.container}>
          <div
          className={styles.optionSelectBack}
          role="button"
          onClick={() => router.push(`/`)}
        >
          {/* Mint a new NFT */}
          <h2 className={styles.selectBoxTitleBack}>Back to Dashboard</h2>
        </div>
        <p className={styles.minting}>



        <br /><br />
        
        <ConnectWallet btnTitle="Connect Wallet" className={styles.wallet} />
       
        
        
        <h1 className={styles.h1}>Angry Animals Season 1 is completed</h1>
  
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
  
        <p className={styles.explain}>
        <b>Unreveal and Reveal Mint is completed</b>
         <br /><br /> 
         <b>Season 3 Mint is opened</b>
        </p>
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
  
  
        
  
        <div className={styles.quantityContainer}>
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
  
                      <h4>{quantity}</h4>
  
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity + 1)}
                        
                      >
                        +
                      </button>
                    </div> 
  
                    
  
        <Web3Button
          className={styles.wallet}
          contractAddress={nftDropSeason1}
          action={(contract) => contract.erc721.claim(quantity)}
          onSuccess={() => {
            setQuantity(1);
            
          }}
          onError={(error) => {
            
          }}
        >
          Mint An NFT
        </Web3Button> 
        <br /><br /> 
        </p>

        <p className={styles.staking}> 
        <h1 className={styles.h1}>Stake Your Season 1 NFTs</h1>
        <hr className={`${styles.divider} ${styles.spacerTop}`} />
  


          <>
            <h2>Your Tokens</h2>
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? ""
                      : Number(ethers.utils.formatUnits(claimableRewards, 18)).toFixed(2)} 
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  
                  <b>{tokenBalance?.displayValue !== undefined ? parseFloat(tokenBalance.displayValue).toFixed(2) : ""}</b> {tokenBalance?.symbol}
                </p>
              </div>
            </div>
  
            <Web3Button
              className={styles.wallet}
              action={(contract) => contract.call("claimRewards")}
              contractAddress={stakingSeason1}
            >
              Claim Rewards
            </Web3Button>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2>Your Staked NFTs</h2>

          <Web3Button
        className={styles.wallet}
        contractAddress={stakingSeason1}
        action={() => withdrawNfts(selectedNftsToWithdraw)}
        isDisabled={selectedNftsToWithdraw.length === 0}
      >
        Unstake Selected NFTs
      </Web3Button>

          <div className={styles.nftBoxGrid}>
            {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <div
                  className={`${styles.nftBox} ${
                    selectedNftsToWithdraw.includes(stakedToken.toString())
                      ? styles.selected
                      : ""
                  }`}
                  key={stakedToken.toString()}
                  onClick={() => {
                    setSelectedNftsToWithdraw((prevSelectedNfts) => {
                      const tokenId = stakedToken.toString();
                      if (prevSelectedNfts.includes(tokenId)) {
                        return prevSelectedNfts.filter((id) => id !== tokenId);
                      } else {
                        return [...prevSelectedNfts, tokenId];
                      }
                    });
                  }}
                >
                  <NFTCard tokenId={stakedToken.toNumber()} />
                </div>
              ))}
          </div>



          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2>Your Unstaked NFTs</h2>

          <Web3Button
            className={styles.wallet}
            contractAddress={stakingSeason1}
            action={() => stakeNfts(selectedNfts)}
            isDisabled={selectedNfts.length === 0}
            >
            Stake Selected NFTs
          </Web3Button>

          <Web3Button
  className={styles.wallet}
  contractAddress={stakingSeason1}
  action={sendAllSelectedNFTs}
  isDisabled={selectedNfts.length === 0 || !sendToAddress}
>
  Send All Selected NFTs to Address
</Web3Button>


          <div className={styles.nftBoxGrid}>
            {ownedNfts?.map((nft) => {
              const meta = fixNFTMetadata(nft.metadata)
              return (
                <div
                  className={`${styles.nftBox} ${
                    selectedNfts.includes(meta.id) ? styles.selected : ""
                  }`}
                  key={meta.id.toString()}
                  onClick={() => {
                    setSelectedNfts((prevSelectedNfts) => {
                      if (prevSelectedNfts.includes(meta.id)) {
                        return prevSelectedNfts.filter(
                          (id) => id !== meta.id
                        );
                      } else {
                        return [...prevSelectedNfts, meta.id];
                      }
                    });
                  }}
                >
                  <ThirdwebNftMedia
                    metadata={meta}
                    className={styles.nftMedia}
                  />
                  <h3>{meta.name}</h3>
                </div>
              )
            })}
          </div>
        </>
       

          </p>
      </div>
    );

    
  };
  
  export default Home;