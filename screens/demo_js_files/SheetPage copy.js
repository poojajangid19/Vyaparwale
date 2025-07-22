import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';

export default function SheetPage({ route, navigation }) {
  const { sheetId } = route.params || {};

  // Replace with data-fetching logic from your state/store
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    // Simulate fetching sheet by ID
    const fetchSheet = async () => {
      // You should replace this with actual data fetch logic (from context, redux, storage)
      const savedSheets = []; // get from context or redux
      const found = savedSheets.find(s => s.id === sheetId);
      if (found) {
        setSheetData(found);
      } else {
        Alert.alert('Error', 'Sheet not found');
        navigation.goBack();
      }
    };

    fetchSheet();
  }, [sheetId]);

  const handleUpdate = () => {
    Alert.alert('Updated', 'Sheet updated successfully!');
    // Replace with logic to update the sheet in your state/storage/backend
    navigation.goBack();
  };

  if (!sheetData) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Sheet</Text>

      <TextInput
        style={styles.input}
        value={sheetData.partyName}
        onChangeText={(text) => setSheetData({ ...sheetData, partyName: text })}
      />

      <TextInput
        style={styles.input}
        value={sheetData.graniteDetail}
        onChangeText={(text) => setSheetData({ ...sheetData, graniteDetail: text })}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(sheetData.totalSqFt)}
        onChangeText={(text) => setSheetData({ ...sheetData, totalSqFt: parseFloat(text) || 0 })}
      />

      {/* Add more fields as needed */}

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
