import {StyleSheet} from 'react-native';

// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    wrapper: {
        // borderWidth: 2,
        // borderColor: 'black',
        // borderRadius: 10
        padding: 30,
    },
    header: {
        fontSize: 26,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputStyle: {
        fontSize: 20,
        padding: 10,
        marginTop: 10,
        height: 55,
        width: 330,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 0
    },
    button: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        borderRadius: 0,
        width: 330
    },
    output: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 10
    },
    explanations: {
        fontSize: 20,
        marginTop: 5
    }
});

module.exports = styles;
