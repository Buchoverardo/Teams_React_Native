import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';
// essa linha serve pra ser o servidor das config do tema do app

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
// usando fonte externa, lembrando de importar ela no terminal

import { Loading } from '@components/Loading';

import theme from './src/theme';
// importo o tema que sera usado

import { Routes } from './src/routes';

export default function App() {
//carregando assincrino da fonte
  const [fontsLoaded] =  useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    // envolvo o app com o tema que fiz para que ele siga as config do arquivo.
    // nessa linha abaixo eu faco uma condicional mostrando se a fonte foi carregada ou mostro o activindicator
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      { fontsLoaded ? < Routes /> : <Loading /> }
    </ThemeProvider>
  );
}
