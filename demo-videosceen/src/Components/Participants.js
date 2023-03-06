import React, { useState, useEffect } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import Grid from '@mui/material/Grid';
import '../ComponentStyle/Host.css';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import song from '../sounds/buzzer.mp3';

let time = -1;

const Participants = () => {
  const [time, setTime] = useState(null);
  
  const [ws, setWs] = useState(null); 

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:8000/');

    newWs.onopen = () => {
      setWs(newWs);
    };

    newWs.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setTime(data.time);
    };
  }, []);

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else  {
        clearInterval(intervalId);
      }
    }, 1000);

    
    
    if(time === 0) {

      let audio1 = new Audio(song);
      audio1.play();
    
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);
  
 

  const buttons = [
    <IconButton key="1" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }} ><VideocamOffIcon /></IconButton>,
    <IconButton key="2" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }} ><VolumeOffIcon /></IconButton>,
    <IconButton key="3" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }} ><CallIcon /></IconButton>,

  ];
  return (
 

    <Grid container style={{ height: '100vh', }}>

      <Grid container >
        {/* // color match krwana h */}
        <Grid item xs={2} style={{ background: '#3E54AC', height: '100%', border: '1px solid white' }}>
          <Grid item className='sidegrid' >
            <div className='participant'>Participant1</div>
          </Grid>
          <Grid item className='sidegrid' >
            <div className='participant'>Participant2</div>
          </Grid>
          <Grid item className='sidegrid' >
            <div className='participant'>Participant3</div>
          </Grid>
          <div style={{ color: 'white', position: 'absolute', left: '85%', bottom:'80%' }}>
            {!time ? '' : 
            <h2> {time} Secs Left</h2>
                }
          </div>
        </Grid>
        <Grid item xs={10} className='maingrid'>
          <Grid container style={{ height: '100%' }}>
         
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 20 }}>
              {/* remove marginBottom for fit to bottom */}
              <div className='hosticon'>Host</div>
              <Grid container spacing={2} justifyContent="center">
                {buttons}
              </Grid>
              <Grid className='smallimg' style={{ marginRight: '50px' }} >
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid>

  );
}

export default Participants;