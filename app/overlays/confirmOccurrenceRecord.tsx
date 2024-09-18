import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Pressable, Alert } from 'react-native';

interface ConfirmOccurrenceRecordProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    address: string;
    occurrenceType: string;
    description?: string;
    latitude?: number;
    longitude?: number;
}

const ConfirmOccurrenceRecord: React.FC<ConfirmOccurrenceRecordProps> = ({ 
    visible, 
    onConfirm, 
    onCancel, 
    address, 
    occurrenceType, 
    description,
    latitude,
    longitude
}) => {
    const handleConfirm = async () => {
        try {
            const response = await fetch('http://192.168.0.9:8000/api/ocorrencia/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tipo: occurrenceType === 'chuvas' ? 'tipo1' : 'tipo2',
                    bairro: address,
                    descricao: description || 'No description provided',
                    data_registro: new Date().toISOString(),
                    ultima_atualizacao: new Date().toISOString(),
                    user_id: 2, // You might want to replace this with the actual user ID
                    latitude: latitude,
                    longitude: longitude
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Occurrence recorded successfully');
                onConfirm();
            } else {
                const errorResponse = await response.json();
                console.error('Error response:', errorResponse);
                throw new Error('Failed to record occurrence');
            }
        } catch (error) {
            console.error('Error recording occurrence:', error);
            Alert.alert('Error', 'Failed to record occurrence. Please try again.');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Confirme os Dados</Text>
                        <TouchableOpacity onPress={onCancel}>
                            <Image style={styles.closeIcon}source={require('../../assets/images/close_icon.png')} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.infoSection}>
                        <Text style={styles.subtitle}>Endereço:</Text>
                        <View style={styles.infoField}>
                            <Text style={styles.infoText}>{address || 'Endereço não informado'}</Text>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.subtitle}>Tipo de Ocorrência:</Text>
                        <View style={styles.infoField}>
                            <Image style={styles.disasterIcon} source={
                                occurrenceType === 'chuvas' 
                                    ? require('../../assets/images/rain_square.png')
                                    : require('../../assets/images/fire_square.png')
                            }/>
                            <Text style={styles.infoText}>
                                {occurrenceType === 'chuvas' ? 'Chuvas intensas' :
                                 occurrenceType === 'incendio' ? 'Incêndio' :
                                 occurrenceType === 'deslizamento' ? 'Deslizamento' : 
                                 'Tipo não informado'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.subtitle}>Descrição e anexo</Text>
                        <View style={styles.infoField}>
                            <Text style={styles.infoText}>{description || 'Nenhuma descrição fornecida'}</Text>
                        </View>
                        <View style={styles.infoField}>
                            <Text style={styles.infoText}>300820241330.JPEG</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Registrar Ocorrência</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoSection:{
        flexDirection: 'column',
        width: '100%',
        marginBottom: 8,
        gap: 8,
    },
    infoField: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDE4C8',
        borderRadius: 8,
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#353535',
    },
    disasterIcon: {
        width: 40,
        height: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    closeIcon: {
        width: 28,
        height: 28,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#272C6B',
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
        paddingTop: 12,
    },
    buttonText: {
        color: 'white',
    },
});

export default ConfirmOccurrenceRecord;