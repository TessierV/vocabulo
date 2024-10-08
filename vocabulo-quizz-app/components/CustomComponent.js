import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { ContainerParagraph, ContainerTitle } from '@/constants/StyledText';
import { lightTheme } from '@/constants/Colors';

const CustomComponent = () => {
    const svgIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8.33994V15.6599C2 17.1599 3.62999 18.0999 4.92999 17.3499L8.10001 15.5299L11.27 13.7C11.47 13.58 11.63 13.45 11.76 13.29V10.73C11.63 10.57 11.47 10.44 11.27 10.32L8.10001 8.48993L4.92999 6.66996C3.62999 5.89996 2 6.83994 2 8.33994Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.76 8.33994V15.6599C11.76 17.1599 13.39 18.0999 14.69 17.3499L17.86 15.5299L21.03 13.7C22.33 12.95 22.33 11.08 21.03 10.32L17.86 8.48993L14.69 6.66996C13.39 5.89996 11.76 6.83994 11.76 8.33994Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

    const svgTest = `<svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg"><g id="_30-Bed" data-name="30-Bed"><path d="m63 34v10h-3v-6a4 4 0 0 0 -4-4h-48a4 4 0 0 0 -4 4v6h-3v-10a4 4 0 0 1 4-4h54a3.995 3.995 0 0 1 4 4z" fill="#75806d"/><path d="m58 48-1 4h-2l-1-4z" fill="#70695b"/><path d="m15 34h34v6h-34z" fill="#6b411c"/><path d="m10 48-1 4h-2l-1-4z" fill="#70695b"/><rect fill="#75806d" height="10" rx="2" width="16" x="14" y="20"/><rect fill="#75806d" height="10" rx="2" width="16" x="34" y="20"/><path d="m14 28a2.006 2.006 0 0 0 2 2h-7v-14h46v14h-7a2.006 2.006 0 0 0 2-2v-6a2.006 2.006 0 0 0 -2-2h-12a2.006 2.006 0 0 0 -2 2v6a2.006 2.006 0 0 0 2 2h-8a2.006 2.006 0 0 0 2-2v-6a2.006 2.006 0 0 0 -2-2h-12a2.006 2.006 0 0 0 -2 2z" fill="#e8e4dc"/><path d="m56 34a4 4 0 0 1 4 4v10h-56v-10a4 4 0 0 1 4-4h7v6h34v-6z" fill="#b56e2f"/><path d="m59 14v16h-4v-14h-46v14h-4v-16a2.006 2.006 0 0 1 2-2h50a2.006 2.006 0 0 1 2 2z" fill="#b56e2f"/><path d="m28 27h-12a2.006 2.006 0 0 1 -2-2v3a2.006 2.006 0 0 0 2 2h12a2.006 2.006 0 0 0 2-2v-3a2.006 2.006 0 0 1 -2 2z" fill="#586957"/><path d="m48 27h-12a2.006 2.006 0 0 1 -2-2v3a2.006 2.006 0 0 0 2 2h12a2.006 2.006 0 0 0 2-2v-3a2.006 2.006 0 0 1 -2 2z" fill="#586957"/><path d="m8 37h7v-3h-7a4 4 0 0 0 -4 4v3a4 4 0 0 1 4-4z" fill="#d68238"/><path d="m56 34h-7v3h7a4 4 0 0 1 4 4v-3a4 4 0 0 0 -4-4z" fill="#d68238"/><path d="m57 25v-10a1 1 0 0 0 -1-1h-48a1 1 0 0 0 -1 1v10a2 2 0 0 1 -2 2v3h4v-14h46v14h4v-3a2 2 0 0 1 -2-2z" fill="#6b411c"/><rect fill="#d68238" height="2" rx="1" width="32" x="12" y="12"/><rect fill="#d68238" height="2" rx="1" width="5" x="47" y="12"/><path d="m36 20h-3a2.006 2.006 0 0 0 -2 2v6a1.975 1.975 0 0 0 .279 1h-1.558a2 2 0 0 1 -1.721 1h8a1.968 1.968 0 0 1 -.483-.066c-.04-.01-.077-.024-.116-.036a2 2 0 0 1 -.361-.156c-.022-.012-.045-.023-.067-.036a2.045 2.045 0 0 1 -.693-.706 1.975 1.975 0 0 1 -.28-1v-6a2.006 2.006 0 0 1 2-2z" fill="#cdc3b4"/><path d="m9 16v14h7a1.968 1.968 0 0 1 -.483-.066c-.04-.01-.077-.024-.116-.036a2 2 0 0 1 -.361-.156c-.022-.012-.045-.023-.067-.036a2.045 2.045 0 0 1 -.693-.706 1.975 1.975 0 0 1 -.28-1v-6a2.006 2.006 0 0 1 2-2h-3a2.006 2.006 0 0 0 -2 2v6a1.975 1.975 0 0 0 .279 1h-1.279v-12h44v12h-4.279a2 2 0 0 1 -1.721 1h7v-14z" fill="#cdc3b4"/><path d="m44.147 21.106c-.092.015-.184.031-.276.05a1.463 1.463 0 0 0 -.518.186.893.893 0 0 0 -.1 1.334 2.568 2.568 0 0 0 .993.621l1.5.641 2.207.946a.714.714 0 0 0 .663.051.626.626 0 0 0 .2-.267 2.494 2.494 0 0 0 .184-1.124 3.2 3.2 0 0 0 -.122-1.019 1.954 1.954 0 0 0 -.777-1.187 3.168 3.168 0 0 0 -1.351-.3 11.664 11.664 0 0 0 -2.603.068z" fill="#8c9882"/><path d="m24.147 21.106c-.092.015-.184.031-.276.05a1.463 1.463 0 0 0 -.518.186.893.893 0 0 0 -.1 1.334 2.568 2.568 0 0 0 .993.621l1.495.641 2.207.946a.714.714 0 0 0 .663.051.626.626 0 0 0 .2-.267 2.494 2.494 0 0 0 .189-1.124 3.2 3.2 0 0 0 -.122-1.019 1.954 1.954 0 0 0 -.777-1.187 3.168 3.168 0 0 0 -1.351-.3 11.664 11.664 0 0 0 -2.603.068z" fill="#8c9882"/><path d="m61 39v-4a3 3 0 0 0 -3-3h-52a3 3 0 0 0 -3 3v4a2 2 0 0 1 -2 2v3h3v-6a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v6h3v-3a2 2 0 0 1 -2-2z" fill="#586957"/><path d="m15 34h34v3h-34z" fill="#875223"/><path d="m15 40h34a0 0 0 0 1 0 0 3 3 0 0 1 -3 3h-28a3 3 0 0 1 -3-3 0 0 0 0 1 0 0z" fill="#945a26"/></g></svg>`;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    <SvgXml xml={svgTest} width="30" height="30" />
                    <View style={styles.textContainer}>
                        <ContainerParagraph style={styles.primaryText}>Dernier Quizz - 50%</ContainerParagraph>
                        <ContainerTitle style={styles.secondaryText}>Jardin</ContainerTitle>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <SvgXml xml={svgIcon} width="24" height="24" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#D7D9EC",
        minHeight: 80,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        flexWrap: 'wrap',

    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,

    },
    textContainer: {
        marginLeft: 10,
    },
    primaryText: {
        color: 'gray',
    },
    secondaryText: {
        fontWeight: 'bold',
    },
});

export default CustomComponent;
