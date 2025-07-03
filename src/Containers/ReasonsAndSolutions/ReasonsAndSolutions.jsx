import {Button, Grid, Paper} from "@mui/material";
import React, {useState} from "react";


const ReasonsAndSolutions = ()=>{

  const [state, setState] = useState({
    solution: true,
    reason: true,
  })

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
                border: state.reason ? '2px solid #f44336' : 'none',
                borderRadius: state.solution && state.reason ? '0 0 0 20px' : "0 0 20px 20px",
                overflow: 'hidden',
              }}
            />
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
                overflow: 'hidden',
              }}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default ReasonsAndSolutions;