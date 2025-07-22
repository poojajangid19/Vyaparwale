import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SheetScreen = ({ route }) => {
  const { partyName } = route.params;
  const [rows, setRows] = useState(Array(10).fill({ length: '', width: '', area: '0.00' }));
  const [margin, setMargin] = useState('');
  const navigation = useNavigation();

  const updateRow = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;

    const l = parseFloat(updatedRows[index].length) || 0;
    const w = parseFloat(updatedRows[index].width) || 0;
    updatedRows[index].area = ((l * w) / 144).toFixed(2);

    setRows(updatedRows);
  };

  const copyRow = (index) => {
    if (index === 0) return;
    const updated = [...rows];
    updated[index] = { ...rows[index - 1] };
    setRows(updated);
  };

  const totalArea = rows.reduce((acc, row) => acc + parseFloat(row.area || 0), 0).toFixed(2);

  const handleSave = async () => {
    try {
      const docRef = await firestore().collection('sheets').add({
        name: partyName,
        graniteName: 'Pink Naya Stock',
        items: rows.filter(r => r.area !== '0.00'),
        margin: parseFloat(margin) || 0,
        total: parseFloat(totalArea),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  
      navigation.navigate('SheetDetailScreen', {
        sheetId: docRef.id,
        partyName,
        graniteDetail: 'Pink Naya Stock',
        totalSqFt: totalArea,
        images: [],
        lessChipping: {},
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save data.");
    }
  };
  


  const renderRow = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.index}>{(index + 1).toString().padStart(2, '0')}</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="L"
        style={styles.input}
        value={item.length}
        onChangeText={(val) => updateRow(index, 'length', val)}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="W"
        style={styles.input}
        value={item.width}
        onChangeText={(val) => updateRow(index, 'width', val)}
      />
      <Text style={styles.area}>= {item.area}</Text>
      <TouchableOpacity onPress={() => copyRow(index)}>
        <Text style={styles.copy}>📋</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.partyName}>{partyName}</Text>
        <Text style={styles.granite}>Pink Naya Stock</Text>
      </View>

      <FlatList data={rows} renderItem={renderRow} keyExtractor={(_, i) => i.toString()} />

      <View style={styles.footer}>
        <Text>Margin: </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0"
          value={margin}
          onChangeText={setMargin}
          style={styles.marginInput}
        />
        <Text>Total SqFt: {totalArea}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save & Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SheetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  header: { marginBottom: 10 },
  partyName: { fontSize: 20, fontWeight: 'bold' },
  granite: { fontSize: 14, color: 'gray' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  index: { width: 30 },
  input: {
    borderBottomWidth: 1, borderColor: '#ccc',
    width: 60, marginHorizontal: 5, textAlign: 'center'
  },
  area: { width: 70 },
  copy: { fontSize: 18, paddingLeft: 10 },
  footer: {
    marginTop: 10, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between'
  },
  marginInput: {
    borderBottomWidth: 1, width: 60, marginHorizontal: 5, textAlign: 'center'
  },
  buttons: {
    marginTop: 15,
    alignItems: 'center'
  },
  saveBtn: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 6
  },
  saveText: { color: '#fff', fontWeight: 'bold' }
});
