import {useState} from 'react';
import {Button, Divider, IconButton, Popover} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../../../Components/Modal/Modal.jsx";
import EmployeeForm from "../../../../Components/EmployeeForm/EmployeeForm.jsx";

const ListItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const ItemPopover = () => (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{
        '& .MuiPaper-root': {
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          p: '8px 6px',
          borderRadius: '12px'
        },
        '& button': {
          borderRadius: '10px',
        },
      }}
    >
      <Button sx={{color: '#FFFFFF'}} startIcon={<EditIcon />} onClick={() => setOpenModal(true)}>
        Редактировать
      </Button>
      <Button color='error' startIcon={<DeleteIcon />}>
        Удалить
      </Button>
    </Popover>
  );

  return (
    <>
      <tr>
        <td>{item.sip}</td>
        <td>{item.full_name}</td>
        <td>{item.sip}</td>
        <td style={{ textAlign: 'center' }}>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <ItemPopover />
        </td>
      </tr>
      <tr>
        <td colSpan={11} style={{ padding: 0 }}>
          <Divider />
        </td>
      </tr>
      <Modal open={openModal} handleClose={closeModal}>
        <EmployeeForm id={item.id}/>
      </Modal>
    </>
  );
};

export default ListItem;
