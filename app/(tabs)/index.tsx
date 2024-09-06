import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // Import MapView and Marker
import { useRouter } from "expo-router";

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

const overlayShadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
};

interface OverlayProps {
    title: string;
    description: string;
    icon: any; // Or use a more specific type if possible
    onClose: () => void;
    visible: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ title, description, icon, onClose, visible }) => {
    const [animation] = useState(new Animated.Value(visible ? 0 : -100));

    React.useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 0 : -250,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View style={[styles.overlay, overlayShadow, { transform: [{ translateY: animation }] }]}>
            <View style={styles.overlayContent}>
                <Image source={icon} style={styles.overlayIcon} />
                <View style={styles.overlayTextContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.overlayTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#828181" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.overlayDescription}>{description}</Text>
                </View>
            </View>
            <View style={styles.overlayButtonsContainer}>
                <TouchableOpacity style={styles.overlayButton}>
                    <Image source={require("../../assets/images/alert_icon.png")} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.overlayButton}>
                    <Image source={require("../../assets/images/comment_icon.png")} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.overlayButton}>
                    <Image source={require("../../assets/images/status_icon.png")} style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default function App() {
  const router = useRouter();
  
    const [showRainOverlay, setShowRainOverlay] = useState(false);
    const [showFireOverlay, setShowFireOverlay] = useState(false);

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
                    <FontAwesome name="file-text" size={34} color="#828181" />
                </TouchableOpacity>
            </View>

            <Overlay
                title="Av. Fernandes Lima"
                description="Alagamento na Avenida Fernandes Lima, próximo ao Hospital Veredas."
                icon={require("../../assets/images/rain_square.png")}
                onClose={() => setShowRainOverlay(false)}
                visible={showRainOverlay}
            />

            <Overlay
                title="Rua da Praia"
                description="Incêndio reportado na Rua da Praia, próximo ao Mercado Municipal."
                icon={require("../../assets/images/fire_square.png")}
                onClose={() => setShowFireOverlay(false)}
                visible={showFireOverlay}
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
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 20,
        paddingLeft: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    overlayContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    overlayIcon: {
        marginRight: 10,
        marginLeft: 26,
    },
    overlayTextContainer: {
        flex: 1,
    },
    overlayTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    overlayDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    closeButton: {
        padding: 5,
    },
    overlayButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
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
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
