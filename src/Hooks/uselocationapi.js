import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function uselocationapi() {
  const [Group, setGroup] = useState([]);
  const [distric, setdistric] = useState([]);
  const [Division, setDivision] = useState([]);

  useEffect(() => {
    fetch("/bloodgroup.json")
      .then((res) => res.json())
      .then((data) => setGroup(data));
    fetch("/Distric.json")
      .then((res) => res.json())
      .then((data) => setdistric(data));
    fetch("/Division.json")
      .then((res) => res.json())
      .then((data) => setDivision(data));
  }, []);
  return [Group, distric, Division];
}

export default uselocationapi;
