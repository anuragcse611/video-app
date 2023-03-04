import React, { useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import '../ComponentStyle/Participant.css';

const HOST = "ws://localhost:8000";

const Host = () => {
  const [time, setTime] = useState(null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    const client = new WebSocket(HOST);
    client.onopen = () => {
      client.send(JSON.stringify({ type: "time", time: newTime }));
    };
    client.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  const buttons = [
    <IconButton key="1" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }}><VideocamOffIcon /></IconButton>,
    <IconButton key="2" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }}><VolumeOffIcon /></IconButton>,
    <IconButton key="3" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }}><StopScreenShareIcon /></IconButton>,
    <IconButton key="4" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }}><CallIcon /></IconButton>,


    <IconButton key="7" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }} onClick={() => handleTimeChange(15)}>15s</IconButton>,
    <IconButton key="6" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px' }} onClick={() => handleTimeChange(30)}>30s</IconButton>,
    <IconButton key="6" aria-label="call" color="primary" style={{ backgroundColor: '#c4c4c4', borderRadius: '50%', margin: '10px', }} onClick={() => handleTimeChange(45)}>45s</IconButton>,
  ];

  return (
    <Grid container style={{ height: '100vh', position: 'fixed' }}>
      <Grid item xs={12} style={{ height: '50%', background: 'red', border: '1px solid white' }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={6} className='grid1'>
            <div className='part1'>Participant1</div>
          </Grid>
          <Grid item xs={6} className='grid1'>
            <div className='part1'>Participant2</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ height: '50%', position: 'relative', border: '1px solid white' }}>
        <Grid container style={{ height: '100%', position: 'relative' }}>
          <Grid item xs={6} className='grid1'>
            <div className='part1'>Participant3</div>
          </Grid>
          <Grid item xs={6} className='grid1'>
            <div className='part1'>Participant4</div>
          </Grid>
          <Grid item xs={12} style={{ position: 'absolute', bottom: 0 }}>
            <Grid container justifyContent="center">
              <Grid>
                <center>

                  {buttons}



                </center>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Host;