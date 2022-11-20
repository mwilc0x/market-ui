import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

export default function SellModal({ open, nft, closeModal, listItem }) {
  const [price, setPrice] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const listNow = async () => {
    if (price == null || price < 0) {
      setError(true);
      return;
    }

    setProcessing(true);

    await listItem(price);

    setTimeout(() => {
      closeModal();
      setProcessing(false);
    }, 500);
  };

  const handlePriceChange = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
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
                    <Image 
                      alt="nft image" 
                      src={nft.json.image} 
                      className="rounded-full"
                      height="400"
                      width="400"
                    />
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
                        value={price}
                        onChange={handlePriceChange}
                        name="amount"
                        id="amount"
                        className="w-full rounded-lg px-4 py-3 bg-gray-50 border border-gray-400 text-black"
                      />
                      <button
                        className="w-full mt-4 bg-blue-500 text-white rounded-lg px-4 py-4 disabled:bg-gray-300 disabled:text-gray-700 disabled:hover:scale-100"
                        name="list"
                        onClick={listNow}
                        disabled={processing}
                      >
                        {processing ? (
                          <span>Processing</span>
                        ) : (
                          <span>List Now</span>
                        )}
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
