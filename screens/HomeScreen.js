// // // // screens/HomeScreen.js
// // // import React, { useContext } from 'react';
// // // import { View, Text, Button } from 'react-native';
// // // import { AuthContext } from '../context/AuthContext';

// // // export default function HomeScreen() {
// // //   const { logout } = useContext(AuthContext);

// // //   return (
// // //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // //       <Text style={{ fontSize: 18 }}>Hi 👋 Welcome to my App</Text>
// // //       <Button title="Logout" onPress={logout} />
// // //     </View>
// // //   );
// // // }

// // // screens/HomeScreen.js
// // import React, { useContext, useEffect, useState } from 'react';
// // import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
// // import { AuthContext } from '../context/AuthContext';
// // import { db } from '../firebase';
// // import { doc, getDoc } from 'firebase/firestore';

// // export default function HomeScreen() {
// //   const { user, logout } = useContext(AuthContext);
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         if (user) {
// //           const docRef = doc(db, "users", user.uid);
// //           const docSnap = await getDoc(docRef);
// //           if (docSnap.exists()) {
// //             setProfile(docSnap.data());
// //           }
// //         }
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching profile:", error);
// //         setLoading(false);
// //       }
// //     };
// //     fetchProfile();
// //   }, [user]);

// //   if (loading) {
// //     return <ActivityIndicator size="large" style={{ flex: 1 }} />;
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Hi 👋 Welcome to My App</Text>
// //       {profile ? (
// //         <>
// //           <Text style={styles.detail}>📧 Email: {profile.email}</Text>
// //           <Text style={styles.detail}>🆔 UID: {profile.uid}</Text>
// //           <Text style={styles.detail}>📅 Created: {new Date(profile.createdAt).toLocaleString()}</Text>
// //           {profile.provider && <Text style={styles.detail}>🔐 Login Provider: {profile.provider}</Text>}
// //         </>
// //       ) : (
// //         <Text style={styles.detail}>No profile info available</Text>
// //       )}
// //       <Button title="Logout" onPress={logout} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
// //   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
// //   detail: { fontSize: 16, marginBottom: 10 },
// // });
// // screens/HomeScreen.js



// // screens/HomeScreen.js
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
// import { Menu, Provider as PaperProvider, Divider, Avatar } from 'react-native-paper';
// import { AuthContext } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { Ionicons } from '@expo/vector-icons';

// // export default function HomeScreen({ navigation }) {
// //   const { user, logout } = useContext(AuthContext);
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [menuVisible, setMenuVisible] = useState(false);

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         if (user?.uid) {
// //           const docRef = doc(db, "users", user.uid);
// //           const docSnap = await getDoc(docRef);
// //           if (docSnap.exists()) {
// //             setProfile(docSnap.data());
// //           }
// //         }
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching profile:", error);
// //         setLoading(false);
// //       }
// //     };
// //     fetchProfile();
// //   }, [user]);

// //   const onShare = async () => {
// //     try {
// //       await Share.share({
// //         message: 'Check out this awesome app! 🚀',
// //       });
// //     } catch (error) {
// //       Alert.alert('Error', error.message);
// //     }
// //   };

// //   const openMenu = () => setMenuVisible(true);
// //   const closeMenu = () => setMenuVisible(false);

// //   if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

// //   return (
// //     <PaperProvider>
// //       <View style={styles.container}>
// //         {/* Header with Avatar & Menu */}
// //         <View style={styles.header}>
// //           <View style={styles.avatarContainer}>
// //             <Avatar.Text
// //               label={profile?.name?.charAt(0)?.toUpperCase() || 'U'}
// //               size={44}
// //               style={{ backgroundColor: '#4e7efc' }}
// //             />
// //             <View>
// //               <Text style={styles.username}>{profile?.name || profile?.email}</Text>
// //               <Text style={styles.useremail}>{profile?.email}</Text>
// //             </View>
// //           </View>

// //           <Menu
// //             visible={menuVisible}
// //             onDismiss={closeMenu}
// //             anchor={
// //               <TouchableOpacity onPress={openMenu}>
// //                 <Ionicons name="ellipsis-vertical" size={28} color="black" />
// //               </TouchableOpacity>
// //             }
// //           >
// //             <Menu.Item onPress={() => navigation.navigate('AddSheet')} title="Add New Sheet" />
// //             <Menu.Item onPress={() => navigation.navigate('MySheets')} title="My Sheets" />
// //             <Divider />
// //             <Menu.Item onPress={onShare} title="Share App" />
// //             <Menu.Item onPress={() => Alert.alert("Contact", "Email: contact@app.com")} title="Contact Us" />
// //             <Menu.Item onPress={() => Alert.alert("Rate Us", "⭐️⭐️⭐️⭐️⭐️")} title="Rate Us" />
// //             <Divider />
// //             <Menu.Item onPress={logout} title="Logout" />
// //           </Menu>
// //         </View>

// //         {/* Welcome Message */}
// //         <Text style={styles.welcome}>Hi 👋 Welcome to My App</Text>

// //         {/* Footer */}
// //         <Text style={styles.footer}>Developed by Pooja Jangid 💻</Text>
// //       </View>
// //     </PaperProvider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, justifyContent: 'space-between' },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   avatarContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 10,
// //   },
// //   username: { fontSize: 18, fontWeight: 'bold' },
// //   useremail: { fontSize: 14, color: 'gray' },
// //   welcome: {
// //     fontSize: 20,
// //     textAlign: 'center',
// //     marginTop: 80,
// //     fontWeight: 'bold',
// //   },
// //   footer: {
// //     textAlign: 'center',
// //     fontSize: 14,
// //     color: 'gray',
// //     marginBottom: 20,
// //   },
// // });

// // screens/HomeScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   Share,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-220));

//   const toggleMenu = () => {
//     const toValue = menuVisible ? -220 : 0;
//     Animated.timing(slideAnim, {
//       toValue,
//       duration: 300,
//       easing: Easing.ease,
//       useNativeDriver: true,
//     }).start();
//     setMenuVisible(!menuVisible);
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app built by Pooja Jangid! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Dashboard</Text>
//         <TouchableOpacity onPress={toggleMenu}>
//           <Image
//             source={require('../assets/icon.png')}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Slide Menu */}
//       <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
//         <TouchableOpacity onPress={() => navigation.navigate('AddSheet')} style={styles.menuItem}>
//           <Text style={styles.menuText}>➕ Add New Sheet</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('MySheets')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📄 My Sheets</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleShare} style={styles.menuItem}>
//           <Text style={styles.menuText}>📤 Share App</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Contact Us', 'Email: contact@app.com')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📞 Contact Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Rate Us', '⭐️⭐️⭐️⭐️⭐️')} style={styles.menuItem}>
//           <Text style={styles.menuText}>⭐ Rate Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//           <Text style={styles.menuText}>🚪 Logout</Text>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Developed by Pooja Jangid 💻</Text>
//         </View>
//       </Animated.View>

//       {/* Dashboard Cards */}
//       <View style={styles.dashboard}>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📄 Total Sheets</Text>
//           <Text style={styles.cardValue}>12</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📐 Measurements</Text>
//           <Text style={styles.cardValue}>48</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>🪨 Stone Types</Text>
//           <Text style={styles.cardValue}>3</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0D0B21' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#1A1831',
//     height: 100,
//   },
//   title: { fontSize: 22, color: '#C04EF9', fontWeight: 'bold' },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderColor: '#fff',
//     borderWidth: 1,
//   },
//   sideMenu: {
//     position: 'absolute',
//     top: 100,
//     left: 0,
//     width: 220,
//     backgroundColor: '#1A1831',
//     zIndex: 100,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     height: '100%',
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#333',
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   dashboard: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     paddingVertical: 30,
//   },
//   card: {
//     width: '40%',
//     backgroundColor: '#1A1831',
//     padding: 20,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 10,
//     right: 10,
//   },
//   footerText: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#888',
//   },
// });

/// code 3 

// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   Share,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';
// import { AuthContext } from '../context/AuthContext';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-220));
//   const { skipped } = useContext(AuthContext); // 👈 GET SKIPPED VALUE

//   const toggleMenu = () => {
//     const toValue = menuVisible ? -220 : 0;
//     Animated.timing(slideAnim, {
//       toValue,
//       duration: 300,
//       easing: Easing.ease,
//       useNativeDriver: true,
//     }).start();
//     setMenuVisible(!menuVisible);
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app built by Pooja Jangid! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Dashboard</Text>
//         <TouchableOpacity onPress={toggleMenu}>
//           <Image
//             source={require('../assets/icon.png')}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Slide Menu */}
//       <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
//         <TouchableOpacity onPress={() => navigation.navigate('AddSheet')} style={styles.menuItem}>
//           <Text style={styles.menuText}>➕ Add New Sheet</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('MySheets')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📄 My Sheets</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleShare} style={styles.menuItem}>
//           <Text style={styles.menuText}>📤 Share App</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Contact Us', 'Email: contact@app.com')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📞 Contact Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Rate Us', '⭐️⭐️⭐️⭐️⭐️')} style={styles.menuItem}>
//           <Text style={styles.menuText}>⭐ Rate Us</Text>
//         </TouchableOpacity>

//   {/* 🔙 Back to Login */}
//     <TouchableOpacity
//       onPress={() => {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         });
//       }}
//       style={styles.menuItem}
//     >
//       <Text style={styles.menuText}>🔙 Back to Login</Text>
//     </TouchableOpacity>
//         {/* 🔐 Only show logout if user did NOT skip login */}
//         {!skipped && (
//           <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//             <Text style={styles.menuText}>🚪 Logout</Text>
//           </TouchableOpacity>
//         )}

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Developed by Pooja Jangid 💻</Text>
//         </View>
//       </Animated.View>

//       {/* Dashboard Cards */}
//       <View style={styles.dashboard}>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📄 Total Sheets</Text>
//           <Text style={styles.cardValue}>12</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📐 Measurements</Text>
//           <Text style={styles.cardValue}>48</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>🪨 Stone Types</Text>
//           <Text style={styles.cardValue}>3</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0D0B21' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#1A1831',
//     height: 100,
//   },
//   title: { fontSize: 22, color: '#C04EF9', fontWeight: 'bold' },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderColor: '#fff',
//     borderWidth: 1,
//   },
//   sideMenu: {
//     position: 'absolute',
//     top: 100,
//     left: 0,
//     width: 220,
//     backgroundColor: '#1A1831',
//     zIndex: 100,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     height: '100%',
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#333',
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   dashboard: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     paddingVertical: 30,
//   },
//   card: {
//     width: '40%',
//     backgroundColor: '#1A1831',
//     padding: 20,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 10,
//     right: 10,
//   },
//   footerText: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#888',
//   },
// });

// // // screens/HomeScreen.js
// // import React, { useContext } from 'react';
// // import { View, Text, Button } from 'react-native';
// // import { AuthContext } from '../context/AuthContext';

// // export default function HomeScreen() {
// //   const { logout } = useContext(AuthContext);

// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text style={{ fontSize: 18 }}>Hi 👋 Welcome to my App</Text>
// //       <Button title="Logout" onPress={logout} />
// //     </View>
// //   );
// // }

// // screens/HomeScreen.js
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
// import { AuthContext } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// export default function HomeScreen() {
//   const { user, logout } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (user) {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setProfile(docSnap.data());
//           }
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user]);

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ flex: 1 }} />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Hi 👋 Welcome to My App</Text>
//       {profile ? (
//         <>
//           <Text style={styles.detail}>📧 Email: {profile.email}</Text>
//           <Text style={styles.detail}>🆔 UID: {profile.uid}</Text>
//           <Text style={styles.detail}>📅 Created: {new Date(profile.createdAt).toLocaleString()}</Text>
//           {profile.provider && <Text style={styles.detail}>🔐 Login Provider: {profile.provider}</Text>}
//         </>
//       ) : (
//         <Text style={styles.detail}>No profile info available</Text>
//       )}
//       <Button title="Logout" onPress={logout} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   detail: { fontSize: 16, marginBottom: 10 },
// });
// screens/HomeScreen.js

