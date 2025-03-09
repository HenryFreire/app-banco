import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ButtonPrimary } from "./ButtonPrimary";
import { ThemeContext } from "../../context/themeContext/ThemeContext";

interface CustomModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, title, message, onConfirm, onCancel, loading = false }) => {
  
    const {theme} = useContext(ThemeContext)
  
    return (
    <Modal 
      isVisible={visible} 
      onBackdropPress={onCancel} 
      style={styles.modalBottom} 
      swipeDirection="down"
      onSwipeComplete={onCancel}
      animationIn="slideInUp" 
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.handle} /> 
        <Text style={styles.message}>{message}</Text>
        
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.buttonContainer}>
          <ButtonPrimary 
            title="Confirmar" 
            onPress={onConfirm} 
            loading={loading}
          />
          <ButtonPrimary 
            title="Cancelar" 
            onPress={onCancel} 
            stylesBtn={{backgroundColor: theme.colors.gris, marginBottom: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBottom: {
    justifyContent: "flex-end", 
    margin: 0, 
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    width: "100%",
    height: 260,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
    marginTop: 20
  },
  confirmButton: {
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    marginLeft: 5,
  },
  cancelText: {
    color: "#333",
  },
});

export default CustomModal
