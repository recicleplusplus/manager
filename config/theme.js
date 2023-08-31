'use client';
import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        primary: {
            main: "#185922",
            light: '#308C50',
            dark: '#102611'
        },
        secondary: {
            main: '#044D29',
            light: '#168039',
            dark: '#00261C',
            opaque: '#335444'
        },
        background: {
            main: '#e9f2eb',
            light: '#FFFFFF',
            dark: '#BAD9C2'
        },
    },

    components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              marginBottom: '-25px',  
              position: 'relative',
              fontSize: '25px', // Defina o tamanho de fonte desejado
              color: '#00261C', // Defina a cor desejada
            },
          },
          defaultProps: {
            shrink: true, // Defina a propriedade shrink como false
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              color: '#044D29', // Defina a cor do texto digitado
            },
          },
        },

        MuiButton: {
          styleOverrides: {
            root: {
              color: '#F2E3D5', // Defina a cor do texto digitado
              backgroundColor: '#044D29', // Defina a cor do texto digitado
              borderRadius: '10px', // Defina o raio da borda
              '&:hover': {
                backgroundColor: '#168039', // Defina a cor de hover desejada
              },
            },
          },
        },

        MuiTypography: {
          styleOverrides: {
            root: {
              color: '#185922', // Defina a cor do texto digitado
            },
          },
        },

      },
});