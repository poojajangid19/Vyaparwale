import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function Screen1({ navigation }) {
  const { skipLogin } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>StoreApp</Text>
        <TouchableOpacity onPress={skipLogin}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/screen1.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to StoreApp</Text>
      <Text style={styles.subtitle}>Your all-in-one shopping assistant.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen2')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B21', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  logo: { color: '#fff', fontSize: 24 },
  skip: { color: '#bbb', fontSize: 16, textDecorationLine: 'underline' },
  image: { width: '100%', height: 300, resizeMode: 'contain', marginVertical: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#ccc', fontSize: 16, textAlign: 'center', marginVertical: 10 },
  button: { backgroundColor: '#C04EF9', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
});
