import Listings from "/components/listings/Listings";
import { getNftsQuery } from '../../utils/graphql';

export default function ListingsContainer() {
  return (
    <Listings
      auctionhousePublicKey={process.env.NEXT_PUBLIC_AUCTIONHOUSE}
      query={getNftsQuery}
    />
  );
}
