import { lightTheme, color } from '@/constants/Colors'; // Importing the color themes defined in the project
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Linking } from 'react-native';

// CustomModal component definition
const CustomModal = ({ visible, onClose, title, message, urls }) => {
    // Function to open a URL in the default web browser
    const handlePress = (url) => {
        Linking.openURL(url);
    };

    // Function to render each item in the list of URLs
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.urlButton} onPress={() => handlePress(item)}>
            <Text style={styles.urlText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            transparent={true} // Make the modal background transparent
            visible={visible} // Control the visibility of the modal
            animationType="fade" // Animation type for opening/closing the modal
            onRequestClose={onClose} // Handle the request to close the modal
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    {urls && urls.length > 0 && ( // If URLs are provided, display them in a list
                        <FlatList
                            data={urls} // The list of URLs to display
                            renderItem={renderItem} // Function to render each URL item
                            keyExtractor={(item, index) => index.toString()} // Unique key for each URL item
                            style={styles.urlList} // Styling for the URL list
                        />
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Styles for various elements in the component (not commented as per request)
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: lightTheme.lightShade,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTheme.darkShade,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: lightTheme.darkShade,
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        borderColor: color.neutralCoral,
        borderWidth: 1,
        borderRadius: 5,
    },
    closeButtonText: {
        color: lightTheme.darkShade,
        fontSize: 16,
    },
    urlList: {
        width: '100%',
    },
    urlButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    urlText: {
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default CustomModal; // Exporting the component for use in other parts of the app
