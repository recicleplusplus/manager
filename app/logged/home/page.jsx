'use client';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListPagination from '../components/listPagination';
import CollectorDialog from '../components/collectorDialog';
import ConfirmDialog from '../components/confirmDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import React, { useEffect, useState } from 'react';
import { AssignCollector, DesactivateCollector, ActivateCollector } from '../../../services/collector';
import { useRouter } from 'next/navigation';
import { set } from 'firebase/database';

export default function Home() {
    
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [maxPerPage, setMaxPerPage] = useState(5);
    const [amoutPages, setAmoutPages] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [message, setMessage] = useState({confirm: ()=>{}, title: '', text: ''});
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [text, setText] = useState('');
    const [current, setCurrent] = useState({});
    const [collectors, setCollectors] = useState([]);
    const [collectorsFilter, setCollectorsFilter] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < window.innerHeight){
                setMaxPerPage(8);
            }else{
                setMaxPerPage(5);
            }
        }
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        const filteredArray = collectors.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
        setAmoutPages(Math.ceil(filteredArray.length / maxPerPage));
        const startIndex = (page - 1) * maxPerPage;
        const endIndex = startIndex + maxPerPage;
        const paginatedArray = filteredArray.slice(startIndex, endIndex);
        setCollectorsFilter(paginatedArray);
    },[page, maxPerPage, text, collectors]);
    

    useEffect(() => {
        const unsubscribe = AssignCollector(!checked, (data)=>{
            setCollectors(data);
        });

        return unsubscribe;
    }, [checked]);

    const handleError = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setError(false);
    };
    const handleSuccess = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setSuccess(false);
    };

    function handleEditCollector(collector){
        setCurrent(collector);
        setOpenDialog(true);
    }
    function handleDeleteCollector(collector){
        setMessage({
            title: 'Desativar Coletor',
            text: 'Tem certeza que deseja desativar o coletor? Após realizar essa operação o coletor ficará inativo e não conseguirá mais utilizar o sistema como seu associado.',
            confirm: () => {
                DesactivateCollector(collector.id, (code, message)=>{
                    if(code === 200){
                        setSuccess({code, message});
                    }else{
                        setError({code, message});
                    }
                });
            }
        });
        setConfirmDialog(true);
    }
    function handleActivateCollector(collector){
        setMessage({
            title: 'Ativar Coletor',
            text: 'Tem certeza que deseja ativar o coletor? Após realizar essa operação o coletor poderá utilizar o sistema normalmente como seu associado.',
            confirm: () => {
                ActivateCollector(collector.id, (code, message)=>{
                    if(code === 200){
                        setSuccess({code, message});
                    }else{
                        setError({code, message});
                    }
                });
            }
        });
        setConfirmDialog(true);
    }
    function handlePageChange(event, value){
        setPage(value);
    }

    return (
        <>
            <Stack>
                <Typography variant="h5" component="div" gutterBottom>Coletores</Typography>
                <Paper
                    component="form"
                    sx={{ p: '1px 4px', margin: '10px 0px 10px 20px', display: 'flex', alignItems: 'center', minWidth: 300, flexGrow: {xs: 1, sm: 0.8, md: 0.8}}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Buscar Coletor"
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Checkbox color="primary" checked={checked} onChange={() => setChecked(last => !last)}/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => router.push('/logged/home/create')}>
                        <AddCircleIcon />
                    </IconButton>
                </Paper>
            </Stack>

            <ListPagination 
                collectors={collectorsFilter}
                amoutPages={amoutPages}
                page={page}
                checked={checked}
                handleEditCollector={handleEditCollector}
                handleDeleteCollector={handleDeleteCollector}
                handlePageChange={handlePageChange}
                handleActivateCollector={handleActivateCollector}
            />

            <ConfirmDialog 
                setOpen={setConfirmDialog}
                open={confirmDialog}
                onConfirm={message.confirm}
                title={message.title}
                text={message.text}
            />

            <CollectorDialog 
                collector={current}
                open={openDialog}
                setOpen={setOpenDialog}
            />


            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleError}>
                <Alert onClose={handleError} severity="error" sx={{ width: '100%' }}>
                    Code: {error.code} - {error.message}
                </Alert>
            </Snackbar>

            <Snackbar open={!!success} autoHideDuration={6000} onClose={handleSuccess}>
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%' }}>
                    {success.code} - {success.message}
                </Alert>
            </Snackbar>
        </>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
