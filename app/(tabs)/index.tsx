import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

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
        <Animated.View style={[styles.overlay, fabShadow, { transform: [{ translateY: animation }] }]}>
            <View style={styles.overlayContent}>
                <Image source={icon} style={styles.overlayIcon} />
                <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayTitle}>{title}</Text>
                    <Text style={styles.overlayDescription}>{description}</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <FontAwesome name="close" size={24} color="#828181" />
                </TouchableOpacity>
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
    const [showRainOverlay, setShowRainOverlay] = useState(false);
    const [showFireOverlay, setShowFireOverlay] = useState(false);

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/map.png")} style={styles.mapBackground} />

            <TouchableOpacity style={[styles.centerMapButton, fabShadow]}>
                <FontAwesome name="crosshairs" size={30} color="#828181" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bellButton, fabShadow]}>
                <FontAwesome name="bell" size={24} color="#828181" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.hamburgerMenu, fabShadow]}>
                <FontAwesome name="bars" size={26} color="#828181" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconContainer, { top: 300, left: 200 }]} onPress={() => setShowRainOverlay(true)}>
                <Image source={require("../../assets/images/rain.png")} style={styles.largeIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconContainer, { top: 400, left: 150 }]} onPress={() => setShowFireOverlay(true)}>
                <Image source={require("../../assets/images/fire.png")} style={styles.largeIcon} />
            </TouchableOpacity>

            <View style={styles.bottomNavBar}>
                <TouchableOpacity style={styles.navBarItem}>
                    <FontAwesome name="map" size={34} color="#FF7B00" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem}>
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
        width: "100%",
        height: "100%",
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
        right: 15,
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
    iconContainer: {
        position: "absolute",
    },
    largeIcon: {
        width: 50,
        height: 50,
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
        width: 70,
        height: 70,
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
});
