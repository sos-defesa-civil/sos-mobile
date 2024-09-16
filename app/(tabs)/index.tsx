import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // Import MapView and Marker
import { useRouter } from "expo-router";

import ConfirmOccurrenceRecord from "../overlays/confirmOccurrenceRecord";
import MapOccurrenceOverlay from "../overlays/mapOccurrenceOverlay";
import ReportOcurrenceOverlay from "../overlays/reportOccurrence";

const fabShadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
};

export default function App() {
    const router = useRouter();

    const [showRainOverlay, setShowRainOverlay] = useState(false);
    const [showFireOverlay, setShowFireOverlay] = useState(false);
    const [confirmOccurence, setConfirmOccurence] = useState(false);
    const [reportOverlay, setReportOverlay] = useState(false);

    const initialRegion = {
        latitude: -9.6498, // Approximate latitude for Maceió, Brazil
        longitude: -35.7089, // Approximate longitude for Maceió, Brazil
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.mapBackground} initialRegion={initialRegion}>
                <Marker coordinate={{ latitude: -9.6398, longitude: -35.7189 }} onPress={() => setShowRainOverlay(true)}>
                    <Image source={require("../../assets/images/rain.png")} style={{ width: 30, height: 30 }} />
                </Marker>

                <Marker coordinate={{ latitude: -9.6598, longitude: -35.6989 }} onPress={() => setShowFireOverlay(true)}>
                    <Image source={require("../../assets/images/fire.png")} style={{ width: 30, height: 30 }} />
                </Marker>
            </MapView>

            <TouchableOpacity style={[styles.centerMapButton, fabShadow]}>
                <FontAwesome name="crosshairs" size={30} color="#828181" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bellButton, fabShadow]}>
                <FontAwesome name="bell" size={24} color="#828181" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.hamburgerMenu, fabShadow]}>
                <FontAwesome name="bars" size={26} color="#828181" />
            </TouchableOpacity>

            <View style={styles.bottomNavBar}>
                <TouchableOpacity style={styles.navBarItem}>
                    <FontAwesome name="map" size={34} color="#FAA74A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={() => router.push('/alerts')}>
                    <FontAwesome name="exclamation-triangle" size={34} color="#828181" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem}>
                    <FontAwesome name="file-text" size={34} color="#828181" onPress={() => setReportOverlay(true)}/>
                </TouchableOpacity>
            </View>

            <MapOccurrenceOverlay
                title="Av. Fernandes Lima"
                description="Alagamento na Avenida Fernandes Lima, próximo ao Hospital Veredas."
                icon={require("../../assets/images/rain_square.png")}
                onClose={() => setShowRainOverlay(false)}
                visible={showRainOverlay}
            />

            <MapOccurrenceOverlay
                title="Rua da Praia"
                description="Incêndio reportado na Rua da Praia, próximo ao Mercado Municipal."
                icon={require("../../assets/images/fire_square.png")}
                onClose={() => setShowFireOverlay(false)}
                visible={showFireOverlay}
            />

            <ReportOcurrenceOverlay 
                visible={reportOverlay}
                onClose={() => setReportOverlay(false)} 
            />

            <ConfirmOccurrenceRecord
                visible={confirmOccurence}
                onConfirm={() => setConfirmOccurence(false)}
                onCancel={() => setConfirmOccurence(false)}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mapBackground: {
        ...StyleSheet.absoluteFillObject,
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
    centerMapButton: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "white",
        borderRadius: 100000,
        padding: 12,
        paddingHorizontal: 14,
    },
    bellButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 100000,
        padding: 14,
    },
    hamburgerMenu: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "white",
        borderRadius: 100,
        padding: 14,
        paddingHorizontal: 15,
    },
});
