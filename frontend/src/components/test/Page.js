import React from "react";
import "./Page.css";

const Page = ({ image }) => {
  return (
    <div style={{ 'marginTop' : '50px'}} className="container">
      <img src={image} alt="멤버 사진" />
    </div>
  );
};

export default Page;