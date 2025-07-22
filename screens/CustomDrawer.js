import React, { useContext } from 'react';
import { View, StyleSheet, Share, Alert, TouchableOpacity, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, Avatar } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  const { user, skipped, logout, setSkipped } = useContext(AuthContext);

  const handleShare = async () => {
    try {
      await Share.share({ message: 'Check out this awesome app! 🚀' });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleBackToLogin = () => {
    setSkipped(false);
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Avatar.Text
            label={user?.email?.[0]?.toUpperCase() || 'G'}
            size={60}
            style={styles.avatar}
            color="#2c1a47"
          />
          <Text style={styles.email}>{user?.email || 'Guest User'}</Text>
        </View>

        <View style={styles.drawerItems}>
          <DrawerItem label="Add New Sheet" labelStyle={styles.label} icon={() => <Ionicons name="add" color="#fff" size={22} />} onPress={() => {}} />
          <DrawerItem label="My Sheets" labelStyle={styles.label} icon={() => <Ionicons name="document-text" color="#fff" size={22} />} onPress={() => {}} />
          <DrawerItem label="Share App" labelStyle={styles.label} icon={() => <Ionicons name="share-social" color="#fff" size={22} />} onPress={handleShare} />
          <DrawerItem label="Contact Us" labelStyle={styles.label} icon={() => <Ionicons name="mail" color="#fff" size={22} />} onPress={() => Alert.alert('Contact', 'Email: contact@app.com')} />
          <DrawerItem label="Rate Us" labelStyle={styles.label} icon={() => <MaterialIcons name="star-rate" color="#fff" size={22} />} onPress={() => {}} />

          {user && (
            <DrawerItem label="Logout" labelStyle={styles.label} icon={() => <Ionicons name="log-out" color="#fff" size={22} />} onPress={logout} />
          )}

          {skipped && !user && (
            <TouchableOpacity onPress={handleBackToLogin} style={styles.backToLogin}>
              <Text style={styles.backToLoginText}>🔙 Back to Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </DrawerContentScrollView>

      <Text style={styles.footer}>Developed by Pooja Jangid 💻</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c1a47' },
  scrollContainer: { paddingTop: Platform.OS === 'ios' ? 40 : 20 },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  email: {
    marginTop: 10,
    color: '#ccc',
    fontSize: 14,
  },
  drawerItems: {
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontSize: 15,
  },
  backToLogin: {
    marginTop: 10,
    marginLeft: 20,
  },
  backToLoginText: {
    color: 'orange',
    fontSize: 14,
  },
  footer: {
    textAlign: 'center',
    padding: 10,
    fontSize: 13,
    color: '#aaa',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
});