// screens/HomeScreen.js
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
// import { Menu, Provider as PaperProvider, Divider, Avatar } from 'react-native-paper';
// import { AuthContext } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { Ionicons } from '@expo/vector-icons';

// export default function HomeScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [menuVisible, setMenuVisible] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (user?.uid) {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setProfile(docSnap.data());
//           }
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user]);

//   const onShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const openMenu = () => setMenuVisible(true);
//   const closeMenu = () => setMenuVisible(false);

//   if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         {/* Header with Avatar & Menu */}
//         <View style={styles.header}>
//           <View style={styles.avatarContainer}>
//             <Avatar.Text
//               label={profile?.name?.charAt(0)?.toUpperCase() || 'U'}
//               size={44}
//               style={{ backgroundColor: '#4e7efc' }}
//             />
//             <View>
//               <Text style={styles.username}>{profile?.name || profile?.email}</Text>
//               <Text style={styles.useremail}>{profile?.email}</Text>
//             </View>
//           </View>

//           <Menu
//             visible={menuVisible}
//             onDismiss={closeMenu}
//             anchor={
//               <TouchableOpacity onPress={openMenu}>
//                 <Ionicons name="ellipsis-vertical" size={28} color="black" />
//               </TouchableOpacity>
//             }
//           >
//             <Menu.Item onPress={() => navigation.navigate('AddSheet')} title="Add New Sheet" />
//             <Menu.Item onPress={() => navigation.navigate('MySheets')} title="My Sheets" />
//             <Divider />
//             <Menu.Item onPress={onShare} title="Share App" />
//             <Menu.Item onPress={() => Alert.alert("Contact", "Email: contact@app.com")} title="Contact Us" />
//             <Menu.Item onPress={() => Alert.alert("Rate Us", "⭐️⭐️⭐️⭐️⭐️")} title="Rate Us" />
//             <Divider />
//             <Menu.Item onPress={logout} title="Logout" />
//           </Menu>
//         </View>

