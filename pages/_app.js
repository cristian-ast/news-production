import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import EditarNoticiaProvider from '../context/EditarNoticiaContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <EditarNoticiaProvider>
        <Component {...pageProps} />
      </EditarNoticiaProvider>
    </AuthProvider>
  )
}

export default MyApp;
