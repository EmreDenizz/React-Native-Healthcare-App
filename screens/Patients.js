/**
 * @file Patients.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { useState } from 'react'

export default function Patients({navigation}) {
    // State hooks
    const [search, setSearch] = React.useState('');

    // View button action
    function onClickViewButton() {
        
    };

    return (
        <SafeAreaView style = {styles.container}>
            <Button
                title="Update Patient" 
                onPress={() => navigation.navigate('UpdatePatient')}
            />
            <Button
                title="Add Test Record" 
                onPress={() => navigation.navigate('AddTestRecord')}
            />
            <Button
                title="Update Test Record" 
                onPress={() => navigation.navigate('UpdateTestRecord')}
            />
            <View style = {styles.wrapper}>

                {/* Logo, Header, Add Icon */}
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image source={require('../img/logoSmall.png')} style={[{width: 50}, {height: 50}]} />
                    </View>
                    <View>
                        <Text style={styles.header}>Patients</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddPatient')}
                            style={[{marginTop: 7}, {position: 'absolute'}, {left: 140}]}>
                            <Image
                                source={require('../img/add.png')}
                                style={[{width: 40}, {height: 40}, {marginTop: 7}]} />
                        </TouchableOpacity>
                    </View>
                </View>
                        
                {/* Quick filter buttons */}
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonLeft, {backgroundColor: '#3B80C8'}]}
                            onPress = {onClickViewButton}>
                            <Text style={[{color: 'white'}, {fontSize: 22}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>All</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonLeft, {backgroundColor: 'red'}, {marginLeft: 10}]}
                            onPress = {onClickViewButton}>
                            <Text style={[{color: 'white'}, {fontSize: 22}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>Critical</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search */}
                <TextInput
                    style = {styles.inputStyle}
                    value = {search}
                    onChangeText = {text => setSearch(text)}
                    placeholder = {"Search"}
                />

                {/* List of Patients */}
                <View style={styles.wrapperElement}>
                    <View>
                        <Text style={styles.subHeader}>Lisa Miles</Text>
                        <Text style={{color: "#3B80C8"}}>Neurology</Text>
                        <Text>Dr. Melinda Binder</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonRight, {backgroundColor: '#3B80C8'}]}
                            onPress={() => navigation.navigate('PatientDetails', "ID")}>
                            <Text style={[{color: 'white'}, {fontSize: 22}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>View</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </SafeAreaView>
    );
}

// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
        // justifyContent: 'center',
    },
    wrapper: {
        padding: 30,
    },
    wrapperElement: {
        height: 95,
        width: 330,
        padding: 10,
        marginTop: 20,
        color: "black",
        borderRadius: 0,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: "flex-start",
        flexDirection: 'row'
    },
    header: {
        fontSize: 26,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    inputStyle: {
        fontSize: 20,
        padding: 10,
        marginTop: 20,
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
        backgroundColor: '#3B80C8',
        borderRadius: 0,
        width: 90
    },
    buttonRight: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        backgroundColor: '#3B80C8',
        borderRadius: 0,
        width: 80,
        position: 'absolute',
        marginTop: 12,
        left: 110
    },
    buttonLeft: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: 'center',
        borderRadius: 0,
        marginTop: 30
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
