import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import sellNftTransaction from "/utils/auctionhouse/SellNft";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

export default function SellModal({ open, nft, closeModal }) {
  const { publicKey, signTransaction } = useWallet();

  function setOpen() {}

  const listNow = async () => {
    const amount = document.getElementById("amount").value;
    await sellNftTransaction(amount, nft, publicKey, signTransaction);
    closeModal();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img src={nft.image} className="rounded-full" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Sell your Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{nft.name}</p>
                      <p className="text-sm text-gray-500 mt-4">Amount:</p>
                      <input
                        type="number"
                        step="0.0001"
                        min="0.0000"
                        name="amount"
                        id="amount"
                        className="w-full rounded-lg px-4 py-3 bg-gray-50 border border-gray-400 text-black"
                      />
                      <button
                        className="w-full mt-4 bg-blue-500 text-while rounded-lg px-4 py-4"
                        name="list"
                        onClick={listNow}
                      >
                        List Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
