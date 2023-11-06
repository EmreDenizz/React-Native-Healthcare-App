/**
 * @file Patients.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'

export default function Patients({navigation}) {
    // State hooks
    const [search, setSearch] = React.useState('');
    const [patients, setPatients] = React.useState('');

    // Get all patients from API
    const getAllPatientsFromAPI = async() => {
        await fetch("http://10.0.0.238:3000/patients").
        then((response) => response.json()).
        then((json) => {
            setPatients(json)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // Get cirtical patients from API
    const getCriticalPatientsFromAPI = async() => {
        await fetch("http://10.0.0.238:3000/patients/critical").
        then((response) => response.json()).
        then((json) => {
            setPatients(json)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // Patient list to display
    var patientsList = [];

    // List of All Patients
    function listAllPatients() {
        for(let i = 0; i < patients.length; i++){
            if(patients[i].status == "Critical"){
                patientsList.push(
                    <View key = {i} style={styles.wrapperElement}>
                        <View style={{width: 215}}>
                            <Text style={styles.subHeader}>{patients[i].first_name+" "+patients[i].last_name}</Text>
                            <Text style={{color: "#3B80C8"}}>{patients[i].department}</Text>
                            <Text>{patients[i].doctor}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.buttonRight, {backgroundColor: 'red'}]}
                                onPress={() => navigation.navigate('PatientDetails', patients[i]._id)}>
                                <Text style={[{color: 'white'}, {fontSize: 18}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            else{
                patientsList.push(
                    <View key = {i} style={styles.wrapperElement}>
                        <View style={{width: 215}}>
                            <Text style={styles.subHeader}>{patients[i].first_name+" "+patients[i].last_name}</Text>
                            <Text style={{color: "#3B80C8"}}>{patients[i].department}</Text>
                            <Text>{patients[i].doctor}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.buttonRight, {backgroundColor: '#3B80C8'}]}
                                onPress={() => navigation.navigate('PatientDetails', patients[i]._id)}>
                                <Text style={[{color: 'white'}, {fontSize: 18}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
    }

    // "All" button actions
    function onClickAllButton() {
        getAllPatientsFromAPI();
        listAllPatients();
    };

    // "Critical" button actions
    function onClickCriticalButton() {
        getCriticalPatientsFromAPI();
        listAllPatients();
    };

    // Call these functions while page loading to fetch patiets and display them
    useEffect(() => {
        getAllPatientsFromAPI();
    }, []);
    listAllPatients();

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView style = {styles.wrapper}>

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
                            onPress = {onClickAllButton}>
                            <Text style={[{color: 'white'}, {fontSize: 18}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>All</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonLeft, {backgroundColor: 'red'}, {marginLeft: 10}]}
                            onPress = {onClickCriticalButton}>
                            <Text style={[{color: 'white'}, {fontSize: 18}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>Critical</Text>
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
                {patientsList}

                <Text>{"\n"}{"\n"}{"\n"}</Text>
            </ScrollView>

        </SafeAreaView>
    );
}

// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
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
        flexDirection: 'row',
        flex: 2,
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
        width: 60,
        position: "absolute",
        marginTop: 15,
        left: 30
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
