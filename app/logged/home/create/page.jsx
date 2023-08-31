'use client';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import React, { useState, useContext } from 'react';
import { RegisterCollector } from '../../../../services/collector';
import { UserContext } from '../../../../contexts/userContext';
import { useRouter } from 'next/navigation';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Creat() {

    const { user } = useContext(UserContext);

    const route = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    function handleCpfChange(event) {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, '');
    
        if(value.length <= 11){
          const maskedValue = numericValue.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
          );
          setCpf(maskedValue);
        }
     }
    function handlePhoneChange(event) {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, '');

        if(value.length <= 11){
            const maskedValue = numericValue.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                '($1) $2-$3'
            );
            setPhone(maskedValue);
        }
    }
    const handleError = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setError(false);
    };
    
    const handleSuccess = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setSuccess(false);
    };

    function handleRegister(event) {
        event.preventDefault();
        setLoading(true);
        const data = {
            name: name,
            email: email,
            cpf: cpf,
            phone: phone,
        }
        RegisterCollector(data, user, (code, message) => {
            if(code === 200){
                setSuccess({
                    code: code, 
                    message: message
                });
                route.back();
            }else{
               setError({
                    code: code,
                    message: message
                });
            }
            setLoading(false);
        })
    }

    return (
        <>
            <Typography variant="h5" component="div" gutterBottom>Cadastrar Coletor</Typography>
            <form onSubmit={handleRegister}>
                <Stack spacing={2} direction='row' useFlexGap flexWrap="wrap" sx={{justifyContent:'center', marginTop:'30px'}}>
                    <TextField
                        label="Nome Completo"
                        placeholder='exemplo@exemplo.com'
                        disabled={loading}
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        sx={{
                            color: 'primary.main',
                            width: {sm: '80%', xs: '90%'},
                            marginBottom: '25px',
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <DriveFileRenameOutlineIcon color='secondary'/>
                            </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />

                    <TextField
                        label="Email"
                        placeholder='exemplo@exemplo.com'
                        disabled={loading}
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        sx={{
                            color: 'primary.main',
                            width: {sm: '80%', xs: '90%'},
                            marginBottom: '25px',
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlinedIcon color='secondary'/>
                            </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />

                    <TextField
                        label="CPF*"
                        value={cpf}
                        placeholder='999.999.999-99'
                        onChange={handleCpfChange}
                        type='text'
                        disabled={loading}
                        sx={{
                            color: 'primary.main',
                            width: {sm: '40%', xs: '90%'},
                            marginBottom: '25px',
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <ContactEmergencyOutlinedIcon color='secondary'/>
                            </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        label="Telefone*"
                        value={phone}
                        placeholder='(99) 99999-9999'
                        onChange={handlePhoneChange}
                        type='text'
                        disabled={loading}
                        sx={{
                            color: 'primary.main',
                            width: {sm: '40%', xs: '90%'},
                            marginBottom: '25px',
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <PhoneAndroidIcon color='secondary'/>
                            </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />

                    <LoadingButton
                        size="large"
                        type='submit'
                        loading={loading}
                        variant="text"
                        sx={{
                            marginTop: '20px',
                            marginBottom: '20px',
                            width: {sm: '70%', xs: '90%'},
                        }}
                        >
                        <span>Registrar</span>
                    </LoadingButton>
                </Stack>
            </form>

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