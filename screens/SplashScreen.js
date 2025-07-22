// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // Check Firebase auth state
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           navigation.replace('Home');
//         } else {
//           navigation.replace('Login');
//         }
//       });
//     }, 3000); // 3 seconds delay

//     return () => clearTimeout(timer); // Clear timeout on unmount
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome</Text>
//       <Text style={styles.logo}>Vyaparwale</Text>
//       <ActivityIndicator size="large" color="#C04EF9" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0D0B21',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     color: '#aaa',
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   logo: {
//     color: '#C04EF9',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 40,
//   },
// });

// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Let AppNavigator handle the actual routing
    }, 2000); // show for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.logo}>Vyaparwale</Text>
      <ActivityIndicator size="large" color="#C04EF9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B21',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 5,
  },
  logo: {
    color: '#C04EF9',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});
