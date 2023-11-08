/**
 * @file PatientDetails.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
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
    const [patientTests, setPatientTests] = React.useState([])

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

    const getAllTestsForPatientFromAPI = async()=>{
        await fetch(apiUrl+"/patients/"+patient_id+"/tests")
        .then((response)=>response.json())
        .then((json)=>{
            setPatientTests(json);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    function onClickDeleteTestButton(test_record_id){
        //  fetch(apiUrl+"tests/"+test_record_id, {method:'DELETE'})
        // .then(()=>getAllTestsForPatientFromAPI());
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
    };

    return (
        <SafeAreaView style={styles.container}>
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
                    <View style={styles.patientDetails}>
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
                <FlatList
                    data={patientTests.reverse()}
                    renderItem={(test)=>{
                        return singleMedicalRecord(navigation, test.item.category, test.item.nurse_name, test.item.date, test.item.readings, test.item._id)
                    }}
                />
            </View>
        </SafeAreaView>
    );

    function singleMedicalRecord(navigation, testCategory, nurse_name, testDate, testReading, test_record_id) {
        return <View style={styles.medicalHistoryWrapper}>
                    <View style={styles.medicalHistoryContainer}>
                        <Text style={{fontWeight:'900', fontSize:16}}>{testCategory}</Text>
                        <Text>{nurse_name}</Text>
                        <Text>{testDate}</Text>
                        <View style={styles.medicalHistoryTest}>
                            <Text style={{color:'black',fontSize:14}}>Reading:</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',paddingLeft:5}}>{testReading}</Text>
                        </View>
                    </View>
                    <View style={styles.medicalHistoryButtons}>
                        <TouchableOpacity onPress={() => navigation.navigate('UpdateTestRecord', {patient_id: patient_id, test_id: test_record_id})}>
                            <Image source={require("../img/edit.png")}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClickDeleteTestButton(test_record_id)}>
                            <Image source={require("../img/delete.png")}></Image>
                        </TouchableOpacity>
                    </View>
        </View>;
    }

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
        justifyContent:'left',
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
        justifyContent:'space-between',
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
    },
});
