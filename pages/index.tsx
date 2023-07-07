import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useContract } from "@thirdweb-dev/react";
import { stakingNode } from "../consts/contractAddresses";

const Home: NextPage = () => {
  const router = useRouter();
  const { contract, isLoading } = useContract(stakingNode);
  
  if (isLoading) {
    return <div className={styles.loading}></div>;
  }

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}></h1>
      <div className={styles.nftBoxGrid}>
        
      <div className={styles.genesis}>
        <div
          className={styles.optionSelectBoxGenesis}
          role="button"
          onClick={() => router.push(`/node`)}
        >
         
         <div className={styles.placeholder}><h2 className={styles.selectBoxTitleSeason2}>
         <p>GENESIS</p>
         EDITION
          </h2>
          <p className={styles.selectBoxDescriptionGenesis}>
          <p>Get a rare <b>Genesis Edition</b> and <b>Stake</b> it to earn <b>USDT</b> rewards.</p>
          Only available with <b>Unreveal Token</b>.
          </p></div></div>
          {/* Mint a new NFT */}
          
          
        </div>

        <div className={styles.season}>
        <div
          className={styles.optionSelectBoxSeason3}
          role="button"
          onClick={() => router.push(`/season3`)}
        >
          {/* Staking an NFT */}
          
          <div className={styles.placeholder}><h2 className={styles.selectBoxTitleGenesis}>
          <p>NIGHTWOLF</p>
            PLATOON
            </h2>
          <p className={styles.selectBoxDescriptionright}>
          <b>Season 3</b>
          </p></div>
        </div>

        <div
          className={styles.optionSelectBoxSeason2}
          role="button"
          onClick={() => router.push(`/season2`)}
        >
          {/* Mint a new NFT 
          <Image src="/icons/lion.webp" alt="lion" width={64} height={64} /> */}
          <div className={styles.placeholder}><h2 className={styles.nSeason2}>
          <p>ANGRY</p>
            ANIMALS
            </h2>
          <p className={styles.selectBoxDescriptionleft}>
          <b>Season 2</b>
          </p></div>
        </div>

        <div
          className={styles.optionSelectBoxSeason1}
          role="button"
          onClick={() => router.push(`/season1`)}
        >
          {/* Staking an NFT 
          <Image src="/icons/gorilla.webp" alt="coming" width={64} height={64} />*/}
          <div className={styles.placeholder}><h2 className={styles.selectBoxTitleGenesis}>
          <p>ANGRY</p>
            ANIMALS
            </h2>
          <p className={styles.selectBoxDescriptionright}>
          <b>Season 1</b>
          </p></div>
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;