import {Button, Divider, Grid, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useFetchReasonAndSolution} from "./hooks.js";


const ReasonsAndSolutions = ()=>{

  const [state, setState] = useState({
    solution: true,
    reason: true,
  });

  const {
    reasons,
    solutions,
    reasonsLoading,
    solutionsLoading,
    reasonsCreateLoading,
    reasonsDeleteLoading,
    solutionsDeleteLoading,
    solutionsCreateLoading,
    fetchReasons,
    fetchSolutions,
    createReason,
    deleteReason,
    deleteSolutions,
    createSolution,
  } = useFetchReasonAndSolution();

  useEffect(()=>{
    void fetchReasons();
    void fetchSolutions();
  }, [fetchReasons, fetchSolutions])

  return(
    <>
      <div className='list'>
        <Paper className='list-paper' sx={{
          height: '100%',
          pb: 2,
        }}>
           <Grid sx={{
             display: 'flex',
             gap: '5px',
           }}>
             <Button variant={state.reason ? "contained" : "outlined"} color={"error"}
                     sx={{
                       background: state.reason ? '#9a3029' : "transparent",
                       fontSize: '18px',
                       width: "calc(40% - 5px)",
                       opacity: state.reason ? "1" : "0.5",
                       borderRadius: '20px 0 0  0'
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
                       borderRadius: '0 20px 0 0'
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
              height: 'calc(100% - 45px)',
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
                height: "calc(100vh - 169px)",
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
                {(reasons || []).map(reason => (
                  <React.Fragment key={reason.id}>
                    <tr>
                      <td>{reason.id}</td>
                      <td >{reason.title}</td>
                      <td>
                       <Button color={'error'} variant={"outlined"}>
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
                height: "calc(100vh - 169px)",
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
              {(solutions || []).map(solution=> (
                <React.Fragment key={solution.id}>
                  <tr>
                    <td>{solution.id}</td>
                    <td >{solution.title}</td>
                    <td >{solution.reason.title}</td>
                    <td>
                      <Button color={'error'} variant={"outlined"}>
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
      </div>
    </>
  );
};

export default ReasonsAndSolutions;