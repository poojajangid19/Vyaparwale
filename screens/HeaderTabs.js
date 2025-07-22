// components/HeaderTabs.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HeaderTabs() {
  const navigation = useNavigation();
  const route = useRoute();

  const isCreateActive = route.name === 'CreateSheetScreen';
  const isAllActive = route.name === 'AllSheetsScreen';

  return (
    <View style={styles.wrapper}>
      {/* Header Top */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logo}>VyaparWale</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('../assets/icon.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateSheetScreen')}>
          <Text style={[styles.tab, isCreateActive && styles.activeTab]}>Create Sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AllSheetsScreen')}>
          <Text style={[styles.tab, isAllActive && styles.activeTab]}>All Sheets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  settingsIcon: {
    width: 28,
    height: 28,
    tintColor: '#c6ff00',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    fontSize: 16,
    paddingBottom: 10,
    color: 'gray',
  },
  activeTab: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#c6ff00',
  },
});
