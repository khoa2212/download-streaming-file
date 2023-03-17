import axios from "axios";
import { useState } from "react";

export default function Downloadfile() {
  const [code, setCode] = useState(200);
  const [message, setMessage] = useState("");
  const handleClick = () => {
    const axiosIntance = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpZCI6IjY5M2Y2ZmViLTU0NjctNGNkMy1hMjZjLTRlZWU5ZmMwNTJjZyIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJuaG5hbUBnbWFpbC5jb20iLCJydWxlcyI6W3siYWN0aW9uIjoicmVhZCIsInN1YmplY3QiOiJ1c2VyIiwiZmllbGRzIjpudWxsLCJjb25kaXRpb25zIjpudWxsLCJpbnZlcnRlZCI6MCwicmVhc29uIjoiT25seSBzcGVjaWFsaXN0IGFuZCBhZG1pbiBjYW4gcmVhZCB1c2VyIn0seyJhY3Rpb24iOiJ1cGRhdGUiLCJzdWJqZWN0IjoidXNlciIsImZpZWxkcyI6WyJzdGF0dXMiLCJmdWxsbmFtZSIsImRvYiIsInBob25lIiwiYWRkcmVzcyJdLCJjb25kaXRpb25zIjp7InJvbGUiOiJlbXBsb3llZSIsInN0YXR1cyI6WyJpbmFjdGl2ZSIsImFjdGl2ZSIsImJsb2NrZWQiXX0sImludmVydGVkIjowLCJyZWFzb24iOiJTcGVjaWFsaXN0IGFuZCBhZG1pbiBjYW4gb25seSB1cGRhdGUgdXNlciByb2xlIGVtcGxveWVlIn0seyJhY3Rpb24iOiJkZWxldGUiLCJzdWJqZWN0IjoidXNlciIsImZpZWxkcyI6WyJzdGF0dXMiLCJmdWxsbmFtZSIsImRvYiIsInBob25lIiwiYWRkcmVzcyJdLCJjb25kaXRpb25zIjp7InJvbGUiOiJlbXBsb3llZSIsInN0YXR1cyI6WyJpbmFjdGl2ZSIsImFjdGl2ZSIsImJsb2NrZWQiXX0sImludmVydGVkIjowLCJyZWFzb24iOiJTcGVjaWFsaXN0IGFuZCBhZG1pbiBjYW4gb25seSBkZWxldGUgdXNlciByb2xlIGVtcGxveWVlIn0seyJhY3Rpb24iOiJjcmVhdGUiLCJzdWJqZWN0IjoidXNlciIsImZpZWxkcyI6bnVsbCwiY29uZGl0aW9ucyI6bnVsbCwiaW52ZXJ0ZWQiOjAsInJlYXNvbiI6Ik9ubHkgc3BlY2lhbGlzdCBhbmQgYWRtaW4gY2FuIGNyZWF0ZSB1c2VyIn0seyJhY3Rpb24iOiJyZWFkIiwic3ViamVjdCI6InByb2plY3RfcHJvcG9zYWwiLCJmaWVsZHMiOm51bGwsImNvbmRpdGlvbnMiOm51bGwsImludmVydGVkIjowLCJyZWFzb24iOiJPbmx5IHNwZWNpYWxpc3QgYW5kIGFkbWluIGNhbiBjcmVhdGUgdXNlciJ9XSwiaWF0IjoxNjc4OTM1NzQ4fQ.kamZtj2Zs-DSjYdg6jD_d682sFXk4c2ay-4UGovrRyI`,
      },
      responseType: "arraybuffer",
      //responseType: "blob",
    }); 

    axiosIntance
      .get(
        `project-proposals/excel-file`
      )
      .then((res) => {
        // { type: "application/pdf" }
        const file = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
        setCode(error.response.status);
        error.response.data.text().then((promiseResult) => {
          setMessage(JSON.parse(promiseResult).message);
        });
      });
  };
  return (
    <div>
      <button onClick={handleClick}>Downloadfile</button>
      {code !== 200 && <div>{message} and {code}</div>}
    </div>
  );
}
