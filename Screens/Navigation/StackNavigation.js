import React from "react";
import { NavigationContainer  } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../Splash";
import HomeScreen from "../HomeScreen";
import DetailsScreen from "../DetailScreen";


const Stack = createNativeStackNavigator(); 

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>

      <Stack.Screen name="Splash" component={SplashScreen} />
   
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  )
}

export default App;