import React, { useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import backgroundImage from '../images/person2.png';
import '../ComponentStyle/Participant.css';

const HOST = "ws://localhost:8000";

const Host = () => {
  const gridStyle = {
    height: '50%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '1px solid white', // added border
  };

  const [time, setTime] = useState(null); // onClick={() => handleTimeChange(30)}

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
    <IconButton key="1" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }}><VideocamOffIcon /></IconButton>,
    <IconButton key="2" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }}><VolumeOffIcon /></IconButton>,
    <IconButton key="3" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }}><StopScreenShareIcon /></IconButton>,
    <IconButton key="4" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }}><CallIcon /></IconButton>,
  ];

  const buttons1 = [
    <IconButton key="5" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }} onClick={() => handleTimeChange(15)}> 15s</IconButton>,
    <IconButton key="6" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }} onClick={() => handleTimeChange(30)}> 30s</IconButton>,
    <IconButton key="7" aria-label="call" color="primary" style={{ backgroundColor: '#fff', borderRadius: '50%', margin: '10px', fontSize: '1.5rem' }} onClick={() => handleTimeChange(45)}> 45s</IconButton>,
  ];
  return (
    <Grid container spacing={0} style={{ height: '100vh' }}>
      <Grid item xs={6} style={gridStyle}>
        <div className='part1'>Participant1</div>
        <Paper style={{ backgroundColor: 'transparent' }}>Participant1</Paper>

      </Grid>
      <Grid item xs={6} style={gridStyle}>
        <div className='part1'>Participant2</div>
        <Paper style={{ backgroundColor: 'transparent' }}>Item 2</Paper>
      </Grid>
      <Grid item xs={6} style={gridStyle}>
        <div className='part1'>Participant3</div>
        <Paper style={{ backgroundColor: 'transparent' }}>Item 3</Paper>
      </Grid>
      <Grid item xs={6} style={gridStyle}>
        <div className='part1'>Participant4</div>
        <Paper style={{ backgroundColor: 'transparent' }}>Item 4</Paper>
      </Grid>

      <Grid item xs={12} style={{}}>
        <Grid
          container
          spacing={0}
          justifyContent="center" // align buttons horizontally to the center
          alignItems="center" // center buttons vertically


          className='lastgrid'

          style={{
            flexWrap: "wrap",
          }}
        >

          {buttons}
          <p style={{ color: "white", textAlign: "center", left: '5px' }}>
            Counter Timer --
          </p>
          {buttons1}


          <Grid className="smalimg" style={{ position: 'absolute', left: '83%', bottom: '10px' }}></Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};


export default Host;