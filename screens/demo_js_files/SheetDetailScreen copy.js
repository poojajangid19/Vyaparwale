import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';


export default function SheetDetailScreen({ route, navigation }) {
  // const { partyName, graniteDetail, totalSqFt, images: initialImages } = route.params;
  // const { id = Date.now().toString(), partyName, graniteDetail, totalSqFt, images: initialImages } = route.params;
  
const {
  id ,
  partyName,
  graniteDetail,
  totalSqFt,
  images: initialImages,
  lessChipping = {}
} = route.params;

const getSavedSheets = async () => {
  try {
    const sheetsJson = await AsyncStorage.getItem('sheets');
    return sheetsJson ? JSON.parse(sheetsJson) : [];
  } catch (error) {
    console.error('Failed to load sheets from storage:', error);
    return [];
  }
};

const handleSharePDF = async () => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          img { width: 100px; height: auto; margin: 5px; }
          .footer { font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h3>Customer Details: ${partyName}</h3>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <h4>Granite: ${graniteDetailText}</h4>
        <div>
          ${images.map(img => `<img src="${img.uri}" />`).join('')}
        </div>
        <table>
          <tr><th>S.No</th><th>Length</th><th>Width</th><th>Sq.Ft</th></tr>
          ${
            sheetData?.measurements?.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.length}</td>
                <td>${item.width}</td>
                <td>${item.sqft}</td>
              </tr>
            `).join('') || '<tr><td colspan="4">No data</td></tr>'
          }
        </table>
        <h4>Total Sq.Ft: ${totalSqFt} ft²</h4>
        <div class="footer">
          <p>Less/Chipping Area: ${calculateLessArea()} ft²</p>
          <p>Download the app: https://play.google.com/store/apps/details?id=com.patthar.granitemar</p>
        </div>
      </body>
    </html>
  `;

  try {
    const options = {
      html: htmlContent,
      fileName: `Granite_Sheet_${partyName.replace(/\s+/g, '_')}_${Date.now()}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);

    await Share.open({
      url: `file://${file.filePath}`,
      type: 'application/pdf',
      title: 'Share Granite Sheet',
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    Alert.alert('Error', 'Unable to generate PDF. Please try again.');
  }
};

const route = useRoute();
  const { sheetId } = route.params;

  const [sheetData, setSheetData] = useState(null);


  useEffect(() => {
    // Replace this with your logic to fetch or retrieve the sheet data using sheetId
    const fetchSheetData = async () => {
      // Example: from local state, DB, or API
      const savedSheets = await getSavedSheets(); // your own logic
      const matchedSheet = savedSheets.find(sheet => sheet.id === sheetId);
      if (matchedSheet) {
        setSheetData(matchedSheet);
      }
    };

    fetchSheetData();
  }, [sheetId]);

  if (!sheetData) {
    return <Text>Loading sheet...</Text>;
  }
  const parsedImages = (initialImages || []).map((img, index) => ({
    ...img,
    id: img.id || index.toString(),
  }));

  const [lessLength, setLessLength] = useState(lessChipping.length || '0');
  const [lessBreadth, setLessBreadth] = useState(lessChipping.breadth || '0');
  const [lessQty, setLessQty] = useState(lessChipping.quantity || '0');
  
  const calculateLessArea = () => {
    const len = parseFloat(lessLength) || 0;
    const brd = parseFloat(lessBreadth) || 0;
    const qty = parseFloat(lessQty) || 0;
    return ((len * brd * qty) / 144).toFixed(2); // converting to ft²
  };
  const [graniteDetailText, setGraniteDetailText] = useState(graniteDetail);
  const [images, setImages] = useState(parsedImages);

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImg = {
        uri: result.assets[0].uri,
        id: Date.now().toString(),
      };
      setImages([...images, newImg]);
    }
  };

  const handleSaveAndGoBack = () => {
    navigation.navigate('AllSheets', {
      newSheet: {
        id,
        partyName,
        graniteDetail: graniteDetailText,
        totalSqFt,
        images,
        lessChipping: {
          length: lessLength,
          breadth: lessBreadth,
          quantity: lessQty,
          area: calculateLessArea()
        }
      },
    });
    
    // navigation.navigate('AllSheets', {
    //   newSheet: {
    //     id,
    //     partyName,
    //     graniteDetail: graniteDetailText,
    //     totalSqFt,
    //     images,
    //   },
    // });
    
    // navigation.navigate('SheetDetail', {
    //   partyName,
    //   graniteDetail: graniteDetailText,
    //   totalSqFt,
    //   images,
    // });
  };

  return (
    
    <View style={styles.container}>
      <View>
      <Text>Less / Chipping</Text>
      <TextInput value={sheetData.lessLength.toString()} editable={false} />
      <TextInput value={sheetData.lessBreadth.toString()} editable={false} />
      <Text>= {sheetData.area} ft²</Text>

      <Text>Total Area: {sheetData.totalArea} ft²</Text>
      <Text>Total + Margin: {sheetData.totalWithMargin} ft²</Text>
    </View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Form")}> 
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.partyName}>{partyName}</Text>
          <Text style={styles.timestamp}>Last modified today: 01:13 pm</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.card}>
        <Text style={styles.label}>Granite details/colour</Text>
        <TextInput
          value={graniteDetailText}
          onChangeText={setGraniteDetailText}
          style={styles.input}
        />

        <ScrollView horizontal style={styles.imageRow}>
          {images.map(img => (
            <View key={img.id} style={styles.imageBox}>
              <Image source={{ uri: img.uri }} style={styles.image} />
              <TouchableOpacity
                onPress={() => handleRemoveImage(img.id)}
                style={styles.removeBtn}>
                <Text style={{ color: 'white' }}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addImage} onPress={handleAddImage}>
            <Text>Add</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.label}>Less / Chipping</Text>
<View style={styles.row}>
  <TextInput
    value={lessLength}
    onChangeText={setLessLength}
    keyboardType="numeric"
    style={styles.smallInput}
    placeholder="Length"
  />
  <TextInput
    value={lessBreadth}
    onChangeText={setLessBreadth}
    keyboardType="numeric"
    style={styles.smallInput}
    placeholder="Breadth"
  />
  <TextInput
    value={lessQty}
    onChangeText={setLessQty}
    keyboardType="numeric"
    style={styles.smallInput}
    placeholder="Qty"
  />
</View>
<Text style={{ marginBottom: 10 }}>= {calculateLessArea()} ft²</Text>

        <Text style={styles.total}>Total Sq.Ft – {totalSqFt}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.deleteSheet}>
            <Text style={{ color: 'red' }}>Delete sheet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gotoSheet}
            onPress={handleSaveAndGoBack}
          >
            <Text style={{ color: 'white' }}>Go to sheet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerNote}>You can add more products in the same sheet</Text>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.bottomBtn}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: 'black' }]}>
            <Text style={{ color: 'white' }}>Add more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  back: { fontSize: 24, marginRight: 10 },
  partyName: { fontSize: 20, fontWeight: 'bold' },
  timestamp: { color: '#888' },
  shareBtn: { padding: 8, backgroundColor: '#eee', borderRadius: 6 },
  card: { padding: 20, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 20 },
  label: { marginBottom: 5, fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  imageRow: { flexDirection: 'row', marginVertical: 10 },
  imageBox: { position: 'relative', marginRight: 10 },
  image: { width: 60, height: 60, borderRadius: 8 },
  removeBtn: { position: 'absolute', top: -8, right: -8, backgroundColor: 'red', borderRadius: 12, paddingHorizontal: 4 },
  addImage: { width: 60, height: 60, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  total: { marginTop: 10, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  deleteSheet: {},
  gotoSheet: { backgroundColor: '#000', padding: 10, borderRadius: 8 },
  footer: { marginTop: 'auto' },
  footerNote: { textAlign: 'center', marginBottom: 10 },
  bottomButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  bottomBtn: { padding: 10, borderRadius: 8, backgroundColor: '#eee', flex: 1, alignItems: 'center', marginHorizontal: 5 },
});