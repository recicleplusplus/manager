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
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ListChoice({data, handleAcept, handleDeny}){

    return (
        <Box sx={{minHeight:{sm:'65vh', xs:'77vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}}>
            <List sx={{ width: '100%', minWidth: '200px', bgcolor: 'background.paper', margin: '0px', padding: '0px', marginBottom: '10px'}}>
            {data.map((item, index) => (
            <div key={index}>
                <ListItem alignItems="flex-start"
                    sx={{minWidth: '350px',margin: '0px', padding: '0px'}}
                    secondaryAction={
                        <>
                            <IconButton 
                                edge="end" 
                                aria-label="delete" 
                                color="secondary" 
                                sx={{marginRight:'10px'}}
                                onClick={()=>handleDeny(item.id)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton 
                                edge="end" 
                                aria-label="delete" 
                                color="secondary" 
                                onClick={()=>handleAcept(item)}
                            >
                                <CheckIcon />
                            </IconButton>
                        </>
                    }
                >
                <Box sx={{display:'flex', padding:'10px'}}>
                    <ListItemAvatar>
                        <Avatar alt="Logo" src={"/icon.svg"} sx={{backgroundColor:'secondary.dark', padding:'3px'}}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.name}
                        secondary={
                        <React.Fragment>
                            <Typography
                            sx={{ display: 'inline', marginRight: '10px'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                            {item.cpf}
                            </Typography>
                        {item.email}
                        </React.Fragment>
                        }
                    />
                </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
            ))}
        </List>
    </Box>
);}