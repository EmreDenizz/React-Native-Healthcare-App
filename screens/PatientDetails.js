/**
 * @file PatientDetails.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";
import AddTestRecord from "./AddTestRecord";

export default function PatientDetails({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.patientProfile}>
          <Image source={require("../img/user_icon.png")}></Image>
          <View style={styles.patientDetails}>
            <Text style={styles.nameStyle}>John Doe</Text>
            <Text>Date of Birth: Oct 7, 2023</Text>
            <Text>Address: 941 Progress Avenue, Toronto M1B 1R2</Text>
            <Text>Department: Emergency Response</Text>
            <Text>Doctor: Meredith Greey</Text>
          </View>
        </View>
        {singleMedicalRecord(navigation)}
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
    alignItems: "left",
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
    marginBottom:40,
  },
  medicalHistoryWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:1,
    borderRadius:15,
    padding:10,
    marginBottom:15,
  },
  medicalHistoryTest:{
    flexDirection:'row',
  },
  medicalHistoryButtons:{
    width:'35%',
    flexDirection:'row',
    justifyContent:'space-between',
  }
});
function singleMedicalRecord(navigation) {
    return <View style={styles.medicalHistoryWrapper}>
        <View style={styles.medicalHistoryContainer}>
            <Text>Blood Pressure</Text>
            <Text>Nurse David McRoe</Text>
            <View style={styles.medicalHistoryTest}>
                <Text>70/150:</Text>
                <Text>Impressive</Text>
            </View>
        </View>
        <View style={styles.medicalHistoryButtons}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddTestRecord')}>
                <Image source={require("../img/expand.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require("../img/edit.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require("../img/delete.png")}></Image>
            </TouchableOpacity>
        </View>
    </View>;
}

