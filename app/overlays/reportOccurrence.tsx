import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import ConfirmOccurrenceRecord from "./confirmOccurrenceRecord";

const { width: screenWidth } = Dimensions.get("window");

interface OverlayProps {
  visible: boolean;
  onClose: () => void;
}

const ReportOccurrenceOverlay: React.FC<OverlayProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState(1); 
  const [selectedOcurrence, setSelectedOcurrence] = useState('');

  const occurrences = [
    { label: 'Chuvas Intensas', value: 'chuvas', icon: 'rainy-outline' },
    { label: 'Incêndio', value: 'incendio', icon: 'flame-outline' },
    { label: 'Deslizamento', value: 'deslizamento', icon: 'earth-outline' },
  ];


  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!visible) {
    return null;
  }

  const progressWidth = (step / 3) * (screenWidth * 0.9);
  return (
    <View style={styles.overlay}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep} disabled={step === 1}>
          <Ionicons name="arrow-back" size={24} color={step === 1 ? "transparent" : "black"} />
        </TouchableOpacity>

        <View style={styles.titleAndStepContainer}>
          <Text style={styles.title}>
            {step === 1 ? "Local da Ocorrência" : step === 2 ? "Descrição" : "Mídia"}
          </Text>
          <View style={styles.stepIndicatorContainer}>
            <Text style={styles.stepIndicator}>{step} de 3</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#828181" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      {step === 1 && (
        <View style={styles.stepContent}>
          <Text style={styles.titleStepOne}>Selecione o local no mapa</Text>
          <Text style={styles.stepSubtitle}>ou</Text>
          <View style={styles.searchContainer}>

            <Ionicons name="search" size={20} color="#A68C70" style={styles.searchIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Digite o Endereço"
              placeholderTextColor="#A68C70"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={nextStep}>
            <Text style={styles.buttonText}>Confirmar Local</Text>
          </TouchableOpacity>
        </View>
      )}

    {step === 2 && (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Tipo de Ocorrência</Text>

          <RNPickerSelect
            onValueChange={(value) => setSelectedOcurrence(value)}
            items={occurrences.map((occurrence) => ({
              label: occurrence.label,
              value: occurrence.value,
              inputLabel: occurrence.label,
              // icon: () => <Ionicons name={occurrence.icon} size={24} color="#A68C70" style={styles.icon} />,
            }))}
            placeholder={{
              label: 'Selecione uma opção', 
              value: null,
              key: 'placeholder',
              style: {
                color: 'black', 
              }
            }}
            style={{
              inputIOS: styles.inputSelect,
              inputAndroid: styles.inputSelect,
              iconContainer: styles.iconContainer,
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Ionicons name="chevron-down" size={24} color="gray" />}
          />

          <TextInput style={styles.input} placeholder="Escreva aqui a descrição (opcional)" />
          <TouchableOpacity style={styles.button} onPress={nextStep}>
            <Text style={styles.buttonText}>Confirmar Descrição</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 3 && (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Anexo de Mídia (opc.)</Text>
          <TextInput style={styles.input} placeholder="Anexe uma imagem da ocorrência" />
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Registrar Ocorrência</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0, 
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleAndStepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FDE4C8",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FDE4C8",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#A68C70",
  },
  stepIndicatorContainer: {
    marginLeft: 10,
    backgroundColor: "#FAA74A",
    borderRadius: 5,
    padding: 5,
  },
  stepIndicator: {
    fontWeight: "bold",
    color: "white",
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: "#ccc",
    marginTop: 5,
    marginBottom: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#272C6B",
  },
  stepContent: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleStepOne: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FDE4C8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FDE4C8",
    color: "#A68C70",
  },
  button: {
    backgroundColor: "#272C6B",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  inputSelect: {
    borderWidth: 1,
    borderColor: '#FDE4C8',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FDE4C8',
    marginBottom: 20,
    color: '#A68C70',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconContainer: {
    top: 12, 
    right: 10, 
  },
});

export default ReportOccurrenceOverlay
