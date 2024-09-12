import React from 'react';
import { Text, TextInput, View, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
 
const InfoField = ({ title, value }: { title: string, value: string }) => {
    return (
        <View style={styles.infoSubsection}>
            <Text style={styles.titleTextField}>{title}</Text>
            <TextInput
                style={styles.infoTextField}
                placeholder={value}
            />
        </View>
    );
};
 
const EditProfile = () => {
 
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.closeSection}>
                    <Image style={{ width: 28, height: 28 }} source={require('../../assets/images/close_icon.png')} />
                </View>
                <View style={styles.userPicSection}>
                    <Image source={require('../../assets/images/user_pic_icon.png')} style={{ width: 80, height: 80 }} />
                    <Text style={{ fontFamily: 'SpaceGrotesk_500Medium', fontSize: 22 }}>Alterar Foto</Text>
                </View>
                <View style={styles.infoSection}>
                    <InfoField title="Nome" value="Eduardo Henrique Marques" />
                    <InfoField title="CPF" value="000.000.000-00" />
                    <InfoField title="Endereço" value="Av. Comendador Leão, 999, Poço" />
                    <InfoField title="Telefone" value="(82) 99999-9999" />
                    <InfoField title="Email" value="eduardomarques@gmail.com" />
                    <InfoField title="Data de Nascimento" value="31/03/2003" />
                    <Pressable style={styles.confirmButton}>
                        <Text style={{ fontFamily: 'SpaceGrotesk_700Bold', color: 'white' }}>SALVAR ALTERAÇÕES</Text>
                    </Pressable>
                </View>
                <Text style={styles.termsText}>
                    Ao utilizar, você concorda com os
                    <Text style={{ fontWeight: 'bold' }}> Termos de Serviço </Text>
                    e a
                    <Text style={{ fontWeight: 'bold' }}> Política de Privacidade</Text>.
                </Text>
            </View>
        </ScrollView>
    );
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    closeSection: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userPicSection: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
    },
    infoSection: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        padding: 16,
        gap: 8,
    },
    infoSubsection: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 8,
    },
    titleTextField: {
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 16,
    },
    infoTextField: {
        fontFamily: 'SpaceGrotesk_700Bold',
        color: '#808080',
        paddingLeft: 8,
        paddingBottom: 4,
        paddingTop: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
    },
    confirmButton: {
        backgroundColor: '#272C6B',
        width: '50%',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
        alignSelf: 'center',
    },
    termsText: {
        fontFamily: 'SpaceGrotesk_400Regular',
        textAlign: 'center',
        marginBottom: 8,
    }
});