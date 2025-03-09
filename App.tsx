import 'react-native-gesture-handler';
import React from 'react';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { ThemeProvider } from './src/presentation/context/themeContext/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingProvider } from './src/presentation/context/LoadingContext.ts/LoadingProvider';
import Loading from './src/presentation/components/ui/Loading';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LoadingProvider>
          <AppNavigator />
          <Loading/>
        </LoadingProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App;
