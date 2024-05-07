import React from "react";

const Modal = ({ children }: { children: React.ReactElement }) => {
  return (
    // <div className="
    // fixed h-[100vh]
    // w-[100vw] top-0 left-0
    // z-40 bg-black
    // flex
    // justify-center
    // items-center
    // ">
    <dialog
      className="
        flex
        flex-col
        gap-4
        sm:max-w-[80vw]
        max-h-[60vh]
        
        //overflow-y-scroll
        mt-[20vh]
        p-8
        bg-neutral-900
        dark:bg-neutral-900
        rounded-lg
        z-50
        "
      open
    >
      <h2>Modal</h2>
      <div className='h-full overflow-y-scroll'>{children}</div>
    </dialog>
    // </div>
  );
};

export default Modal;
