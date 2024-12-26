import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../index.css'

const ModalComponent = ({ isOpen, onRequestClose, alertData }) => (
  <Modal
  className="Modal"
  overlayClassName="Overlay"
  isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <h2>Resumen</h2>
      <p>Monto total: {alertData?.totalAmount}</p>
      <p>Total de participantes: {alertData?.totalParticipants}</p>
      <p>Monto total: {alertData?.totalAmount}</p>
      <p>Monto por persona: {alertData?.averageAmount}</p>
      <h3>
        Transferencias:
      </h3>
        {alertData?.transactions.map((t, i) => 
          <p key={i}>
            {t.from} debe a {t.to}: ${t.amount.toFixed(2)}
          </p>
        )}
      <button onClick={onRequestClose}>Cerrar</button>
    </div>
  </Modal>
);

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  alertData: PropTypes.object,
};

export default ModalComponent;
