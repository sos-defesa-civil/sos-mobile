import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Animated, TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

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

const MapOccurrenceOverlay: React.FC<OverlayProps> = ({ title, description, icon, onClose, visible }) => {
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

const styles = StyleSheet.create({
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
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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

export default MapOccurrenceOverlay;