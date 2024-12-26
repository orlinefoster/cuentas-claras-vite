import { useState } from "react";

function useApp() {
  const [participants, setParticipants] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", amount: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);


  const addPerson = (e) => {
    e.preventDefault();

    if (newPerson.name.trim() === "" || newPerson.amount.trim() === "") {
      alert("Por favor, complete todos los campos antes de agregar.");
      return;
    }

    if (editingIndex !== null) {
      const updatedParticipants = [...participants];
      updatedParticipants[editingIndex] = newPerson;
      setParticipants(updatedParticipants);
      setEditingIndex(null);
    } else {
      setParticipants([...participants, newPerson]);
    }

    setNewPerson({ name: "", amount: "" });
  };

  const editPerson = (index) => {
    if (isEditing === true) {
      setEditingIndex(null);
      setNewPerson("");
      setIsEditing(false);
    } else {
      setIsEditing(true)
      setNewPerson(participants[index]);
      setEditingIndex(index);
    }
  };

  const clearParticipants = (e) => {
    e.preventDefault();
    setParticipants([]);
  };

  const calculateTransfers = () => {
    if (participants.length === 0) {
      console.log("No hay participantes para calcular.");
      return;
    }

    // Calcular total y promedio
    const totalAmount = participants.reduce(
      (total, person) => total + parseInt(person.amount),
      0
    );
    const averageAmount = totalAmount / participants.length;

    // Calcular deudas y créditos
    const balances = participants.map((person) => {
      const amount = parseInt(person.amount);
      return {
        name: person.name,
        balance: amount - averageAmount,
      };
    });

    // Filtrar participantes con deudas y créditos
    const debtors = balances.filter((balance) => balance.balance < 0);
    const creditors = balances.filter((balance) => balance.balance > 0);

    // Realizar transferencias
    const transactions = [];
    for (const debtor of debtors) {
      for (const creditor of creditors) {
        const transferAmount = Math.min(
          Math.abs(debtor.balance),
          creditor.balance
        );
        if (transferAmount > 0) {
          transactions.push({
            from: debtor.name,
            to: creditor.name,
            amount: transferAmount,
          });
          debtor.balance += transferAmount;
          creditor.balance -= transferAmount;
        }
      }
    }

    // Almacenar datos para mostrar en el alert
    const alertData = {
      totalAmount: totalAmount,
      totalParticipants: participants.length,
      averageAmount: averageAmount,
      participants: participants.map((person) => ({
        name: person.name,
        amount: person.amount,
      })),
      transactions: transactions.map((transaction) => ({
        from: transaction.from,
        to: transaction.to,
        amount: transaction.amount,
      })),
    };

    setModalData(alertData);
  };

  // MODAL
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return {
    newPerson,
    setNewPerson,
    addPerson,
    clearParticipants,
    calculateTransfers,
    participants,
    modalData,
    openModal,
    closeModal,
    modalIsOpen,
    editPerson,
    isEditing
  };
}

export default useApp;
