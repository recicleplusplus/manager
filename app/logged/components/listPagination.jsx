import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Box from '@mui/material/Box';

export default function ListPagination({collectors, amoutPages, page, checked, handleEditCollector, handleDeleteCollector, handleActivateCollector, handlePageChange}){

    return (
        <Box sx={{minHeight:{sm:'65vh', xs:'77vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}}>
            <List sx={{ width: '100%', minWidth: '200px', bgcolor: 'background.paper', margin: '0px', padding: '0px', marginBottom: '10px'}}>
            {collectors.map((collector, index) => (
            <div key={index}>
                <ListItem alignItems="flex-start"
                    sx={{minWidth: '350px',margin: '0px', padding: '0px'}}
                    secondaryAction={
                        <IconButton 
                            edge="end" 
                            aria-label="delete" 
                            color="secondary" 
                            onClick={checked ? ()=>handleActivateCollector(collector) : ()=>handleDeleteCollector(collector)}
                        >
                            {checked ? <AddCircleOutlinedIcon /> : <DoDisturbIcon />}
                        </IconButton>
                    }
                >
                <ListItemButton onClick={() => handleEditCollector(collector)}>
                    <ListItemAvatar>
                        <Avatar alt="Imagem Coletor" src={collector.photoUrl || "/icon.svg"} sx={{backgroundColor:'secondary.dark', padding:'3px'}}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={collector.name}
                        secondary={
                        <React.Fragment>
                            <Typography
                            sx={{ display: 'inline', marginRight: '10px'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                            {collector.email}
                            </Typography>
                        {collector.phone}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>


                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
            ))}
        </List>

        <Pagination 
            count={amoutPages} 
            color="primary" 
            page={page}
            onChange={handlePageChange}
            sx={{
                marginTop: '15px',
                justifyContent: 'center',
                display: 'flex',
            }}
        />
    </Box>
);}