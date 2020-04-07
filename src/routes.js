import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';
import User from './pages/user';
import Repository from './pages/repository';

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User,
        Repository,
    },{
        headerLayoutPreset :'center',
        defaultNavigationOptions :{
            headerStyle :{
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF'
        }
    })
)


export default Routes;
