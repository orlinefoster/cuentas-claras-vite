import { useState } from 'react';

const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalData(null);
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
    modalData,
  };
};

export default useModal;
