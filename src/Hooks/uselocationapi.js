import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function uselocationapi() {
  const [Group, setGroup] = useState([]);
  const [distric, setdistric] = useState([]);

  useEffect(() => {
    fetch("/bloodgroup.json")
      .then((res) => res.json())
      .then((data) => setGroup(data));
    fetch("/Distric.json")
      .then((res) => res.json())
      .then((data) => setdistric(data));
  }, []);
  return [Group, distric];
}

export default uselocationapi;
