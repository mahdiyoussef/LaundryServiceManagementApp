import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/routes/route';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
export default function App({navigation}) {
  let [fontsLoaded] = useFonts({
    'Taj-bold': require('./src/fonts/Tajawal-Bold.ttf'), 
    'Taj-regular':require('./src/fonts/Tajawal-Regular.ttf')
  });
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
