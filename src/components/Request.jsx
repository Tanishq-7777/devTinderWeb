import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const reviewRequest = async (status, _id) => {
    await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    dispatch(removeRequest(_id));
  };
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
  }, [requests]);
  console.log(requests);
  if (!requests || requests.length == 0)
    return <h1 className="text-center mt-10">No Request Found</h1>;
  return (
    <div>
      {requests?.map((request) => {
        const user = request?.fromUserId;
        if (!user) return null;
        return (
          <ConnectionCard
            key={request._id}
            _id={request?.fromUserId._id}
            connection={request?.fromUserId}
            sendButton={false}
            handleClick={reviewRequest}
          />
        );
      })}
    </div>
  );
};

export default Request;