//         {/* Welcome Message */}
//         <Text style={styles.welcome}>Hi 👋 Welcome to My App</Text>

//         {/* Footer */}
//         <Text style={styles.footer}>Developed by Pooja Jangid 💻</Text>
//       </View>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'space-between' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   username: { fontSize: 18, fontWeight: 'bold' },
//   useremail: { fontSize: 14, color: 'gray' },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 80,
//     fontWeight: 'bold',
//   },
//   footer: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 20,
//   },
// });

// screens/HomeScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   Share,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-220));

//   const toggleMenu = () => {
//     const toValue = menuVisible ? -220 : 0;
//     Animated.timing(slideAnim, {
//       toValue,
//       duration: 300,
//       easing: Easing.ease,
//       useNativeDriver: true,
//     }).start();
//     setMenuVisible(!menuVisible);
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app built by Pooja Jangid! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Dashboard</Text>
//         <TouchableOpacity onPress={toggleMenu}>
//           <Image
//             source={require('../assets/icon.png')}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Slide Menu */}
//       <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
//         <TouchableOpacity onPress={() => navigation.navigate('AddSheet')} style={styles.menuItem}>
//           <Text style={styles.menuText}>➕ Add New Sheet</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('MySheets')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📄 My Sheets</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleShare} style={styles.menuItem}>
//           <Text style={styles.menuText}>📤 Share App</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Contact Us', 'Email: contact@app.com')} style={styles.menuItem}>
//           <Text style={styles.menuText}>📞 Contact Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Alert.alert('Rate Us', '⭐️⭐️⭐️⭐️⭐️')} style={styles.menuItem}>
//           <Text style={styles.menuText}>⭐ Rate Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//           <Text style={styles.menuText}>🚪 Logout</Text>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Developed by Pooja Jangid 💻</Text>
//         </View>
//       </Animated.View>

