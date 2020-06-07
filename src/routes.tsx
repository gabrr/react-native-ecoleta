import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'



import Home from './pages/Home'
import Points from './pages/Points'

const AppStack = createStackNavigator()

const Routes = () => {


    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {backgroundColor: "#F0F0F5"}
                }} 
            > 
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})
