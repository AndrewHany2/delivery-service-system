import { useState } from "react";
import { getParcels } from "../api";
import { useQuery } from "react-query";
import PickModal from "../components/PickModal";
import { useMutation } from "react-query";
import { pickParcelAPI } from "../api";

function ParcelsList() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedParcel, setClickedParcel] = useState();
  const { isLoading, data, refetch } = useQuery("repoData", getParcels);

  const mutation = useMutation(pickParcelAPI, {
    onSuccess: (res) => {
      if (res && res.data && res.data.success) {
        setIsOpen(!isOpen);
        refetch();
      }
    },
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
              <th scope="col">Dropoff Address</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{row.pickupAddress}</td>
                  <td>{row.dropoffAddress}</td>
                  <td>{row.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setIsOpen(true);
                        setClickedParcel(row);
                      }}
                    >
                      Pick
                    </button>
                  </td>
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
      <PickModal
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        parcel={clickedParcel}
        mutation={mutation}
      ></PickModal>
    </div>
  );
}

export default ParcelsList;
