import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AlertItem = ({ title, description, isExpanded }: { title: string; description: string; isExpanded: boolean }) => (
    <View style={styles.alertItem}>
        <Image source={require("../../assets/images/fire_square.png")} style={styles.alertIcon} />
        <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertDescription}>{description}</Text>
        </View>
        <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#000" />
    </View>
);

const FilterButton = ({ title }: { title: string }) => (
    <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{title}</Text>
        <FontAwesome name="chevron-down" size={24} color="#000" />
    </TouchableOpacity>
);

export default function AlertsScreen() {
    const router = useRouter();

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
                    <TouchableOpacity style={styles.tabButton}>
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
                    <AlertItem title="Av. João Davino" description="Incêndio na Avenida João Davino, próximo a Maple Bear." isExpanded={false} />
                    <AlertItem title="Av. João Davino" description="Tornado na Avenida João Davino, próximo a Maple Bear." isExpanded={false} />
                    <AlertItem title="Av. João Davino" description="Incêndio na Avenida João Davino, próximo a Maple Bear." isExpanded={false} />
                    <AlertItem title="Av. João Davino" description="Alagamento na Avenida João Davino, próximo a Maple Bear." isExpanded={true} />
                    <AlertItem title="Av. João Davino" description="Incêndio na Avenida João Davino, próximo a Maple Bear." isExpanded={false} />
                </ScrollView>
            </View>
            <View style={styles.bottomNavBar}>
                <TouchableOpacity style={styles.navBarItem}>
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
        paddingHorizontal: 8,
    },
    tabButton: {
        paddingHorizontal: 10,
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
        marginTop: 10,
    },
    filterButton: {
        padding: 8,
        borderRadius: 4,
    },
    filterButtonText: {
        color: "#000",
    },
    alertList: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    alertItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    alertIcon: {
        width: 40,
        height: 40,
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
});
