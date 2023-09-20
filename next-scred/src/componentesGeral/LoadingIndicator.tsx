import React from "react";

export default function LoadingIndicator() {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-30">
      <div className='flex'>
         <div className={`${circleCommonClasses} mr-1 animate-bounce delay-75`}></div>
         <div className={`${circleCommonClasses} mr-1 animate-bounce delay-150`}></div>
         <div className={`${circleCommonClasses} animate-bounce delay-225`}></div>
      </div>
    </div>
  );
}





