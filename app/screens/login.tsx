import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <View style={styles.logoAndTitle}>
                        <Image source={require("../../assets/images/logo_defesa_civil.jpg")} style={styles.logo} />
                        <View>
                            <Text style={styles.title}>Bem-vindo ao SOS Defesa Civil Alagoas</Text>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Monitore alertas de desastres e proteja sua comunidade.</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Endereço de Email"
                    placeholderTextColor="#777"
                    keyboardType="email-address"
                />


                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Não possui conta? <Text style={styles.registerLink}>Clique aqui</Text>
                </Text>


                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>ou</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="mail-outline" size={24} color="#000" />
                    <Text style={styles.socialButtonText}>Continuar com o Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButtonGoogle}>
                    <Ionicons name="logo-google" size={24} color="#000" />
                    <Text style={styles.socialButtonText}>Continuar com Google</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.footerContainer}>
                <Text style={styles.termsText}>
                    Ao utilizar, você concorda com os
                    <Text style={{ fontWeight: 'bold' }}> Termos de Serviço </Text>
                    e a
                    <Text style={{ fontWeight: 'bold' }}> Política de Privacidade</Text>.
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 64,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
    },
    logoAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },

    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#272C6B',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        textAlign: 'center',
        color: '#555',
        marginBottom: 10,
    },
    registerLink: {
        color: '#272C6B',
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    orText: {
        marginHorizontal: 10,
        color: '#999',
    },
    socialButton: {
        backgroundColor: '#FAA74A',
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    socialButtonGoogle: {
        backgroundColor: '#FAA74A',
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    footerContainer: {
        paddingTop: 50,
    },
    termsText: {
        fontFamily: 'SpaceGrotesk_400Regular',
        textAlign: 'center',
        marginBottom: 8,
    },
    linkText: {
        color: '#272C6B',
        fontWeight: 'bold',
    },
});
