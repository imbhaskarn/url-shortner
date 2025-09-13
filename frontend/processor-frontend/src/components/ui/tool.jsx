// components/ui/tool.js

import React, { createContext, useContext, useState } from "react";

// Context to manage tooltip visibility
const TooltipContext = createContext();

// Tooltip Provider to wrap the application
export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({ content: "", visible: false });

  const showTooltip = (content) => {
    setTooltip({ content, visible: true });
  };

  const hideTooltip = () => {
    setTooltip({ content: "", visible: false });
  };

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, hideTooltip }}>
      {children}
      {tooltip.visible && (
        <TooltipContent>{tooltip.content}</TooltipContent>
      )}
    </TooltipContext.Provider>
  );
};

// Tooltip component to trigger the tooltip
export const Tooltip = ({ children }) => {
  const { showTooltip, hideTooltip } = useContext(TooltipContext);

  return (
    <span
      onMouseEnter={() => showTooltip(children.props["data-tooltip"])}
      onMouseLeave={hideTooltip}
    >
      {children}
    </span>
  );
};

// Tooltip Content component
export const TooltipContent = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        zIndex: "1000",
      }}
    >
      {children}
    </div>
  );
};

// Tooltip Trigger component
export const TooltipTrigger = ({ children }) => {
  return <span>{children}</span>;
};
