import {Button, CircularProgress, Divider, Grid, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../../Components/Modal/Modal.jsx";
import CreateReason from "../../Components/CreateReason/CreateReason.jsx";
import CreateSolution from "../../Components/CreateSolution/CreateSolution.jsx";
import {useFetchFilterData} from "../../globalHooks.js";
import {useDeleteReasons, useDeleteSolution} from "./hooks.js";

const ReasonsAndSolutions = ()=>{

  const [state, setState] = useState({
    solution: true,
    reason: true,
  });

  const {reasons, reasonsLoading, solutions, solutionsLoading, fetchFilterData} = useFetchFilterData();
  const [openModal, setOpenModal] = useState({ open: false });

  const handleCloseModal = () => {
    setOpenModal({ open: false });
  };

  const {reasonsDeleteLoading, deleteReason } = useDeleteReasons();
  const {solutionDeleteLoading, deleteSolutions } = useDeleteSolution();

  useEffect(()=>{
    void fetchFilterData();
  }, [fetchFilterData])

  return(
    <>
      <div className='list'>
        <Paper className='list-paper' sx={{
          height: '100%',
          pb: 2,
        }}>
           <Grid sx={{
             display: 'flex',
             flexWrap: 'wrap',
             gap: '5px',
           }}>
             <Button
               startIcon={<AddIcon/>}
               variant={"outlined"}
               color={"error"}
               sx={{
                 width: "calc(40% - 5px)",
               }}
               onClick={()=>{
                 setOpenModal({
                   open: true,
                   type: 'addReason',
                 })
               }}
             >
               Новая причина
             </Button>
             <Button
               startIcon={<AddIcon/>}
               variant={"outlined"}
               color={"success"}
               sx={{
                 width: "60%",
               }}
               onClick={()=>{
                 setOpenModal({
                   open: true,
                   type: 'addSolution',
                 })
               }}
             >
               Новое решения
             </Button>
             <Button variant={state.reason ? "contained" : "outlined"} color={"error"}
                     sx={{
                       background: state.reason ? '#9a3029' : "transparent",
                       fontSize: '18px',
                       width: "calc(40% - 5px)",
                       opacity: state.reason ? "1" : "0.5",
                       borderRadius: '5px 0 0  0'
             }} onClick={()=>{
               if (!state.solution && state.reason) return;
               setState({
                 ...state,
                 reason: !state.reason,
               })
             }}>
               Причины
             </Button>
             <Button variant={state.solution ? "contained" : "outlined"} color={"success"}
                     sx={{
                       fontSize: '18px',
                       width: "60%",
                       opacity: state.solution ? "1" : "0.5",
                       borderRadius: '0 5px 0 0'
             }} onClick={()=>{
               if (state.solution && !state.reason) return;
               setState({
                 ...state,
                 solution: !state.solution,
               })
             }}>
               Решения
             </Button>
           </Grid>
          <Grid
            sx={{
              display: 'flex',
              gap: state.reason && state.solution ? '5px' : "0",
            }}
          >
            <Grid
              sx={{
                width: state.reason
                  ? state.solution
                    ? 'calc(40% - 5px)'
                    : '100%'
                  : '0',
                opacity: state.reason ? 1 : 0,
                transition: 'width 0.4s ease, opacity 0.4s ease',
                border: state.reason ? '2px solid #9a3029' : 'none',
                borderRadius: state.solution && state.reason ? '0 0 0 20px' : "0 0 20px 20px",
                overflow: 'auto',
                height: "calc(100vh - 211px)",
              }}
            >
              <table style={{
                opacity: state.reason ? 1 : 0,
                transition: '0.2s ease',
              }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Причина</th>
                    <th>Действие</th>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: 0 }}>
                      <Divider />
                    </td>
                  </tr>
                </thead>
                <tbody>
                {reasonsLoading && (
                  <>
                    <tr>
                      <td style={{textAlign: 'center'}} colSpan={3} >
                        <CircularProgress color={"error"}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <Divider />
                      </td>
                    </tr>
                  </>
                )}
                {(reasons || []).map(reason => (
                  <React.Fragment key={reason.id}>
                    <tr>
                      <td>{reason.id}</td>
                      <td >{reason.title}</td>
                      <td>
                       <Button
                         loading={reasonsDeleteLoading}
                         onClick={()=>{
                           setOpenModal({
                             open: true,
                             type: 'deleteReason',
                             id: reason.id,
                             text: reason.title,
                           })
                         }}
                         color={'error'}
                         variant={"outlined"}>
                         Удалить
                       </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <Divider />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                </tbody>
              </table>
            </Grid>
            <Grid
              sx={{
                width: state.solution
                  ? state.reason
                    ? '60%'
                    : '100%'
                  : '0',
                opacity: state.solution ? 1 : 0,
                transition: 'width 0.4s ease, opacity 0.4s ease, border 0.6s ease',
                border: state.solution ? '2px solid #66bb6a' : "none",
                borderRadius: state.solution && state.reason ? '0 0 20px 0' : "0 0 20px 20px",
                overflow: 'auto',
                height: "calc(100vh - 211px)",
              }}
            >
            <table style={{
              opacity: state.solution ? 1 : 0,
              transition: '0.2s ease',
            }}>
              <thead>
              <tr>
                <th>ID</th>
                <th>Причина</th>
                <th>Решение</th>
                <th>Действие</th>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0 }}>
                  <Divider />
                </td>
              </tr>
              </thead>
              <tbody>
              {solutionsLoading && (
                <>
                  <tr>
                    <td style={{textAlign: 'center'}} colSpan={4} >
                      <CircularProgress color={"success"}/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <Divider />
                    </td>
                  </tr>
                </>
              )}
              {(solutions || []).map(solution=> (
                <React.Fragment key={solution.id}>
                  <tr>
                    <td>{solution.id}</td>
                    <td >{solution.title}</td>
                    <td >{solution.reason.title}</td>
                    <td>
                      <Button
                        loading={solutionDeleteLoading}
                        onClick={()=>{
                          setOpenModal({
                            open: true,
                            type: 'deleteSolution',
                            id: solution.id,
                            text: solution.title,
                          });
                        }}
                        color={'error'}
                        variant={"outlined"}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <Divider />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              </tbody>
            </table>
            </Grid>
          </Grid>
        </Paper>
        <Modal open={openModal.open} handleClose={handleCloseModal}>
          {openModal.type === 'addReason' && (
            <CreateReason handleClose={handleCloseModal}/>
          )}
          {openModal.type === 'addSolution' && (
            <CreateSolution handleClose={handleCloseModal}/>
          )}
          {openModal.type === 'deleteReason' && (
            <Grid sx={{
              width: '400px',
            }}>
              <Typography sx={{
                fontSize: '20px',
                textAlign: 'center',
              }}>
                Вы действительно хотите удалить причину - "{openModal.text}"?
              </Typography>
              <Grid container gap={1} padding={"10px 0 0"}>
                <Button variant={'outlined'} color={"error"}
                        onClick={async()=>{
                          await deleteReason(openModal.id);
                          await fetchFilterData();
                          handleCloseModal();
                        }}
                        sx={{
                          flexGrow: 1,
                        }}
                >
                  Удалить
                </Button>
                <Button variant={'outlined'} color={"primary"} onClick={handleCloseModal}
                        sx={{
                  flexGrow: 1,
                }}>
                  Отмена
                </Button>
              </Grid>
            </Grid>
          )}
          {openModal.type === 'deleteSolution' && (
            <Grid sx={{
              width: '400px',
            }}>
              <Typography sx={{
                fontSize: '20px',
                textAlign: 'center',
              }}>
                Вы действительно хотите удалить решение - "{openModal.text}"?
              </Typography>
              <Grid container gap={1} padding={"10px 0 0"}>
                <Button variant={'outlined'} color={"error"}
                        onClick={async()=>{
                          await deleteSolutions(openModal.id);
                          handleCloseModal();
                          handleCloseModal();
                        }}
                        sx={{
                          flexGrow: 1,
                        }}
                >
                  Удалить
                </Button>
                <Button variant={'outlined'} color={"primary"} onClick={handleCloseModal}
                        sx={{
                          flexGrow: 1,
                        }}>
                  Отмена
                </Button>
              </Grid>
            </Grid>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ReasonsAndSolutions;