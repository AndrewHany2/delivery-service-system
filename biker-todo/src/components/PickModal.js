import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function PickModal({ toggle, isOpen, parcel, mutation }) {
  const [pickupDateTime, setPickupDateTime] = useState();
  const [dropoffDateTime, setDropoffDateTime] = useState();

  const convertToDateTimeLocalString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = () => {
    mutation.mutate({
      _id: parcel._id,
      pickupDateTime: pickupDateTime,
      dropoffDateTime: dropoffDateTime,
    });
  };

  return (
    <>
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Continue Details</ModalHeader>
          <ModalBody>
            <div className="input-group mb-3">
              <span className="input-group-text" id="pickupDate">
                Pickup date
              </span>
              <input
                min={convertToDateTimeLocalString(new Date())}
                type="datetime-local"
                className="form-control"
                aria-describedby="pickupDate"
                onChange={(e) => {
                  setPickupDateTime(e.target.value);
                }}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="dropoffDate">
                Dropoff date
              </span>
              <input
                min={pickupDateTime}
                type="datetime-local"
                className="form-control"
                aria-describedby="dropoffDate"
                onChange={(e) => {
                  setDropoffDateTime(e.target.value);
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default PickModal;
