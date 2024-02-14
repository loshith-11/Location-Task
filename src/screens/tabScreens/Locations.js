import { StyleSheet, Text, View,TouchableOpacity,ScrollView} from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';

const Locations = ({onLocationPress}) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Load saved locations from AsyncStorage
    const loadSavedLocations = async () => {
      try {
        const savedLocationsString = await AsyncStorage.getItem('savedLocations');
        const parsedLocations = JSON.parse(savedLocationsString) || [];
        setSavedLocations(parsedLocations);
      } catch (error) {
        console.error('Error loading saved locations:', error);
      }
    };

    loadSavedLocations();
  }, []);


 
  //FINAL RETURN
  return (
    <View>
    <ScrollView>
      <Text style={styles.header}>Saved Locations</Text>

      {savedLocations.map((location, index) => (
        <TouchableOpacity key={index} style={styles.locationItem}
        onPress={() => {
            onLocationPress(location.coordinates);
            // Optionally, you can navigate to the Map tab here as well
            // navigation.navigate('Home', { screen: 'Map' });
          }}
        >
          <Text style={styles.detailText}>Place: {location.display_name}</Text>
          <Text style={styles.detailText}>Latitude: {location.coordinates.latitude}</Text>
          <Text style={styles.detailText}>Longitude: {location.coordinates.longitude}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  )
}

export default Locations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black',
    marginLeft:15
  },
  locationItem: {
    marginBottom: 16,
    marginLeft:15
  },
  detailText:{
    color:'black'
  }
})