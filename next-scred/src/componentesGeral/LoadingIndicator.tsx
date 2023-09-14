import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex items-center justify-center rounded-md bg-white p-5 shadow-lg">
        <div
          className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid 
                    border-current border-r-transparent align-[-0.125em] 
                    motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
                          !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
