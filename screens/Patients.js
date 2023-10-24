/**
 * @file Patients.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react'

export default function Patients({navigation}) {
    return (
        <View> 
            <Button
                title="Add Patient" 
                onPress={() => navigation.navigate('AddPatient')}
            />
            <Text>{"\n"}</Text>
            <Button
                title="Update Patient" 
                onPress={() => navigation.navigate('UpdatePatient')}
            />
            <Text>{"\n"}</Text>
            <Button
                title="Patient Details" 
                onPress={() => navigation.navigate('PatientDetails')}
            />
            <Text>{"\n"}</Text>
            <Button
                title="Add Test Record" 
                onPress={() => navigation.navigate('AddTestRecord')}
            />
            <Text>{"\n"}</Text>
            <Button
                title="Update Test Record" 
                onPress={() => navigation.navigate('UpdateTestRecord')}
            />
        </View> 
    );
}
