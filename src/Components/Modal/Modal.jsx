import {Box} from "@mui/material";
import MuiModal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '15px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal = ({open, handleClose, children}) => {

  return(
      <>
        <MuiModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {children}
          </Box>
        </MuiModal>
      </>
  );
};

export default Modal;