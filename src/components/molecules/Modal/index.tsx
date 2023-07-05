import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

type ModalProps = {
  show: boolean;
  children?: ReactNode;
  onClose: () => void;
  backdropStatic?: boolean;
  size?: 'sm' | 'lg';
};

function Modal({
  show = false,
  children,
  onClose,
  backdropStatic = false,
  size,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(show ? show : false);
  const closeButtonRef = useRef<any | null>(null);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const handleOpenChange = (opened: boolean) => {
    if (backdropStatic) return null;

    if (!opened && isOpen !== undefined) {
      // controlled component
      onClose();
      return;
    }
    // un-controlled component
    setIsOpen(show);
  };

  const sizeOptions =
    size === 'lg' ? 'max-w-4xl' : size === 'sm' ? 'max-w-sm' : 'max-w-xl';

  return (
    <React.Fragment>
      <Transition.Root show={isOpen} as={Fragment} appear>
        <Dialog
          onClose={handleOpenChange}
          initialFocus={closeButtonRef}
          className="relative z-[9999999]"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-green-primary bg-opacity-75 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center px-4 py-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-400"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={clsx('mx-auto w-full rounded-lg', sizeOptions)}
                >
                  <div className="px-4 pt-3 pb-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}

export default Modal;
