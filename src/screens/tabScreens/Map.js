import { StyleSheet, Text, View,Modal,Button,} from 'react-native'
import React,{useState,useEffect} from 'react'
import MapView,{Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] = useState({});
  const [markerCoordinate, setMarkerCoordinate] = useState({ latitude: 10.6677032, longitude: 75.988872 });
  const route = useRoute();
 
  useEffect(() => {
    // Fetch location details from the API when component mounts or markerCoordinate changes
    fetchLocationDetails();
  }, [markerCoordinate]);

  useEffect(() => {
    // Update markerCoordinate when navigation params change
    if (route.params && route.params.coordinates) {
      setMarkerCoordinate(route.params.coordinates);
     
    }
    console.log('>>>>>>>>',route?.params?.coordinates)
  }, [route.params]);

  const fetchLocationDetails = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${markerCoordinate.latitude}&lon=${markerCoordinate.longitude}&zoom=18&addressdetails=1`);
      const data = await response.json();
      setLocationDetails(data);
      console.log("22222",data)
      console.log("33333",locationDetails)

    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };
  
  const handleMarkerPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate({ latitude: coordinate.latitude, longitude: coordinate.longitude });
    setModalVisible(true);
  };

  const handleSavePress = async () => {
    // Save location details to AsyncStorage
    try {
      const savedLocations = await AsyncStorage.getItem('savedLocations');
      const parsedLocations = JSON.parse(savedLocations) || [];
      const newLocation = { ...locationDetails, coordinates: markerCoordinate };
      const updatedLocations = [...parsedLocations, newLocation];
      await AsyncStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    } catch (error) {
      console.error('Error saving location:', error);
    }

    setModalVisible(false);
  };
  
// final return
  return (
    <View style={styles.container}>
     <MapView
        style={{ flex: 1, marginTop:20}}
        initialRegion={{
          latitude: markerCoordinate.latitude,
          longitude: markerCoordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMarkerPress}
      >
        <Marker
          coordinate={markerCoordinate}
          
        />
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{width:250,height:250}}
      >
        <View style={{justifyContent: 'center', alignItems: 'center',marginTop:165 , backgroundColor:'white'}}>
        <View style={{marginTop:15}}>
        <Text style={styles.header}>Location Details</Text>
        </View>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
           
            <Text style={styles.fontStyle}>Place: {locationDetails?.address?.county}</Text>
            <Text style={styles.fontStyle}>Latitude: {markerCoordinate.latitude}</Text>
            <Text style={styles.fontStyle}>Longitude: {markerCoordinate.longitude}</Text>
            
            <View style={{marginTop:10}}>
            <Button title="Save" onPress={handleSavePress} />
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  fontStyle:{
    color:'black'
  },
  header:{
    fontWeight:'600',
    textAlign:'center',
    color:'black',


  }
})