//       {/* Dashboard Cards */}
//       <View style={styles.dashboard}>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📄 Total Sheets</Text>
//           <Text style={styles.cardValue}>12</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>📐 Measurements</Text>
//           <Text style={styles.cardValue}>48</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>🪨 Stone Types</Text>
//           <Text style={styles.cardValue}>3</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0D0B21' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#1A1831',
//     height: 100,
//   },
//   title: { fontSize: 22, color: '#C04EF9', fontWeight: 'bold' },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderColor: '#fff',
//     borderWidth: 1,
//   },
//   sideMenu: {
//     position: 'absolute',
//     top: 100,
//     left: 0,
//     width: 220,
//     backgroundColor: '#1A1831',
//     zIndex: 100,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     height: '100%',
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#333',
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   dashboard: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     paddingVertical: 30,
//   },
//   card: {
//     width: '40%',
//     backgroundColor: '#1A1831',
//     padding: 20,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 10,
//     right: 10,
//   },
//   footerText: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#888',
//   },
// });


/// enww code 
// screens/HomeScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Share,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width));
  const { skipped, user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    const toValue = menuVisible ? -width : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome app built by Pooja Jangid! 🚀',
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const userEmail = user?.email || 'guest@user.com';
  const avatarLetter = userEmail[0]?.toUpperCase() || 'U';

  return (
    <View style={styles.container}>
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={toggleMenu} />
      )}

      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{avatarLetter}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.drawerEmail}>{userEmail}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('AddSheet')} style={styles.menuItem}>
          <Text style={styles.menuText}>➕ Add New Sheet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MySheets')} style={styles.menuItem}>
          <Text style={styles.menuText}>📄 My Sheets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.menuItem}>
          <Text style={styles.menuText}>📤 Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Contact Us', 'Email: contact@app.com')} style={styles.menuItem}>
          <Text style={styles.menuText}>📞 Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Rate Us', '⭐️⭐️⭐️⭐️⭐️')} style={styles.menuItem}>
          <Text style={styles.menuText}>⭐ Rate Us</Text>
        </TouchableOpacity>
        {skipped ? (
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();  // close drawer
                  navigation.replace('Login'); // redirect to login screen
                }}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>🔙 Back to Login</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  await handleLogout(); // firebase logout
                  navigation.replace('Login'); // redirect
                }}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>🚪 Logout</Text>
              </TouchableOpacity>
            )}


        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Pooja Jangid 💻</Text>
        </View>
      </Animated.View>

      <View style={styles.dashboardGrid}>
        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#FFD54F' }]}>
          <Text style={styles.gridText}>ESTIMATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#FFB74D' }]}>
          <Text style={styles.gridText}>INVOICE</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('CreateSheetScreen')}
            style={[styles.gridItem, { backgroundColor: '#EF5350' }]}>
            <Text style={styles.gridText}>MEASUREMENT</Text>
          </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#42A5F5' }]}>
          <Text style={styles.gridText}>INVENTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#AB47BC' }]}>
          <Text style={styles.gridText}>CHALLAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#66BB6A' }]}>
          <Text style={styles.gridText}>NOTES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: wp('90%'),
    height: hp('10%'),
  },
  text: {
    fontSize: moderateScale(16), // responsive font
  },
  container: { flex: 1, backgroundColor: '#0D0B21' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1A1831',
    height: 100,
  },
  title: { fontSize: 22, color: '#C04EF9', fontWeight: 'bold' },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#C04EF9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarLetter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawer: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: width * 0.7,
    backgroundColor: '#1A1831',
    zIndex: 100,
    paddingVertical: 20,
    paddingHorizontal: 15,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  drawerEmail: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    paddingLeft: 4,
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000aa',
    zIndex: 50,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  gridItem: {
    width: '47%',
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gridText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
  },
});


