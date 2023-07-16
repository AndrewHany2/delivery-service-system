import { useEffect } from "react";
import { getParcels } from "../api";
import { useQuery } from "react-query";
import Timestamp from "react-timestamp";

function Status() {
  const { isLoading, error, data, refetch } = useQuery("parcels", getParcels, {
    refetchOnMount: true,
  });
  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="m-5">
      {data && data.data.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pickup Address</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Dropoff Address</th>
              <th scope="col">Dropoff Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{row.pickupAddress}</td>
                  <td>
                    <Timestamp
                      relative
                      date={row.pickupDate}
                      options={{ includeDay: true, twentyFourHour: true }}
                    />
                  </td>
                  <td>{row.dropoffAddress}</td>
                  <td>
                    <Timestamp
                      relative
                      date={row.dropoffDate}
                      options={{ includeDay: true, twentyFourHour: true }}
                    />
                  </td>
                  <td>{row.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="d-flex align-items-center justify-content-center w-100">
          No Available Parcels
        </div>
      )}
    </div>
  );
}

export default Status;
