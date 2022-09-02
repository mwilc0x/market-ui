import Image from "next/image";

export default function ListView({ nfts, searchBy }) {
  return (
    <>
      <div className="sm:hidden mt-16">
        {nfts.map((nft, index) => (
          <div key={index} className="w-full rounded-lg ">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 ng-star-inserted border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 float-left">
                  <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
                    <Image
                      alt="nft image"
                      src={nft.image}
                      className="object-center object-cover rounded-lg min-w-[50px] min-h-[50px]"
                    />
                  </div>
                </dt>
                <dd className="ml-[60px] text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                  <p className="font-semibold text-gray-700 dark:text-gray-100">
                    {nft.name}
                  </p>
                  <p className="mt-1">{nft.description}</p>
                  {searchBy === "creator" && (
                    <div className="mt-4">
                      <span className="mr-2">owner</span>
                      <a
                        href={`${process.env.NEXT_PUBLIC_SOLSCAN_ACCOUNT}/${nft.owner.address}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Owner Address"
                        className="bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:text-gray-300"
                      >
                        {nft.owner.address.substr(0, 4)}...
                        {nft.owner.address.slice(-4)}
                      </a>
                    </div>
                  )}
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
              className="bg-transparent h-full lg:hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] rounded-xl shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 ng-star-inserted dark:text-gray-100 dark:bg-zinc-800"
            >
              <td className="py-4 px-6 rounded-l-lg">
                <div className="w-[50px] h-[50px] overflow-hidden">
                  <Image
                    alt="nft image"
                    src={nft.image}
                    className="object-center object-cover rounded-lg min-w-[50px] min-h-[50px]"
                  />
                </div>
              </td>
              <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-100">
                {nft.name}
              </td>
              <td className="py-4 px-6 text-sm">{nft.description}</td>
              {searchBy === "creator" && (
                <td className="py-4 px-6 text-sm rounded-r-lg">
                  <span className="mr-2">owner</span>
                  <a
                    href={`${process.env.NEXT_PUBLIC_SOLSCAN_ACCOUNT}/${nft.owner.address}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Owner Address"
                    className="bg-gray-100 dark:bg-gray-700 p-1 hover:bg-gray-200 dark:text-gray-300"
                  >
                    {nft.owner.address.substr(0, 4)}...
                    {nft.owner.address.slice(-4)}
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
