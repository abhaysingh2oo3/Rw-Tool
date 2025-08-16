import React from "react";
import "./ActivityTable.css";

const rows = [
  { user:"John Smith", action:"Accessed", module:"Branch A → A1", time:"2 hours ago", status:"Completed" },
  { user:"Sarah Johnson", action:"Modified Access", module:"Branch B", time:"3 hours ago", status:"Completed" },
  { user:"Mike Wilson", action:"Created Module", module:"Branch C → C2", time:"5 hours ago", status:"Completed" },
  { user:"Emily Brown", action:"Updated Profile", module:"User Settings", time:"6 hours ago", status:"Completed" },
  { user:"David Lee", action:"Requested Access", module:"Branch A → A2", time:"8 hours ago", status:"Pending" },
];

export default function ActivitiesTable() {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>User</th><th>Action</th><th>Module/Branch</th><th>Time</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td className="usercell">
                <div className="avatar small">{r.user.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                {r.user}
              </td>
              <td>{r.action}</td>
              <td>{r.module}</td>
              <td>{r.time}</td>
              <td>
                <span className={`badge ${r.status === "Completed" ? "green":"amber"}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
