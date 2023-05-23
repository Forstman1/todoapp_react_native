import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './components/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
      
  );
}

