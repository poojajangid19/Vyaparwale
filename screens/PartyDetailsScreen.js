import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
export default function PartyDetails({ navigation, route }) {
    // const navigation = useNavigation();
 const category = route?.params?.category ?? 'Granite';
  
   
  const [partyName, setPartyName] = useState('');
  const [partyPhone, setPartyPhone] = useState('');
  const [graniteColor, setGraniteColor] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [setDate, setSetDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [partyImage, setPartyImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Please grant gallery access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.cancelled) {
      setPartyImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (!partyName) {
      Alert.alert('Missing info', 'Please enter the party name.');
      return;
    }

    navigation.navigate('SheetScreen', {
      category,
      partyName,
      partyPhone,
      graniteColor,
      lotNumber,
      truckNumber,
      setDate,
      partyImage,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateSheetScreen', { category })}>
  <Ionicons name="arrow-back" size={24} color="#fff" />
</TouchableOpacity>
        <Text style={styles.headerTitle}>New party details</Text>
      </View>

      {/* Form */}
      <TextInput style={styles.input} placeholder="Party name*" value={partyName} onChangeText={setPartyName} />
      <TextInput style={styles.input} placeholder="Phone number (Optional)" keyboardType="phone-pad" value={partyPhone} onChangeText={setPartyPhone} />
      <TextInput style={styles.input} placeholder="Granite details/colour (Optional)" value={graniteColor} onChangeText={setGraniteColor} />
      <TextInput style={styles.input} placeholder="Lot number (Optional)" value={lotNumber} onChangeText={setLotNumber} />
      <TextInput style={styles.input} placeholder="Truck number (Optional)" value={truckNumber} onChangeText={setTruckNumber} />

      {/* Set Date */}
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
        <Text>{setDate.toLocaleDateString()}</Text>
        <Ionicons name="calendar-outline" size={20} color="#6A0DAD" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={setDate}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setSetDate(selectedDate);
          }}
        />
      )}

      {/* Image Upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {partyImage ? (
          <Image source={{ uri: partyImage }} style={styles.image} />
        ) : (
          <Ionicons name="camera-outline" size={30} color="#888" />
        )}
      </TouchableOpacity>

      {/* Save and Continue */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  imagePicker: {
    height: 140,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
