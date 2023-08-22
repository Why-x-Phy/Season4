import { NFTMetadata } from "@thirdweb-dev/react";

/**
 * Replace the hardcoded gateway URL with to make it an ipfs link to render the NFTs properly
 */
export function fixNFTMetadata(originalMetadata: NFTMetadata) {
  let meta = { ...originalMetadata };

  if (meta.image) {
    meta.image = replaceGateway(meta.image);
  }

  if (meta.animation_url) {
    meta.animation_url = replaceGateway(meta.animation_url);
  }

  return meta;
}

function replaceGateway(url: string) {
  return url.replace("https://ipfs-2.thirdwebcdn.com/ipfs/", "ipfs://").trim();
}