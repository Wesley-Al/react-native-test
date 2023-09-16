import * as React from 'react';
import { TouchableOpacity as Button, StyleSheet, TextInput } from 'react-native';
import { Text } from '../components/Themed';

export default (props: { onPress: (index: number) => void, index: number, text: string, backGroundColor: string, width: number }) => {
    const handlePress = () => {
        if (props.onPress != undefined) {
            props.onPress(props.index);
        }
    };

    return (
        <Button style={[styles.button, { backgroundColor: props.backGroundColor, width: props.width }]} onPress={handlePress}><Text style={styles.text}>{props.text}</Text></Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 2
    },
    text: {
        fontSize: 10, textTransform: "uppercase",
        color: "white",
        textAlign: "center"
    }
});
