import React, { useState, useEffect, useRef } from "react";

const CustomContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef();

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setVisible(true);
  };

  const handleClick = (e) => {
    // Close menu if clicking outside
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {visible && (
        <ul
          ref={menuRef}
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            listStyle: "none",
            padding: "10px 0",
            margin: 0,
            zIndex: 1000,
            width: "200px"
          }}
        >
          <li style={menuItemStyle} onClick={() => alert("Action 1")}>Action 1</li>
          <li style={menuItemStyle} onClick={() => alert("Action 2")}>Action 2</li>
          <li style={menuItemStyle} onClick={() => alert("Action 3")}>Action 3</li>
        </ul>
      )}
    </>
  );
};

const menuItemStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  transition: "background 0.2s",
};

export default CustomContextMenu;
