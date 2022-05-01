import { gql, useQuery } from "@apollo/client";
import { CSVLink, CSVDownload } from "react-csv";

const GET_NFT = gql`
  query GetNft($address: [PublicKey!]) {
    nfts(creators: $address, offset: 0, limit: 100000) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      owner {
        address
      }
    }
  }
`;

export default function FindByCreatorSearch({ address }) {
  const { data, loading, error } = useQuery(GET_NFT, {
    variables: {
      address: address,
    },
  });

  const downloadJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data.nfts.map((nft) => nft.mintAddress))
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "mintlist.json";
    link.click();
  };

  return (
    <>
      {loading && <p className="text-gray-300 text-sm">searching...</p>}
      {error && <p className="text-gray-300 text-sm">{error.message}</p>}
      {data && data.nfts && data.nfts.length === 0 && <p>0 results</p>}
      {data && data.nfts && data.nfts.length > 0 && (
        <div className="mt-20 pt-6 border-t-2 border-gray-100">
          <h1 className="text-lg font-bold text-gray-600">Results</h1>
          <div className="float-right">
            <CSVLink
              data={data.nfts.map((nft) => ({
                name: nft.name,
                description: nft.description,
                mint: nft.mintAddress,
                image: nft.image,
                owner: nft.owner.address,
              }))}
              filename={"mints.csv"}
              className="inline bg-amber-400 hover:bg-amber-500 text-white px-4 py-3 text-md leading-4 rounded-lg"
            >
              Details CSV
            </CSVLink>
            <a
              onClick={downloadJson}
              className="inline bg-amber-400 hover:bg-amber-500 text-white px-4 py-3 text-md leading-4 rounded-lg ml-2 cursor-pointer"
            >
              Mint List JSON
            </a>
          </div>
          <table className="clear-both mt-10 relative h-full min-w-full rounded-lg border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem]">
            <tbody>
              {data.nfts.map((nft, index) => (
                <tr
                  key={index}
                  className="bg-transparent h-full lg:hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] rounded-xl shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 ng-star-inserted"
                >
                  <td className="py-4 px-6">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
                      <img
                        src={nft.image}
                        className="object-center object-cover rounded-lg min-w-[50px] min-h-[50px]"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-700">
                    {nft.name}
                  </td>
                  <td className="py-4 px-6 text-sm">{nft.description}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="mr-2">owner</span>
                    <a
                      href={`https://solscan.io/account/${nft.owner.address}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Owner Address"
                      className="bg-gray-100 p-1 hover:bg-gray-200"
                    >
                      {nft.owner.address.substr(0, 4)}...
                      {nft.owner.address.slice(-4)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
