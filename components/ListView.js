export default function ListView({ nfts }) {
  return (
    <>
      <div className="sm:hidden mt-16">
        {nfts.map((nft, index) => (
          <div key={index} className="w-full rounded-lg ">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 ng-star-inserted border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)]">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 float-left">
                  <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
                    <img
                      src={nft.image}
                      className="object-center object-cover rounded-lg min-w-[50px] min-h-[50px]"
                    />
                  </div>
                </dt>
                <dd className="ml-[60px] text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p className="font-semibold text-gray-700">{nft.name}</p>
                  <p className="mt-1">{nft.description}</p>
                  <div className="mt-4">
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
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <table className="hidden sm:block clear-both mt-16 relative h-full min-w-full rounded-lg border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem]">
        <tbody>
          {nfts.map((nft, index) => (
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
    </>
  );
}
