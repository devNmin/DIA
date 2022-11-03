import React from "react";

function SideBarItem({ menu, isActive }) {
  return (
    isActive === true ? (
        <div style={{ marginTop :'1.3rem', fontSize: 32, color: 'red' }}>
          <p>{menu.name}</p>
        </div>
      ) : (
        <div style={{ marginTop :'1.3rem', fontSize: 32 }}>
      <p>{menu.name}</p>
        </div>
    )
  )
}

export default SideBarItem;