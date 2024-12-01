import React, { useState, useEffect } from "react";
import "./ReceivedDoc.css";
import downloadicon from "../assets/download.svg";
import deleteicon from "../assets/delete.svg";
import fileicon from "../assets/fileicon.svg";
import shareicon from "../assets/share.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReceivedDoc = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  

  return (
    <>
      <div className="Received-Document-Container">
        <div className="Received-Document-Container-Fileicon">
          <img src={fileicon} alt="" />
        </div>
        <div className="Received-Document-Container-Name">
          <h4>{props.filename} by {props.sender}</h4>
        </div>
        <div className="Received-Document-Container-Option">
          <a href={props.filepath} target="_blank">
            <img src={downloadicon} alt="" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ReceivedDoc;
