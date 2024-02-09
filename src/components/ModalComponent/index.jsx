import Modal from 'react-modal';
import PropTypes from 'prop-types';

const ModalComponent = ({ isOpen, onRequestClose, alertData }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <h2>Información</h2>
      <pre>{JSON.stringify(alertData, null, 2)}</pre>
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