// screens/HomeScreen.js

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
// const cardSize = (width - 60) / 2; // 2-column grid with padding

// const categories = [
//   { name: 'Granite', color: '#E63946' },
//   { name: 'Marble', color: '#457B9D' },
//   { name: 'Block', color: '#2A9D8F' },
//   { name: 'Quartz', color: '#F4A261' }, // Optional 4th box
// ];

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   const handlePress = (category) => {
//     navigation.navigate('PartyDetails', { category });
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.card, { backgroundColor: item.color }]}
//       onPress={() => handlePress(item.name)}
//     >
//       <Text style={styles.cardText}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.heading}>Select Product Category</Text>

//       <FlatList
//         data={categories}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.name}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.grid}
//       />

//       <Text style={styles.footer}>© GraniteApp 2025</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#1D3557',
//     marginBottom: 30,
//   },
//   grid: {
//     justifyContent: 'center',
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   card: {
//     width: cardSize,
//     height: cardSize,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//   },
//   cardText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: 40,
//     fontSize: 12,
//     color: '#A0A0A0',
//   },
// });

















// working code 1 => with wgite backgroubd  =================> 

// import React, react from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Share,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import { Menu, Provider as PaperProvider, Divider, Avatar } from 'react-native-paper';
// import { AuthContext } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
// const cardWidth = width * 0.25;

// const categories = ['Granite', 'Marble', 'Quartz', 'Block'];

// export default function HomeScreen() {
//   const { user, logout } = react.useContext(AuthContext);
//   const navigation = useNavigation();
//   const [profile, setProfile] = react.useState(null);
//   const [loading, setLoading] = react.useState(true);
//   const [menuVisible, setMenuVisible] = react.useState(false);

//   react.useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (user?.uid) {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setProfile(docSnap.data());
//           }
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user]);

