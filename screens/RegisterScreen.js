// // screens/RegisterScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function RegisterScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         createdAt: new Date().toISOString(),
//       });

//       Alert.alert('Success', 'Registered and saved!');
//       navigation.replace('Home');
//     } catch (error) {
//       Alert.alert('Registration Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create{"\n"}<Text style={styles.bold}>Account</Text></Text>

//       <View style={styles.inputContainer}>
//         <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
//         <TextInput
//           placeholder="Email Address"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <MaterialIcons name="lock" size={20} color="#fff" style={styles.icon} />
//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#aaa"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />
//       </View>

//       <Pressable style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>REGISTER</Text>
//       </Pressable>

//       <Text style={styles.bottomText}>
//         Already have an account?{' '}
//         <Text style={styles.bottomLink} onPress={() => navigation.navigate('Login')}>
//           Log in
//         </Text>
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0D0B21',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   bold: {
//     fontWeight: 'bold',
//     color: '#C04EF9',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1A1831',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//     marginLeft: 10,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   button: {
//     backgroundColor: '#C04EF9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   bottomText: {
//     textAlign: 'center',
//     color: '#aaa',
//   },
//   bottomLink: {
//     color: '#C04EF9',
//     fontWeight: 'bold',
//   },
// });

// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleRegister = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please enter email and password');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     Alert.alert('Weak Password', 'Password should be at least 6 characters long');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     await setDoc(doc(db, 'users', user.uid), {
  //       uid: user.uid,
  //       email: user.email,
  //       createdAt: new Date().toISOString(),
  //     });
  //     console.log('Registration Success:', {
  //       uid: user.uid,
  //       email: user.email,
  //       createdAt: timestamp,
  //     });
  //     Alert.alert('Success', 'Registered successfully!');
  //     navigation.replace('Home');
  //   } catch (error) {
  //     Alert.alert('Registration Error', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log('User registered:', user.email);
  
      // Navigate or store user info as needed
      // navigation.replace("Home");
      Alert.alert('Success', 'Registered successfully!');
    } catch (error) {
      console.log("Registration error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create{'\n'}
        <Text style={styles.bold}>Account</Text>
      </Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>REGISTER</Text>
        )}
      </Pressable>

      <Text style={styles.bottomText}>
        Already have an account?{' '}
        <Text style={styles.bottomLink} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B21',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  bold: {
    fontWeight: 'bold',
    color: '#C04EF9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1831',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  button: {
    backgroundColor: '#C04EF9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomText: {
    textAlign: 'center',
    color: '#aaa',
  },
  bottomLink: {
    color: '#C04EF9',
    fontWeight: 'bold',
  },
});
