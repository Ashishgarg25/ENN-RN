import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from '../Screens/login';
import Home from '../Screens/Home';
import Addvisitnote from '../Screens/Addvisitnote';
import Basic from '../Screens/Basic'
import Assessment from '../Screens/Assessment'
import Note from '../Screens/Note'
import signup from '../Screens/signup';
import AssessmentPage from '../Screens/AssessmentPage';
import Signoff from '../Screens/Signoff';
import Profile from '../Screens/Profile';

const Stack = createStackNavigator();


const MyNavigator = () => {
    return( 
        <NavigationContainer>
            <Stack.Navigator initialRouteName="signoff">
            <Stack.Screen name="signoff" component={Signoff} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
            <Stack.Screen name='signup' component={signup} options= {{headerShown: false}} />  
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='Addvisitnote' component={Addvisitnote} options ={{ headerShown: false }} />
            <Stack.Screen name='Basic' component={Basic} options= {{headerShown: false}} />
            <Stack.Screen name='Assessment' component={Assessment} options= {{headerShown: false}} />
            <Stack.Screen name='Note' component={Note} options= {{headerShown: false}} />
            <Stack.Screen name="AssessmentPage" component={AssessmentPage} options= {{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )    
}

export default MyNavigator;