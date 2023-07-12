import { getParcels } from "../api";
import { useQuery } from "react-query";

function ParcelsList() {
  const { isLoading, error, data } = useQuery("repoData", getParcels);
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pickup Address</th>
            <th scope="col">Dropoff Address</th>
            <th scope="col">status</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.data.map((row, index) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{row.pickupAddress}</td>
                  <td>{row.dropoffAddress}</td>
                  <td>{row.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ParcelsList;
