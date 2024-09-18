import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, Animated } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";

interface Occurrence {
    id: number;
    tipo: string;
    bairro: string;
    descricao: string;
    data_registro: string;
    ultima_atualizacao: string;
    user_id: number;
    latitude: number;
    longitude: number;
}

const AlertItem = ({ occurrence }: { occurrence: Occurrence }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: isExpanded ? 1 : 0,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(animatedRotation, {
                toValue: isExpanded ? 1 : 0,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start();
    }, [isExpanded]);

    const maxHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Adjust this value based on your content height
    });

    const rotateZ = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.alertItem}>
            <Pressable onPress={() => setIsExpanded(!isExpanded)} style={styles.alertHeader}>
                <Image 
                    source={
                        occurrence.tipo === 'tipo1' 
                            ? require("../../assets/images/rain_square.png")
                            : require("../../assets/images/fire_square.png")
                    } 
                    style={styles.alertIcon} 
                />
                <View style={styles.alertContent}>
                    <Text style={styles.alertTitle}>{occurrence.bairro}</Text>
                    <Text style={styles.alertDescription}>{occurrence.descricao}</Text>
                </View>
                <Animated.View style={{ transform: [{ rotateZ }] }}>
                    <Ionicons name="chevron-down" size={24} color="#000" />
                </Animated.View>
            </Pressable>

            <Animated.View style={[styles.expandedContent, { maxHeight }]}>
                <Text style={styles.expandedContentText}>Ocorrência em análise</Text>
                <View style={styles.overlayButtonsContainer}>
                    <TouchableOpacity style={styles.overlayButton}>
                        <Ionicons name="thumbs-up" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.overlayButton}>
                        <Ionicons name="time" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.overlayButton}>
                        <Image source={require("../../assets/images/status_icon.png")} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const FilterButton = ({ title }: { title: string }) => (
    <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{title}</Text>
        <Ionicons name="chevron-down" size={20} color="#000" />
    </TouchableOpacity>
);

export default function AlertsScreen() {
    const router = useRouter();
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    useEffect(() => {
        fetchOccurrences();
    }, []);

    const fetchOccurrences = async () => {
        try {
            const response = await fetch("http://192.168.0.9:8000/api/ocorrencias/list/");
            const data = await response.json();
            setOccurrences(data);
        } catch (error) {
            console.error('Error fetching occurrences:', error);
        }
    };

    return (
        <View style={{ backgroundColor: "#272c6b", flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.closeButton, styles.boxShadow]}>
                        <Ionicons name="close" size={34} color="#828181" />
                    </TouchableOpacity>
                    <View style={[styles.headerTitleContainer, styles.boxShadow]}>
                        <Text style={styles.headerTitle}>Alertas Ativos</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tabButton, { paddingLeft: 10 }]}>
                        <Text style={styles.tabButtonText}>Todos os alertas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton}>
                        <Text style={styles.tabButtonText}>Defesa Civil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabButton, { borderRightWidth: 0 }]}>
                        <Text style={styles.tabButtonText}>População</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.filterContainer}>
                    <FilterButton title="Bairro" />
                    <FilterButton title="Tipo" />
                    <FilterButton title="Data" />
                </View>

                <ScrollView style={styles.alertList}>
                    {occurrences.map((occurrence) => (
                        <AlertItem key={occurrence.id} occurrence={occurrence} />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.bottomNavBar}>
                <TouchableOpacity style={styles.navBarItem} onPress={() => router.push("/")}>
                    <FontAwesome name="map" size={34} color="#828181" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={() => router.push("/alerts")}>
                    <FontAwesome name="exclamation-triangle" size={34} color="#FAA74A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem}>
                    <FontAwesome name="file-text" size={34} color="#828181" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 24,
        marginBottom: 59,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 24,
        paddingLeft: 0,
    },
    headerTitleContainer: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginLeft: 24,
        marginTop: 4,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000",
    },
    closeButton: {
        backgroundColor: "white",
        borderRadius: 100,
        padding: 10,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFF",
        borderRadius: 12,
    },
    tabButton: {
        paddingRight: 15,
        marginVertical: 8,
        borderRightWidth: 1,
        borderRightColor: "#E0E0E0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    tabButtonText: {
        color: "#000",
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 8,
        marginVertical: 10,
    },
    filterButton: {
        padding: 4,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    filterButtonText: {
        color: "#000",
    },
    alertList: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    alertItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    alertHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    expandedContent: {
        overflow: "hidden",
    },
    overlayButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginBottom: 16,
    },
    overlayButton: {
        width: 40,
        height: 40,
        backgroundColor: "#FAA74A",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    alertIcon: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    alertDescription: {
        fontSize: 14,
        color: "#666",
    },
    bottomNavBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: "center",
        height: 60,
    },
    navBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    expandedContentText: {
        fontSize: 14,
        fontWeight: "300",
        color: "#303030",
        paddingLeft: 16,
    },
});
