/**
 * @file PatientDetails.js
 * @author Emre Deniz (301371047)
 * @author Muindo Gituku (301372521)
 * @date Nov 11, 2023
 * @description React Native Project
 */

import * as React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList } from "react-native";
import { useState, useEffect } from 'react'

export default function PatientDetails({ route, navigation }) {
    // State hooks
    const [patientName, setPatientName] = React.useState('');
    const [patientStatus, setPatientStatus] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [doctor, setDoctor] = React.useState('');
    const [patientTests, setPatientTests] = React.useState('')

    // API server URL
    const apiUrl = "http://10.0.0.238:3000"

    // Get patient id from navigation
    var patient_id = route.params.patient_id;

    // Get patient details from API
    const getAllPatientDetailsFromAPI = async() => {
        await fetch(apiUrl+"/patients/"+patient_id).
        then((response) => response.json()).
        then((json) => {
            setPatientName(json.first_name+" "+json.last_name)
            setPatientStatus(json.status)
            setDateOfBirth(json.date_of_birth)
            setAddress(json.address)
            setDepartment(json.department)
            setDoctor(json.doctor)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // Get tests belongs to the patient from API
    const getAllTestsForPatientFromAPI = async()=>{
        await fetch(apiUrl+"/patients/"+patient_id+"/tests")
        .then((response)=>response.json())
        .then((json)=>{
            setPatientTests(json.reverse());
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // Call while page loading to fetch patient details
    useEffect(() => {
        getAllPatientDetailsFromAPI();
        getAllTestsForPatientFromAPI();
    }, []);

    // "Refresh" button actions
    function onClickRefreshButton() {
        getAllPatientDetailsFromAPI();
        getAllTestsForPatientFromAPI();
        listAllTestsForPatient();
    };

    // "Delete" button actions
    function onClickDeleteTestButton(test_record_id){

    }

    // Define list of tests that belongs to the patient
    var patientTestsList = [];
    function listAllTestsForPatient() {
        if (patientTests.length == 0) {
            patientTestsList.push(
                <View key = {0} style={{justifyContent:'center',alignItems:'center',}}>
                    <Text style={styles.textStyle}>No tests yet</Text>
                </View>
            )
        }
        else {
            for (let i = 0; i < patientTests.length; i++) {
                // Allow user to update the latest test
                if (i == 0) {
                    patientTestsList.push(
                        <View key = {i} style={styles.medicalHistoryWrapper}>
                            <View style={styles.medicalHistoryContainer}>
                                <Text style={{fontWeight:'900', fontSize:16}}>{patientTests[i].category}</Text>
                                <Text>{patientTests[i].nurse_name}</Text>
                                <Text>{patientTests[i].date}</Text>
                                <View style={styles.medicalHistoryTest}>
                                    <Text style={{color:'black',fontSize:14}}>Reading:</Text>
                                    <Text style={{fontSize:14,fontWeight:'bold',paddingLeft:5}}>{patientTests[i].readings}</Text>
                                </View>
                            </View>
                            <View style={styles.medicalHistoryButtons}>
                                <TouchableOpacity onPress={() => navigation.navigate('UpdateTestRecord', {patient_id: patientTests[i].patient_id, test_id: patientTests[i]._id})} style={{marginRight:20}}>
                                    <Image source={require("../img/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClickDeleteTestButton(patientTests[i]._id)}>
                                    <Image source={require("../img/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                else {
                    patientTestsList.push(
                        <View key = {i} style={styles.medicalHistoryWrapper}>
                            <View style={styles.medicalHistoryContainer}>
                                <Text style={{fontWeight:'900', fontSize:16}}>{patientTests[i].category}</Text>
                                <Text>{patientTests[i].nurse_name}</Text>
                                <Text>{patientTests[i].date}</Text>
                                <View style={styles.medicalHistoryTest}>
                                    <Text style={{color:'black',fontSize:14}}>Reading:</Text>
                                    <Text style={{fontSize:14,fontWeight:'bold',paddingLeft:5}}>{patientTests[i].readings}</Text>
                                </View>
                            </View>
                            <View style={styles.medicalHistoryButtons}>
                                <TouchableOpacity onPress={onClickDeleteTestButton(patientTests[i]._id)}>
                                    <Image source={require("../img/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            }
        }
    }

    // Call while page loading to list tests
    listAllTestsForPatient();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.wrapper}>
                {/* Patient details*/}
                <View style={styles.patientProfile}>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Image style={{marginTop: 10}} source={require("../img/user_icon.png")}></Image>
                        <TouchableOpacity
                            style={[styles.buttonLeft, {marginLeft: -10, marginTop: 5}]}
                            onPress = {onClickRefreshButton}>
                            <Image source={require('../img/refresh.png')} style={[{width: 33}, {height: 33}]} />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingRight: 30}}>
                        <Text style={{fontWeight:'bold',fontSize:22}}>{patientName}</Text>
                        {patientStatus == "Normal" && <Text style={{fontWeight:'bold', fontSize:14, color: "green"}}>{patientStatus}</Text>}
                        {patientStatus == "Critical" && <Text style={{fontWeight:'bold', fontSize:14, color: "red"}}>{patientStatus}</Text>}
                        <Text style={{fontWeight:'normal',fontSize:14}}>Date of Birth: {dateOfBirth}</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Address: {address}</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Department: {department}</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Doctor: {doctor}</Text>
                    </View>
                </View>

                {/* Update Patient and Add Test Record buttons */}
                <View style={styles.rectangleButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdatePatient', {patient_id: patient_id})} style={styles.updateButton}>
                        <Text style={{fontWeight:'bold',fontSize:14,color:"#fff"}}>Update Patient</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddTestRecord', {patient_id: patient_id})} style={styles.addButton}>
                        <Text style={{fontWeight:'bold',fontSize:14,}}>Add Test Record</Text>   
                    </TouchableOpacity>
                </View>

                {/* List of Tests */}
                {patientTestsList}
            </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

// Style definitions
const styles = StyleSheet.create({
    container: {
        alignItems: "left"
    },
    wrapper: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    patientProfile:{
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems:'flex-start',
        marginBottom:20,
    },
    medicalHistoryWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        padding:10,
        marginBottom:15,
        borderRadius: 0,
        borderColor: 'black',
    },
    medicalHistoryTest:{
        flexDirection:'row',
        alignItems:'center',
    },
    medicalHistoryButtons:{
        width:'22%',
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    rectangleButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:25,
    },
    updateButton:{
        backgroundColor: "#3B80C8",
        borderColor:"#3B80C8",
        borderWidth:2,
        padding:13,
    },
    addButton:{
        backgroundColor: "transparent",
        padding:13,
        borderColor:"#3B80C8",
        borderWidth:2
    },
    buttonLeft: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: 'center',
        borderRadius: 0,
        marginTop: 30
    }
});