//   const onShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handlePress = (category) => {
//     navigation.navigate('PartyDetails', { category });
//   };

//   const openMenu = () => setMenuVisible(true);
//   const closeMenu = () => setMenuVisible(false);

//   if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.avatarContainer}>
//             <Avatar.Text
//               label={profile?.name?.charAt(0)?.toUpperCase() || 'U'}
//               size={44}
//               style={{ backgroundColor: '#4e7efc' }}
//             />
//             <View>
//               <Text style={styles.username}>{profile?.name || profile?.email}</Text>
//               <Text style={styles.useremail}>{profile?.email}</Text>
//             </View>
//           </View>

//           <Menu
//             visible={menuVisible}
//             onDismiss={closeMenu}
//             anchor={
//               <TouchableOpacity onPress={openMenu}>
//                 <Ionicons name="ellipsis-vertical" size={28} color="black" />
//               </TouchableOpacity>
//             }
//           >
//             <Menu.Item onPress={() => navigation.navigate('AddSheet')} title="Add New Sheet" />
//             <Menu.Item onPress={() => navigation.navigate('MySheets')} title="My Sheets" />
//             <Divider />
//             <Menu.Item onPress={onShare} title="Share App" />
//             <Menu.Item onPress={() => Alert.alert("Contact", "Email: contact@app.com")} title="Contact Us" />
//             <Menu.Item onPress={() => Alert.alert("Rate Us", "⭐️⭐️⭐️⭐️⭐️")} title="Rate Us" />
//             <Divider />
//             <Menu.Item onPress={logout} title="Logout" />
//           </Menu>
//         </View>

