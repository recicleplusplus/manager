import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

const sxStyle = {
    color: 'secondary.dark',
    justifyContent: 'center',
    display: 'flex',
}

const sxCenter = {
  justifyContent: 'center',
  display: 'flex',
}

function SimpleDialog({ collector, onClose, open } ) {

  return (
    <Dialog onClose={onClose} open={open} >
      <Box sx={{padding:'20px'}}>
        <Stack direction="row" spacing={2} sx={{alignItems:'center',  justifyContent:'center'}} useFlexGap flexWrap={'wrap'}>
            <Avatar alt="Imagem Coletor" src={collector.photoUrl || "/icon.svg"} 
                sx={{
                    backgroundColor:'secondary.dark', 
                    padding:'3px',
                    width: '100px',
                    height: '100px',
            }}/>
            <Container sx={{padding:'0px'}} direction='row'>
                <Typography variant="h6" sx={sxCenter}>{collector.name}</Typography>
                <Typography variant="subtitle1" sx={sxCenter}>{collector.email}</Typography>
                <Stack direction="row" spacing={2} sx={{justifyContent:'center'}} useFlexGap flexWrap={'wrap'}>
                    <Typography variant="subtitle1" >{collector.phone}</Typography>
                    <Typography variant="subtitle1" >{collector.cpf}</Typography>
                </Stack>
                <Typography variant="subtitle1" sx={sxCenter}>Total de Coletas: {collector.statistic?.collectionsCompleted}</Typography>
            </Container>
        </Stack>

        <Grid container spacing={2} columns={16} sx={{marginTop:'10px'}}>
            <Grid item xs={8}>
                <Typography variant="subtitle2" sx={sxStyle}>Vidro: {collector.statistic?.glassKg} Kg</Typography>
                <Typography variant="subtitle2" sx={sxStyle}>Metal: {collector.statistic?.metalKg} Kg</Typography>
                <Typography variant="subtitle2" sx={sxStyle}>Eletrônico: {collector.statistic?.eletronicKg} Kg</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="subtitle2" sx={sxStyle}>Óleo: {collector.statistic?.oilKg} Kg</Typography>
                <Typography variant="subtitle2" sx={sxStyle}>Papel: {collector.statistic?.paperKg} Kg</Typography>
                <Typography variant="subtitle2" sx={sxStyle}>Plástico: {collector.statistic?.plasticKg} Kg</Typography>
            </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}


export default function CollectorDialog({collector, open, setOpen}) {

  return (
      <SimpleDialog
        collector={collector}
        open={open}
        onClose={() => setOpen(false)}
      />
  );
}
