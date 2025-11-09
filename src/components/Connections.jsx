import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return;
  console.log(connections);
  return (
    <div className="">
      <h1 className="text-center  mt-5 text-3xl">Connections</h1>
      <div className="my-6 flex flex-col items-center">
        {connections?.map((connection) => {
          console.log(connection);
          return <ConnectionCard connection={connection} sendButton={true} />;
        })}
      </div>
    </div>
  );
};

export default Connections;
