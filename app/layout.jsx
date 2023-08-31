import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../config/theme';
import CssBaseline from '@mui/material/CssBaseline';
import UserProvider from '../contexts/userContext';

import './globals.css';

export const metadata = {
  title: 'Recicle++',
  description: 'Versão administrador do Recicle++',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <ThemeProvider theme={Theme}>
          <UserProvider>
            {children}
          </UserProvider>          
        </ThemeProvider>
      </body>
    </html>
  )
}
