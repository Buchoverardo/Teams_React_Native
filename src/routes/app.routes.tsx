import { createNativeStackNavigator } from '@react-navigation/native-stack';
// acima eu importo a navegacao

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

// acima eu importo as screens

const { Navigator, Screen } = createNativeStackNavigator();
// acima eu pego a funcao de navegar e as screens

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen 
                name='groups'
                component={Groups}
            />

            <Screen 
                name='new'
                component={NewGroup}
            />

            <Screen 
                name='players'
                component={Players}
            />
        </Navigator>
    );
}