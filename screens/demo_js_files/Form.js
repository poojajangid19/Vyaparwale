// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

// export default function Form({ route, navigation }) {
//   const { stone = "Unknown Stone" } = route?.params || {};

//   const [partyName, setPartyName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [graniteDetail, setgraniteDetail] = useState("");
//   const [lotNumber, setLotNumber] = useState("");
//   const [truckNumber, setTruckNumber] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [images, setImages] = useState([]);
//   const [hasNameError, setHasNameError] = useState(false);

//   const pickImages = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       quality: 1,
//       selectionLimit: 4,
//     });

//     if (!result.canceled) {
//       setImages(result.assets.slice(0, 4)); // Limit to 4
//     }
//   };

//   const onSubmit = () => {
//     if (!partyName.trim()) {
//       setHasNameError(true);
//       Alert.alert("Validation Error", "Please enter the Party Name.");
//       return;
//     }

//     setHasNameError(false); // Clear error on valid input

//     navigation.navigate("Sheets", {
//       partyName,
//       stone,
//       phone,
//       graniteDetail,
//       lotNumber,
//       truckNumber,
//       date: date.toISOString(),
//       images,
//     });

//     // Reset form fields
//     setPartyName("");
//     setPhone("");
//     setgraniteDetail("");
//     setLotNumber("");
//     setTruckNumber("");
//     setDate(new Date());
//     setImages([]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button and Title in One Row */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate("Home2")}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>New Party Details</Text>
//       </View>

//       {/* Form Fields */}
//       <Text style={styles.label}>Party Name</Text>
//       <TextInput
//         placeholder="Enter Party Name"
//         style={[styles.input, hasNameError && styles.inputError]}
//         value={partyName}
//         onChangeText={(text) => {
//           setPartyName(text);
//           if (text.trim()) setHasNameError(false);
//         }}
//       />

//       <Text style={styles.label}>Phone (optional)</Text>
//       <TextInput
//         placeholder="Enter Phone Number"
//         style={styles.input}
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <Text style={styles.label}>Granite Detail (optional)</Text>
//       <TextInput
//         placeholder="Enter Granite Detail"
//         style={styles.input}
//         value={graniteDetail}
//         onChangeText={setgraniteDetail}
//       />

//       <Text style={styles.label}>Lot Number (optional)</Text>
//       <TextInput
//         placeholder="Enter Lot Number"
//         style={styles.input}
//         value={lotNumber}
//         onChangeText={setLotNumber}
//       />

//       <Text style={styles.label}>Truck Number (optional)</Text>
//       <TextInput
//         placeholder="Enter Truck Number"
//         style={styles.input}
//         value={truckNumber}
//         onChangeText={setTruckNumber}
//       />

//       {/* Modal for Date Picker */}
//       {showPicker && (
//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={showPicker}
//           onRequestClose={() => setShowPicker(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.datePickerContainer}>
//               <DateTimePicker
//                 value={date}
//                 mode="date"
//                 display="default"
//                 onChange={(event, selectedDate) => {
//                   setShowPicker(false);
//                   if (selectedDate) setDate(selectedDate);
//                 }}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPicker(false)}
//                 style={styles.closeButton}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}

//       {/* Image Picker */}
//       <Button title="Upload Images (Max 4)" onPress={pickImages} />
//       <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
//         {images.map((img, index) => (
//           <Image
//             key={index}
//             source={{ uri: img.uri }}
//             style={{ width: 60, height: 60, margin: 4 }}
//           />
//         ))}
//       </View>

//       {/* Submit Button */}
//       <Button title="Submit" onPress={onSubmit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backArrow: {
//     fontSize: 24,
//     color: "black",
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginVertical: 5,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   inputError: {
//     borderColor: "red",
//   },
//   dateInput: {
//     fontSize: 16,
//     padding: 10,
//     backgroundColor: "#eee",
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   datePickerContainer: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//   },
//   closeButton: {
//     marginTop: 10,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#007BFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Form({ route, navigation }) {
  const { stone = "Unknown Stone", editData = null } = route.params || {};

  const [partyName, setPartyName] = useState(editData?.partyName || "");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [graniteDetail, setgraniteDetail] = useState(editData?.graniteDetail || "");
  const [lotNumber, setLotNumber] = useState(editData?.lotNumber || "");
  const [truckNumber, setTruckNumber] = useState(editData?.truckNumber || "");
  const [date, setDate] = useState(editData?.date ? new Date(editData.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState(editData?.images || []);
  const [hasNameError, setHasNameError] = useState(false);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 4,
    });

    if (!result.canceled) {
      setImages(result.assets.slice(0, 4));
    }
  };

  const onSubmit = () => {
    if (!partyName.trim()) {
      setHasNameError(true);
      Alert.alert("Validation Error", "Please enter the Party Name.");
      return;
    }

    setHasNameError(false);

    navigation.navigate("Sheets", {
      partyName,
      stone,
      phone,
      graniteDetail,
      lotNumber,
      truckNumber,
      date: date.toISOString(),
      images,
      isEdit: !!editData,
    });

    // You can optionally reset the form if not editing
    if (!editData) {
      setPartyName("");
      setPhone("");
      setgraniteDetail("");
      setLotNumber("");
      setTruckNumber("");
      setDate(new Date());
      setImages([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{editData ? "Edit Party Details" : "New Party Details"}</Text>
      </View>

      {/* Form */}
      <Text style={styles.label}>Party Name</Text>
      <TextInput
        placeholder="Enter Party Name"
        style={[styles.input, hasNameError && styles.inputError]}
        value={partyName}
        onChangeText={(text) => {
          setPartyName(text);
          if (text.trim()) setHasNameError(false);
        }}
      />

      <Text style={styles.label}>Phone (optional)</Text>
      <TextInput
        placeholder="Enter Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Granite Detail (optional)</Text>
      <TextInput
        placeholder="Enter Granite Detail"
        style={styles.input}
        value={graniteDetail}
        onChangeText={setgraniteDetail}
      />

      <Text style={styles.label}>Lot Number (optional)</Text>
      <TextInput
        placeholder="Enter Lot Number"
        style={styles.input}
        value={lotNumber}
        onChangeText={setLotNumber}
      />

      <Text style={styles.label}>Truck Number (optional)</Text>
      <TextInput
        placeholder="Enter Truck Number"
        style={styles.input}
        value={truckNumber}
        onChangeText={setTruckNumber}
      />

      {/* Date Picker */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dateInput}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <Modal transparent={true} animationType="fade" visible={showPicker}>
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Image Picker */}
      <Button title="Upload Images (Max 4)" onPress={pickImages} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.uri }}
            style={{ width: 60, height: 60, margin: 4 }}
          />
        ))}
      </View>

      <Button title={editData ? "Update" : "Submit"} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: "black",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  inputError: {
    borderColor: "red",
  },
  dateInput: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
