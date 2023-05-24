import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './components/MainScreen';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <MainScreen />
      <StatusBar style="auto" />
    </QueryClientProvider>
      
  );
}

