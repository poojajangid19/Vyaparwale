import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AllSheetsScreen({ navigation, route }) {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    if (route?.params?.newSheet) {
      const updatedSheet = route.params.newSheet;
      setSheets(prev => {
        const index = prev.findIndex(sheet => sheet.id === updatedSheet.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = updatedSheet;
          return updated;
        } else {
          return [updatedSheet, ...prev];
        }
      });
    }
  }, [route?.params?.newSheet]);

  const handleDelete = (id) => {
    setSheets(prev => prev.filter(sheet => sheet.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.sheetBox}>
      <Text style={styles.title}>{item.partyName || 'Untitled Party'}</Text>
      <Text>{item.graniteDetail}</Text>
      <Text>Total Sq.Ft: {item.totalSqFt}</Text>


      <FlatList
        data={item.images}
        horizontal
        keyExtractor={(img, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
      />

      <View style={styles.sheetActions}>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
        >
          <Text style={styles.actionButtonText}>Delete sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => navigation.navigate('SheetDetail', { sheet: item })}
          onPress={() =>
            navigation.navigate('SheetDetail', {
              id: item.id,
              partyName: item.partyName,
              graniteDetail: item.graniteDetail,
              totalSqFt: item.totalSqFt,
              images: item.images,
              lessChipping: item.lessChipping,
            })
          }
          
          
          style={[styles.actionButton, { backgroundColor: '#000' }]}
        >
          <Text style={styles.actionButtonText}>Go to sheet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabs}>
        <Text
          style={styles.tabText}
          onPress={() => navigation.navigate("Home2")}
        >
          Create sheet
        </Text>
        <Text style={[styles.tabText, styles.activeTab]}>All sheets</Text>
      </View>

      {/* Sheet List or Message */}
      {sheets.length === 0 ? (
        <View style={styles.noSheetMessageContainer}>
          <Text style={styles.noSheetMessage}>No sheet found</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('Form')}
          >
            <Text style={styles.createButtonText}>Create Sheet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sheets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: "#2d3f38",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  logo: { width: 100, height: 30, resizeMode: "contain" },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#2d3f38",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tabText: {
    color: "#aaa",
    marginRight: 20,
    fontSize: 16,
  },
  activeTab: {
    color: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f280",
  },
  noSheetMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSheetMessage: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color: '#333',
  },
  createButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sheetBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 16,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginTop: 5,
  },
  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
