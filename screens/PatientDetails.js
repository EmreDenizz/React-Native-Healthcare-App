/**
 * @file PatientDetails.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList } from "react-native";
import { useState } from "react";

export default function PatientDetails({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Patient details*/}
                <View style={styles.patientProfile}>
                    <Image style={{marginTop: 20}} source={require("../img/user_icon.png")}></Image>
                    <View style={styles.patientDetails}>
                        <Text style={{fontWeight:'bold',fontSize:22}}>Eddie Miles</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Date of Birth: 1998-11-09</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Address: 94 Progress Avenue, Toronto M1B 1R2</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Department: Emergency Response</Text>
                        <Text style={{fontWeight:'normal',fontSize:14}}>Doctor: Meredith Greey</Text>
                    </View>
                </View>

                {/* Update Patient and Add Test Record buttons */}
                <View style={styles.rectangleButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdatePatient')} style={styles.updateButton}>
                        <Text style={{fontWeight:'bold',fontSize:14,color:"#fff"}}>Update Patient</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddTestRecord')} style={styles.addButton}>
                        <Text style={{fontWeight:'bold',fontSize:14,}}>Add Test Record</Text>   
                    </TouchableOpacity>
                </View>

                {/* List of Tests */}
                {singleMedicalRecord(navigation)}
                {singleMedicalRecord(navigation)}
                {singleMedicalRecord(navigation)}
                {singleMedicalRecord(navigation)}
            </View>
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
    }
});

// Function for listing records
function singleMedicalRecord(navigation) {
    return <View style={styles.medicalHistoryWrapper}>
                <View style={styles.medicalHistoryContainer}>
                    <Text style={{fontWeight:'900', fontSize:16}}>Blood Pressure</Text>
                    <Text>Nurse David McRoe</Text>
                    <View style={styles.medicalHistoryTest}>
                        <Text style={{textTransform:'uppercase',color:'black',fontSize:14}}>70/150:</Text>
                        <Text style={{textTransform:'uppercase',color:'green',fontSize:14,fontWeight:'900',paddingLeft:5,}}>Impressive</Text>
                    </View>
                    <Text>2023-10-25</Text>
                </View>
                <View style={styles.medicalHistoryButtons}>
                    {/* <TouchableOpacity>
                        <Image source={require("../img/expand.png")}></Image>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateTestRecord')}>
                        <Image source={require("../img/edit.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../img/delete.png")}></Image>
                    </TouchableOpacity>
                </View>
    </View>;
}
