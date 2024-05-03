import { useState } from "react";
import Modal from "react-modal";
import { modalProps } from "~~/types/utils";

// Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CustomModal: React.FC<modalProps> = ({ children, clickElement }) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsOpen(IsOpen => !IsOpen);
  };

  return (
    <div>
      <span onClick={handleModal}>{clickElement}</span>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="MODAL"
      >
        <div>
          <div>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={handleModal}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {children}
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
