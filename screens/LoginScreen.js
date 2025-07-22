// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
// import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
// import { auth, db, webClientId } from '../firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as AuthSession from 'expo-auth-session';
// import { MaterialIcons } from '@expo/vector-icons';

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const redirectUri = AuthSession.makeRedirectUri({
//     native: 'com.authapp:/oauth2redirect/google',
//   });

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: '663467097294-khi5eifu5dgt2usubq8sv1vqbqan7r5.apps.googleusercontent.com',
//     scopes: ['profile', 'email'],
//     redirectUri,
    
//   });

//   console.log('AuthSession Redirect URI:', redirectUri);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.authentication;
//       const credential = GoogleAuthProvider.credential(id_token);

//       signInWithCredential(auth, credential)
//         .then(async (userCredential) => {
//           const user = userCredential.user;
//           console.log('Google Sign-In Success:', user.email);
//           await setDoc(doc(db, 'users', user.uid), {
//             uid: user.uid,
//             email: user.email,
//             provider: 'google',
//             createdAt: new Date().toISOString(),
//           });
//           navigation.replace('Home');
//         })
//         .catch((err) => {
//           console.error('Google Sign-In Error:', err);
//           Alert.alert('Google Sign-In Error', err.message);
//         });
//     }
//   }, [response]);

//   const handleLogin = () => {
//     console.log('Login Button Pressed');
//     if (!email || !password) {
//       console.log('Email or password missing');
//       return Alert.alert('Error', 'Please enter email and password');
//     }

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         console.log('Login successful:', userCredential.user.email);
//         navigation.replace('Home');
//       })
//       .catch((error) => {
//         console.error('Login error:', error.message);
//         Alert.alert('Login Error', error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Welcome{"\n"}<Text style={styles.bold}>Back!</Text>
//       </Text>

//       <View style={styles.inputContainer}>
//         <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
//         <TextInput
//           placeholder="Email Address"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
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

//       <Pressable style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>LOG IN</Text>
//       </Pressable>

//       <Pressable style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
//         <Text style={styles.linkText}>Forgot Password?</Text>
//       </Pressable>

//       <Text style={styles.orText}>OR SIGN IN WITH</Text>

//       <Pressable style={styles.iconButton} onPress={() => promptAsync()} disabled={!request}>
//         <MaterialIcons name="email" size={24} color="#fff" />
//       </Pressable>

//       <Text style={styles.bottomText}>
//         Don't have an account?{' '}
//         <Text style={styles.bottomLink} onPress={() => navigation.navigate('Register')}>
//           Sign up
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
//   link: {
//     alignSelf: 'flex-end',
//   },
//   linkText: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   orText: {
//     color: '#aaa',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   iconButton: {
//     backgroundColor: '#1A1831',
//     padding: 10,
//     borderRadius: 50,
//     alignSelf: 'center',
//     marginBottom: 30,
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

//login 2 




// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import { AuthContext } from '../context/AuthContext';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setUser, skipLogin } = useContext(AuthContext);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }
// console.log("Trying login with:", email, password);

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       setUser(userCredential.user);
//     } catch (error) {
//       Alert.alert('Login Failed', error.message);
//     }
//     console.log("Trying login with:", email, password);

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Welcome{"\n"}<Text style={styles.bold}>Back!</Text>
//       </Text>

//       <View style={styles.inputContainer}>
//         <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
//         <TextInput
//           placeholder="Email Address"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
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

//       <TouchableOpacity onPress={handleLogin} style={styles.button}>
//         <Text style={styles.buttonText}>LOG IN</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
//         <Text style={styles.linkText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>OR</Text>

//       <TouchableOpacity onPress={skipLogin} style={[styles.button, { backgroundColor: '#555' }]}>
//         <Text style={styles.buttonText}>Skip</Text>
//       </TouchableOpacity>

//       <Text style={styles.bottomText}>
//         Don't have an account?{' '}
//         <Text style={styles.bottomLink} onPress={() => navigation.navigate('Register')}>
//           Sign up
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
//   link: {
//     alignSelf: 'flex-end',
//   },
//   linkText: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   orText: {
//     color: '#aaa',
//     textAlign: 'center',
//     marginVertical: 10,
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
// screens/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const { loginWithGoogle, skipLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '663467097294-m6pg94f5l3600rr4tcbo57eujbfaeps9.apps.googleusercontent.com',
    androidClientId: '663467097294-khi5efui5dgt2usubq8sv1vqvbaqn7r5.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      loginWithGoogle(authentication.accessToken);
    }
  }, [response]);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vyapar<Text style={styles.bold}>Wale</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4285F4' }]}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={async () => {
            await skipLogin(); // sets fake user
            navigation.replace('Home'); // safe navigation
          }}
          style={[styles.button, { backgroundColor: '#555' }]}
        >
          <Text style={styles.buttonText}>Skip & Continue</Text>
        </TouchableOpacity>


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
    backgroundColor: '#1A1831',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#C04EF9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: {
    color: '#aaa',
    textDecorationLine: 'underline',
  },
});
