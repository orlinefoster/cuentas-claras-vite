import ModalComponent from "./components/ModalComponent";
import useApp from "./hooks/useApp";
import './index.css'

function App() {
  const {
    newPerson,
    setNewPerson,
    addPerson,
    clearParticipants,
    calculateTransfers,
    participants,
    editPerson,
    modalIsOpen,
    openModal,
    closeModal,
    modalData,
    isEditing
  } = useApp();

  const handleCalculateTransfers = (e) => {
    e.preventDefault();
    calculateTransfers();
    openModal();
  };

  return (
    <>
      <header>
        <h1 className="title">Cuentas claras</h1>
      </header>
      {/* Form */}
      <div className="form-container">
        <form>
          <label className="label" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="input"
            value={newPerson.name}
            onChange={(e) =>
              setNewPerson({ ...newPerson, name: e.target.value })
            }
            autoComplete="name"
          />
          <label className="label" htmlFor="amount">
            Monto
          </label>
          <input
            type="number"
            id="amount"
            className="input"
            value={newPerson.amount}
            onChange={(e) =>
              setNewPerson({ ...newPerson, amount: e.target.value })
            }
          />
          <div className="buttons-container">
            {
              isEditing === false ? (
                <button onClick={addPerson}>Agregar</button>
              ) : (
                <button onClick={addPerson}>Modificar</button>
              )
            }
            <button onClick={clearParticipants}>Limpiar</button>
            <button onClick={handleCalculateTransfers}>Calcular</button>
          </div>
        </form>
      </div>
      <div>
        {/* Tabla */}
        <h3>Participantes</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Importe</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index}>
                  <td>{participant.name}</td>
                  <td>$ {participant.amount}</td>
                  <td>
                    <button onClick={() => editPerson(index)}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        alertData={modalData}
      />
    </>
  );
}

export default App;
