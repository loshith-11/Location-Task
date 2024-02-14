import {StyleSheet, Text, View} from 'react-native';
import React,{useCallback} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Map from './tabScreens/Map';
import Locations from './tabScreens/Locations';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Map'},
    {key: 'second', title: 'Location'},
  ]);
  const navigation=useNavigation();

  const FirstRoute = () => <Map />;
  const SecondRoute = () => <Locations  onLocationPress={handleLocationPress}/>;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const handleLocationPress = useCallback((coordinates) => {
    console.log('21212121',coordinates)
    setIndex(0); // Switch to the Map tab
        navigation.navigate('Home', { screen: 'Map', params: { coordinates } });
  }, []);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: 38,
        marginBottom: -1,
        marginLeft: -1,
        borderRadius: 4,
      }}
      style={{
        backgroundColor: 'white',
        elevation: 0,
        height: 38,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        marginLeft: 16,
        marginRight: 15,
        marginTop: 32,
      }}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: focused ? 'blue' : 'black',
            backgroundColor: 'transparent',
            textAlign: 'center',
            marginBottom: 9,
            marginTop: 0,
          }}>
          {route.title}
        </Text>
      )}
      tabStyle={{padding: 0, flexDirection: 'row'}}
      labelStyle={{}}
      getLabelText={({route}) => route.title}
    />
  );
// final return
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        lazy={true}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
