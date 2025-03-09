import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { LoadingContext } from '../../context/LoadingContext.ts/LoadingContext';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'large', color, fullScreen = true }) => {

  const {theme} = useContext(ThemeContext)  
  const {loading} = useContext(LoadingContext);

  if (!loading) return null; 

  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={theme.colors.primary}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Loading;