//         {/* Welcome */}
//         <Text style={styles.welcome}>Hi 👋 Welcome to GraniteApp</Text>

//         {/* Product Categories */}
//         <Text style={styles.selectTitle}>Select Product Category</Text>
//         <View style={styles.cardRow}>
//           {categories.map((item) => (
//             <TouchableOpacity key={item} style={styles.card} onPress={() => handlePress(item)}>
//               <Text style={styles.cardText}>{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Footer */}
//         <Text style={styles.footer}>Developed by Pooja Jangid 💻</Text>
//       </View>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'space-between' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   username: { fontSize: 18, fontWeight: 'bold' },
//   useremail: { fontSize: 14, color: 'gray' },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 30,
//     fontWeight: 'bold',
//   },
//   selectTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 20,
//     textAlign: 'center',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap',
//     gap: 20,
//   },
//   card: {
//     backgroundColor: '#f1f1f1',
//     width: cardWidth,
//     height: cardWidth,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   cardText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   footer: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 10,
//   },
// });










// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Share,
//   Alert,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import {  Provider as PaperProvider ,Avatar } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// const { width } = Dimensions.get('window');
// const cardWidth = width * 0.25;

// const categories = ['Granite', 'Marble', 'Quartz', 'Block'];

// export default function HomeScreen() {
//   const { user, logout } = useContext(AuthContext);
//   const navigation = useNavigation();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [menuVisible, setMenuVisible] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (user?.uid) {
//           const docRef = doc(db, 'users', user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setProfile(docSnap.data());
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   const onShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out this awesome app! 🚀',
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handlePress = (category) => {
//     navigation.navigate('PartyDetails', { category });
//   };

//   // const toggleMenu = () => setMenuVisible((prev) => !prev);

//   if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//         <View style={styles.header}>
//   <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.avatarContainer}>
//     <Avatar.Text
//       label={profile?.name?.charAt(0)?.toUpperCase() || 'U'}
//       size={44}
//       style={styles.avatar}
//     />
//     <View>
//       <Text style={styles.username}>{profile?.name || profile?.email || 'Guest'}</Text>
//       <Text style={styles.useremail}>{profile?.email || 'Logged in as Guest'}</Text>
//     </View>
//   </TouchableOpacity>
// </View>

//         </View>

//         {/* Dashboard */}
//         <View style={styles.dashboard}>
//           <View style={styles.metricCard}>
//             <Text style={styles.metricTitle}>Measurements</Text>
//             <Text style={styles.metricValue}>48</Text>
//           </View>
//         </View>

//         {/* Welcome */}
//         <Text style={styles.welcome}>Hi 👋 Welcome to GraniteApp</Text>

//         {/* Product Categories */}
//         <Text style={styles.selectTitle}>Select Product Category</Text>
//         <View style={styles.cardRow}>
//           {categories.map((item) => (
//             <TouchableOpacity key={item} style={styles.card} onPress={() => handlePress(item)}>
//               <Text style={styles.cardText}>{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2a003f', // deep purple
//     padding: 20,
//     justifyContent: 'space-between',
//   },
//   header: {
//     alignItems: 'flex-start',
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   avatar: {
//     backgroundColor: '#a855f7', // bright purple
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   useremail: {
//     fontSize: 14,
//     color: '#ccc',
//   },
//   dashboard: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   metricCard: {
//     backgroundColor: '#3c1d5d',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   metricTitle: {
//     fontSize: 16,
//     color: '#ccc',
//   },
//   metricValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#e9b3ff',
//     marginTop: 8,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 30,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   selectTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 20,
//     textAlign: 'center',
//     color: '#e0ccff',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap',
//     gap: 20,
//   },
//   card: {
//     backgroundColor: '#3c1d5d',
//     width: cardWidth,
//     height: cardWidth,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   cardText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#e0ccff',
//   },
//   menuFooter: {
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#aaa',
//     padding: 10,
//   },
// });
