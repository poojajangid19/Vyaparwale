// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// const stones = [
//   { name: 'Marble', image: require('../assets/icon.png') },
//   { name: 'Granite', image: require('../assets/icon.png') },
//   { name: 'Block', image: require('../assets/icon.png') },
//   { name: 'Quartz', image: require('../assets/icon.png') },
// ];

// export default function CreateSheetScreen({ navigation }) {
//   const handlePress = (category) => {
//     navigation.navigate('PartyDetails', { category });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>VyaparWale</Text>
//         <TouchableOpacity>
//           <Image source={require('../assets/icon.png')} style={styles.settingsIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <Text style={[styles.tab, styles.activeTab]}>Create sheet</Text>

//         <TouchableOpacity onPress={() => navigation.navigate('AllSheetsScreen')}>
//             <Text style={styles.tab}>All sheets</Text>
//         </TouchableOpacity>
//         </View>

//       {/* Title */}
//       <Text style={styles.heading}>Select your stone</Text>

//       {/* Grid */}
//       <View style={styles.grid}>
//         {stones.map((stone, index) => (
//           <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(stone.name)}>
//             <Image source={stone.image} style={styles.image} />
//             <Text style={styles.label}>{stone.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   logo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//   },

//   settingsIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#c6ff00', // neon yellow gear icon
//   },

//   tabs: {
//     flexDirection: 'row',
//     marginTop: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },

//   tab: {
//     marginRight: 20,
//     paddingBottom: 8,
//     fontSize: 16,
//     color: 'gray',
//   },

//   activeTab: {
//     color: 'black',
//     borderBottomWidth: 2,
//     borderBottomColor: '#c6ff00', // highlight
//     fontWeight: 'bold',
//   },

//   heading: { fontSize: 20, fontWeight: '600', marginVertical: 20 },

//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   card: {
//     width: '48%',
//     marginBottom: 20,
//     alignItems: 'center',
//   },

//   image: {
//     width: '100%',
//     height: 120,
//     borderRadius: 10,
//     resizeMode: 'cover',
//   },

//   label: {
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

import HeaderTabs from '../screens/HeaderTabs';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const stones = [
  { name: 'Granite', image: require('../assets/icon.png') },
  { name: 'Marble', image: require('../assets/icon.png') },
  { name: 'Block', image: require('../assets/icon.png') },
];

export default function CreateSheetScreen({ navigation }) {
  const handlePress = (category) => {
    navigation.navigate('PartyDetails', { category });
  };

  return (
    <View style={styles.container}>
      <HeaderTabs />
      <Text style={styles.heading}>Select your stone</Text>

      <View style={styles.grid}>
        {stones.map((stone, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(stone.name)}>
            <Image source={stone.image} style={styles.image} />
            <Text style={styles.label}>{stone.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 25,
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
