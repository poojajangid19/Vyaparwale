import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function SheetScreen({ route, navigation }) {
  const {
    partyName = '',
    graniteDetail = '',
    images: initialImages = [],
  } = route.params || {};

  const [rows, setRows] = useState([{ length: 0, width: 0 }]);
  const [lessChipping, setLessChipping] = useState(false);
  const [isCmToFt, setIsCmToFt] = useState(true);
  const [margin, setMargin] = useState(0);
  const [images] = useState(initialImages);
  const [graniteDetailText, setGraniteDetailText] = useState(graniteDetail);
  const [savedSheet, setSavedSheet] = useState(null);

  const addRow = () => setRows([...rows, { length: 0, width: 0 }]);
  const copyPreviousRow = () => {
    if (rows.length > 0) setRows([...rows, { ...rows[rows.length - 1] }]);
  };



const handleShareSheet = async () => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { display: flex; justify-content: space-between; }
          .images img { width: 100px; height: 100px; margin-right: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
          .footer { margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <strong>Customer Details:</strong><br/>
            ${partyName}<br/>
            Date: ${new Date().toLocaleDateString()}
          </div>
          <div>
            <strong>Granite:</strong> ${graniteDetail}
          </div>
        </div>

        <div class="images">
          ${images.map(img => `<img src="${img.uri}" />`).join('')}
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Length</th>
              <th>Width</th>
              <th>Sq.Ft</th>
            </tr>
          </thead>
          <tbody>
            ${sheetData.measurements.map((item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${item.length}</td>
                <td>${item.width}</td>
                <td>${item.sqft}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p><strong>Total Sq.Ft:</strong> ${totalSqFt} Sq.Ft</p>
          <p><strong>Less/Chipping:</strong> ${lessLength} x ${lessBreadth} x ${lessQty} = ${calculateLessArea()} Sq.Ft</p>
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
};

  const updateValue = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = Math.max(0, parseInt(value) || 0);
    setRows(newRows);
  };

  const calculateArea = (length, width) => {
    if (isCmToFt) {
      length = length / 30.48;
      width = width / 30.48;
    }
    return (length * width).toFixed(2);
  };

  const totalArea = rows.reduce((sum, row) => sum + parseFloat(calculateArea(row.length, row.width)), 0);
  const totalWithMargin = totalArea + parseFloat(margin || 0);

  // const handleSave = () => {
  //   const newSheet = {
  //     id: Date.now().toString(),
  //     partyName,
  //     graniteDetail: graniteDetailText,
  //     totalSqFt: totalWithMargin.toFixed(2),
  //     images,
  //   };
  //   navigation.navigate('AllSheets', { newSheet });
    
  // };
  const handleSave = () => {
    const newSheet = {
      id: Date.now().toString(),
      partyName,
      graniteDetail: graniteDetailText,
      totalSqFt: totalWithMargin.toFixed(2),
      images,
    };
  
    setSavedSheet(newSheet); // Store for showing options
    navigation.navigate('AllSheets', { newSheet }); // Navigate if needed
  };
  
  const handleShare = () => {
    onPress={handleShareSheet}
  };
  const handleDeleteSheet = (sheetId) => {
    // Add actual deletion logic here (remove from state/storage/backend)
    Alert.alert('Deleted', `Sheet with ID ${sheetId} has been deleted`);
    setSavedSheet(null); // Hide action buttons
  };
  
  const handleEdit = () => {
    navigation.navigate("Form", {
      partyName,
      graniteDetail: graniteDetailText,
      images,
      stone: route.params?.stone,
      phone: route.params?.phone,
      lotNumber: route.params?.lotNumber,
      truckNumber: route.params?.truckNumber,
      date: route.params?.date,
    });
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Form")}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity> */}

<TouchableOpacity
  onPress={() =>
    navigation.navigate("Form", {
      partyName,
      graniteDetail: graniteDetailText,
      images,
      editData: {
        partyName,
        graniteDetail: graniteDetailText,
        images,
      },
    })
  }
>
  <Text style={styles.backArrow}>←</Text>
</TouchableOpacity>


        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.partyName}>{partyName}</Text>
          <Text style={styles.graniteDetail}>{graniteDetailText}</Text>
        </View>

        <TouchableOpacity style={[styles.iconButton, { backgroundColor: 'green' }]} onPress={handleSave}>
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShareSheet} style={styles.iconButton}>
          <Text>🔗</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={addRow} style={styles.iconButton}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Unit Toggle */}
      <View style={styles.unitSwitch}>
        <TouchableOpacity onPress={() => setIsCmToFt(!isCmToFt)}>
          <Text style={styles.unitText}>{isCmToFt ? 'cm → ft' : 'ft → cm'}</Text>
        </TouchableOpacity>
      </View>

      {/* Less/Chipping */}
      <View style={styles.switchRow}>
        <Switch value={lessChipping} onValueChange={setLessChipping} />
        <Text style={styles.switchLabel}>Less / Chipping</Text>
      </View>

      {/* Rows */}
      <ScrollView style={{ flex: 1 }}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rowText}>{String(index + 1).padStart(2, '0')}</Text>

            {/* Length */}
            <TouchableOpacity onPress={() => updateValue(index, 'length', row.length - 1)}>
              <Text style={styles.button}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(row.length)}
              onChangeText={(text) => updateValue(index, 'length', text)}
            />
            <TouchableOpacity onPress={() => updateValue(index, 'length', row.length + 1)}>
              <Text style={styles.button}>+</Text>
            </TouchableOpacity>

            {/* Width */}
            <TouchableOpacity onPress={() => updateValue(index, 'width', row.width - 1)}>
              <Text style={styles.button}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(row.width)}
              onChangeText={(text) => updateValue(index, 'width', text)}
            />
            <TouchableOpacity onPress={() => updateValue(index, 'width', row.width + 1)}>
              <Text style={styles.button}>+</Text>
            </TouchableOpacity>

            {/* Area */}
            <Text style={styles.areaText}>= {calculateArea(row.length, row.width)} ft²</Text>

            {/* Copy Row */}
            <TouchableOpacity onPress={() => setRows([...rows, { ...row }])}>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Total Area: {totalArea.toFixed(2)} ft²</Text>
        <Text>Total + Margin: {totalWithMargin.toFixed(2)} ft²</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Margin"
          value={String(margin)}
          onChangeText={(text) => setMargin(parseFloat(text) || 0)}
        />

        <TouchableOpacity onPress={copyPreviousRow} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy previous row</Text>
        </TouchableOpacity>
      </View>
      
    </View>

    
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  backArrow: { fontSize: 24 },
  partyName: { fontSize: 16, fontWeight: 'bold' },
  graniteDetail: { fontSize: 14, color: 'gray' },
  iconButton: {
    marginLeft: 6,
    padding: 6,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  unitSwitch: { alignItems: 'center', marginVertical: 10 },
  unitText: { fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  switchLabel: { marginLeft: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: '#fafafa',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  rowText: { width: 28, fontWeight: 'bold' },
  button: { fontSize: 18, paddingHorizontal: 6 },
  input: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 4,
    padding: 2,
    marginHorizontal: 4,
  },
  areaText: { marginLeft: 10, fontWeight: 'bold', width: 80 },
  copyIcon: { marginLeft: 6, fontSize: 18 },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  copyButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    borderRadius: 6,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  copyButtonText: { fontWeight: 'bold' },
});


// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// const SheetScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const {
//     stone,
//     partyName,
//     phone,
//     graniteDetail,
//     lotNumber,
//     truckNumber,
//     date,
//     images = [],
//   } = route.params || {};

//   const handleEdit = () => {
//     navigation.navigate("Form", {
//       partyName,
//       phone,
//       graniteDetail,
//       lotNumber,
//       truckNumber,
//       date,
//       images,
//       stone,
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
//         <Text style={styles.editText}>← Edit</Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>Stone Type: {stone}</Text>
//       <Text style={styles.label}>Party Name: {partyName}</Text>
//       <Text style={styles.label}>Phone: {phone}</Text>
//       <Text style={styles.label}>Granite Detail: {graniteDetail}</Text>
//       <Text style={styles.label}>Lot Number: {lotNumber}</Text>
//       <Text style={styles.label}>Truck Number: {truckNumber}</Text>
//       <Text style={styles.label}>Date: {new Date(date).toLocaleDateString()}</Text>

//       <ScrollView horizontal>{images.map((uri, index) => <Image key={index} source={{ uri }} style={styles.image} />)}</ScrollView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   label: { fontSize: 16, marginVertical: 4 },
//   image: { width: 100, height: 100, marginRight: 10 },
//   editButton: { marginBottom: 20 },
//   editText: { fontSize: 18, color: 'blue' },
// });

// export default SheetScreen;