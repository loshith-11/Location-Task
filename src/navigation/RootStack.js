import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Map from "../screens/tabScreens/Map";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const RootStack =()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                  <Stack.Screen name="Map" component={Map}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
export default RootStack;


