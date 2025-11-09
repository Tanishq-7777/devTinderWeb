import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  console.log(requests?.fromUserId);
  return (
    <div>
      {requests?.map((request) => {
        return (
          <ConnectionCard
            key={request.fromUserId._id}
            connection={request?.fromUserId}
            sendButton={false}
          />
        );
      })}
    </div>
  );
};

export default Request;
