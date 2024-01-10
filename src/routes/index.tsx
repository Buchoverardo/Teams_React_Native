import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';


export function Routes() {
    // aqui eu uso o hook useThme pra usar a cor no background
    const { COLORS } = useTheme();

    return ( // essa view serva pra deixar o fundo da mudança de tela da mesma do do app
        <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>

            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>

        </View>
    );
}