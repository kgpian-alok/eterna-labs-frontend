import React, { useState } from "react";

export const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-lg border border-white/10 -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900/90 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
};
