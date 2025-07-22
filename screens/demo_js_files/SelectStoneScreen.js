import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stone = [
  { id: "1", name: "Marble", image: require("../assets/icon.png") },
  { id: "2", name: "Granite", image:  require("../assets/icon.png") },
  { id: "3", name: "Block", image: require("../assets/icon.png") },
  { id: "4", name: "Quartz", image:  require("../assets/icon.png") },
];

export default function SelectStoneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>



      </View>

      {/* Tab Bar */}
      {/* <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.activeTab]}>Create sheet</Text>
        <Text style={styles.tabText}>All sheets</Text>
      </View> */}
     <View style={styles.tabs}>
      <Text style={[styles.tabText, styles.activeTab]} onPress={() => navigation.navigate("Form")}>Create sheet</Text>
      <Text style={styles.tabText} onPress={() => navigation.navigate("AllSheets")}>All sheets</Text>
    </View>


      {/* Stone Selection */}
      <Text style={styles.sectionTitle}>Select your stone</Text>
      <FlatList
        data={stone}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.stoneItem} onPress={() => navigation.navigate("Form")}>
            <Image source={item.image} style={styles.stoneImage} />
            <Text style={styles.stoneText}>{item.name}</Text>
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    margin: 16,
  },
  grid: {
    paddingHorizontal: 16,
  },
  stoneItem: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  stoneImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  stoneText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});
