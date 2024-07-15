import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";

export default Screen = () => (
        <View style={style.container}>
            <StatusBar barStyle='ligt-content' />
        </View>
    );

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }
});