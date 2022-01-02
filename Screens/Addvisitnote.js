import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axiosInstance from './Api/APIConfig'
import globalvariable from '../Global/globalvariable'
import {Formik} from "formik";
import {TextInput, HelperText} from 'react-native-paper';

const Addvisitnote = ({navigation}) => {
    
    // const [mpi,setMpi] = useState("")

    return(
        <View style={{flex:1}}>
            <Image style={{
                    height:'10%',
                    width:'100%',
                    resizeMode:'contain'
                }}
                    source={require('../Images/logo.png')}
            />
            <Text style={{
                    marginTop:20,
                    alignSelf:'center',
                    fontSize:20
            }}
            >New Patient Record? Add MPI.
            </Text>
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Text style={{color:'#026DA9'}}>MPI*</Text>
                </View>
                <Formik
                    initialValues={{
                        mpi: ""
                    }}
                    onSubmit={(values, formikHelpers) => {
                        // formikHelpers.setStatus(null);
                        axiosInstance({
                            method: "GET",
                            headers:{
                                "Content-Type": "application/json",
                                authorization: `Bearer ${globalvariable.token}`
                            },
                            url: `/patient?mpi=${values.mpi}`
                        }).then(async ({data}) => {
                            globalvariable.alldata.push(data)
                            navigation.navigate('AssessmentPage',{
                                mpiData: data
                            })
                        }).catch(e => {
                            // formikHelpers.setStatus({error: e.message});
                            formikHelpers.setSubmitting(false);
                        })
                    }}
                >
                    {({values, handleChange, handleSubmit, status, isSubmitting}) => (
                        <View>
                            <TextInput style={styles.textInput}
                                mode="outline"
                                underlineColor="#fff"
                                onChangeText={handleChange('mpi')} 
                                value={values.mpi}
                                // error={status && (status.error !== undefined)}
                            />
                            {/* <HelperText 
                                type="error"
                                visible={status && (status.error !== undefined) ? status.error : " "}
                            >
                                {status.error}
                            </HelperText> */}
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.backbutton}
                                    onPress={() => navigation.pop()}
                                    >
                                    <Ionicons   style={{
                                                alignSelf:'center'
                                    }}
                                                name='arrow-back' 
                                                size={20} 
                                                color='#026DA9'
                                    >
                                    </Ionicons>
                                    <Text       style={{
                                                color:'#026DA9',
                                                marginLeft:10,
                                                alignSelf:'center',
                                                fontSize:16}}>
                                            BACK
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit} 
                                                >
                                    <Text style={{color:'#FFFFFF',marginLeft:15}}>
                                        {isSubmitting ? <ActivityIndicator color="#fff" size="small" /> : "Submit & Proceed"}
                                    </Text>
                                    <AntDesign name='arrowright' size={20} color='white'></AntDesign>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
                
            </View>
            {/* <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.backbutton}
                    onPress={() => navigation.pop()}
                    >
                    <Ionicons   style={{
                                alignSelf:'center'
                    }}
                                name='arrow-back' 
                                size={20} 
                                color='#026DA9'
                    >
                    </Ionicons>
                    <Text       style={{
                                color:'#026DA9',
                                marginLeft:10,
                                alignSelf:'center',
                                fontSize:16}}>
                             BACK
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitbutton} onPress={() => getpatientbympi()} 
                                >
                    <Text style={{color:'#FFFFFF',marginLeft:15}}>SUBMIT & PROCEED</Text>
                    <AntDesign name='arrowright' size={20} color='white'></AntDesign>
                </TouchableOpacity>
            </View> */}
        </View>

    )

    // function getpatientbympi() {
    //     axiosInstance({
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             authorization: `Bearer ${globalvariable.token}`
    //         },
    //         url: `patient?mpi=${mpi}`
    //     }).then(response => {
    //       console.log(response.data)
    //       globalvariable.alldata.push(response.data)
    //       navigation.navigate('Note',{
    //           mpiData:response.data
    //       })
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })
    // }

};

export default Addvisitnote;

const styles = StyleSheet.create({
    container: {
      height: 55, 
      position: 'relative',
      marginTop:20
    },
    labelContainer: {
      position: 'absolute',
      backgroundColor:'#FFFFFF',
      opacity:0.9,
      top: -15,
      left: 30,
      padding: 5,
      zIndex: 50,
    },
    textInput: {
        // flex: 1, 
        borderWidth: 2, 
        borderColor: '#026DA9',
        // justifyContent: 'flex-end',
        // height: 35,
        borderRadius: 5,
        marginRight:16,
        marginLeft:16,  
    },
    backbutton: {
        borderWidth:1,
        flexDirection:'row',
        borderColor:'#026DA9',
        width:100,
        height:40,
        marginLeft:20,
        marginTop:25,
        justifyContent:'center',
        borderRadius:5
    },
    submitbutton: {
        backgroundColor:'#026DA9',
        width:180,
        height:40,
        marginTop:25,
        marginLeft:75,
        paddingRight:10,
        borderRadius:5,
        justifyContent:'space-evenly',
        flexDirection:'row',
        alignItems:'center'
    }
  })

