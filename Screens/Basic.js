import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from "formik";
import {isValid, format} from "date-fns";
import {TextInput, HelperText} from 'react-native-paper';
import { noteTypesText } from '../Global/noteType';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import globalvariable from '../Global/globalvariable';

const doseUnits = [
    {label: "gm", value: "gm"},
    {label: "ml", value: "ml"}
]

const Basic = ({mpiData}) => {
    // const [isOtherDrug, setIsOtherDrug] = useState(false);//if the Drug is not in list
    const {values, handleChange, errors, handleBlur, touched, setFieldValue} = useFormikContext();
    const [checked, setChecked] = useState(false)

    useEffect(()=>{
        console.log("MPI DATA IS"+mpiData);
        console.log(values.noteType);
    },[])
    // let data = mpiData

    // const isReadOnly = (value) => {
    //     return value !== null && value !== "";
    // }

    const getError = (field) => {
        return (touched && touched.patientDetails && touched.patientDetails[field])
            ? errors && errors.patientDetails ? errors.patientDetails[field] : undefined
            : undefined
    }

    const isError = (field) => {
        return (touched && touched.patientDetails && touched.patientDetails[field]) && errors && errors.patientDetails && (errors.patientDetails[field] !== undefined);
    }

    return(
        <View style={{flex:1}}>
            <Image style={{
                        height:'10%',
                        width:'100%',
                        resizeMode:'contain'
                }}
                       source={require('../Images/logo.png')}      
            />
            <View style={{flex:1, flexDirection:'row'}}>
                {/* <TouchableOpacity style={styles.backbutton}
                        onPress={() => navigation.pop()}
                        >
                        <Ionicons   style={{
                                    alignSelf:'center'
                        }}
                                    name='arrow-back' 
                                    size={20} 
                                    color='black'
                        >
                        </Ionicons>
                        <Text       style={{
                                    color:'black',
                                    marginLeft:10,
                                    alignSelf:'center',
                                    fontSize:16,
                                    }}>
                                BACK
                        </Text>
                    </TouchableOpacity> */}
                    <View style={{flexDirection:'row',marginLeft:80}}>
                    <MaterialCommunityIcons style={{alignSelf:'center',marginTop:25,marginLeft:50}}
                     name='account-outline' size={35} color='#026DA9'>
                    </MaterialCommunityIcons>
                    <Text style={{alignSelf:'center',marginTop:25,fontSize:22}}>
                        {mpiData.firstname}{mpiData.lastname}
                    </Text>
                    </View>
            </View>
            <Text style={styles.bannertext}>BASIC DETAILS</Text>
            <ScrollView>
                <View style={{marginTop:20,flexDirection:'column'}}>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>First Name *</Text>
                        </View>

                        <TextInput style={styles.textInput}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="FirstName"
                            value={values.patientDetails.firstname}
                            editable={false}
                        /> */}

                        <TextInput style={styles.textInput}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="First Name *"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.firstname")}
                            onBlur={handleBlur("patientDetails.firstname")}
                            value={values.patientDetails.firstname}
                            error={isError("firstname")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("firstname") ? true : false}
                        >
                            {getError("firstname")}
                        </HelperText> 

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>Last Name *</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.lastname} editable={false}/>
                         */}

                        <TextInput style={styles.textInput}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="Last Name *"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.lastname")}
                            onBlur={handleBlur("patientDetails.lastname")}
                            value={values.patientDetails.lastname}
                            error={isError("lastname")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("lastname") ? true : false}
                        >
                            {getError("lastname")}
                        </HelperText>
                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>MPI Number *</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.mpi} editable={false}/>
                         */}

                        <TextInput style={styles.textInput}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="MPI Number *"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.mpi")}
                            onBlur={handleBlur("patientDetails.mpi")}
                            value={values.patientDetails.mpi}
                            error={isError("mpi")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("mpi") ? true : false}
                        >
                            {getError("mpi")}
                        </HelperText>

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>DOB *</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.dob} editable={false}/> */}

                        <TextInput style={styles.textInput}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="DOB *"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.dob")}
                            onBlur={handleBlur("patientDetails.dob")}
                            value={format(new Date(values.patientDetails.dob), "MM/dd/yyyy")}
                            error={isError("dob")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("dob") ? true : false}
                        >
                            {getError("dob")}
                        </HelperText>

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>Primary Diagnosis *</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.primaryDiagnosis.diseaseDesc} editable={false}/> */}
                    
                        <TextInput style={styles.textInput}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="Primary Diagnosis"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.primaryDiagnosis.diseaseDesc")}
                            onBlur={handleBlur("patientDetails.primaryDiagnosis.diseaseDesc")}
                            value={values.patientDetails.primaryDiagnosis.diseaseDesc}
                            error={isError("primaryDiagnosis.diseaseDesc")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("primaryDiagnosis.diseaseDesc") ? true : false}
                        >
                            {getError("primaryDiagnosis.diseaseDesc")}
                        </HelperText>

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>Secondary Diagnosis *</Text>
                        </View>
                        <TextInput style={[styles.textInput]} value={mpiData.secondaryDiagnosis.diseaseDesc} editable={ mpiData.secondaryDiagnosis.diseaseDesc !== "" ? false : true} multiline={true}/> */}

                        <TextInput style={[styles.textInput, {marginBottom: 24}]}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="ICD10:"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.primaryDiagnosis.icdCode")}
                            onBlur={handleBlur("patientDetails.primaryDiagnosis.icdCode")}
                            value={values.patientDetails.primaryDiagnosis.icdCode}
                        />

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>ICD10:</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.primaryDiagnosis.icdCode} editable={false}/> */}

                        <TextInput style={styles.textInput}
                            editable={values.patientDetails.secondaryDiagnosis.diseaseDesc !== "" ? false : true}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="Secondary Diagnosis"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.secondaryDiagnosis.diseaseDesc")}
                            onBlur={handleBlur("patientDetails.secondaryDiagnosis.diseaseDesc")}
                            value={values.patientDetails.secondaryDiagnosis.diseaseDesc}
                            error={isError("secondaryDiagnosis.diseaseDesc")}
                        />
                        <HelperText 
                            type="error"
                            visible={isError("secondaryDiagnosis.diseaseDesc") ? true : false}
                        >
                            {getError("secondaryDiagnosis.diseaseDesc")}
                        </HelperText>

                    </View>
                    <View style={styles.container}>
                        {/* <View style={styles.labelContainer}>
                            <Text style={{color:'gray'}}>ICD10:</Text>
                        </View>
                        <TextInput style={styles.textInput} value={mpiData.secondaryDiagnosis.icdCode} editable={false} />
                         */}

                        <TextInput  style={[styles.textInput, {marginBottom: 24}]}
                            editable={false}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="ICD10:"
                            autoCapitalize="none"
                            onChangeText={handleChange("patientDetails.secondaryDiagnosis.icdCode")}
                            onBlur={handleBlur("patientDetails.secondaryDiagnosis.icdCode")}
                            value={values.patientDetails.secondaryDiagnosis.icdCode}
                        />

                    </View>

                    {
                        noteTypesText.MONOCLONAL_ANTIBODY === values.noteType ?
                            <View style={{ height: 300 }}>
                                <Text>Drug</Text>
                                <View>
                                    {checked === !false ?
                                        <View>
                                            <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Select Drug</Text>
                                            {/* <Picker
                                                style={{borderColor:'black',height:40,borderWidth:1,width:'90%'}}
                                                selectedValue={selectedVal}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    {setSelectedVal(itemValue); setFieldValue('medication.drugMedication.drugName', itemValue)}
                                                }>
                                                {
                                                    globalvariable.drugList.map((item, i) => (
                                                        <Picker.Item key={i} label={item.text} value={item.text} />
                                                    ))
                                                }
                                            </Picker> */}
                                            <DropDownPicker 
                                                style={{
                                                    borderWidth:1,
                                                    borderColor:'black',
                                                    height:40,
                                                    width:360,
                                                    justifyContent:'space-evenly',
                                                    alignItems:'center',
                                                    alignSelf:'center',
                                                    marginTop: 12
                                                }}
                                                items={globalvariable.drugList}
                                                defaultValue={"Select Drug"}
                                                value={values.medication.drugMedication.doseUnit}
                                            >
                                            </DropDownPicker>
                                        </View>

                                    :
                                        <TextInput style={styles.newTextInput}
                                            mode="outlined"
                                            outlineColor="#026DA9"
                                            label="Type Drug Name"
                                            autoCapitalize="none"
                                            onChangeText={handleChange("medication.drugMedication.drugName")}
                                            onBlur={handleBlur("medication.drugMedication.drugName")}
                                            value={values.medication.drugMedication.drugName}
                                            
                                        />
                                    }
                                </View>
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginLeft:15,marginTop:15}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text="Drug not on list"
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:0 }}
                                    onPress={(checked) => {
                                        console.log(checked)
                                        setChecked(!checked)
                                    }}
                                />

                                <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',alignItems:'center',height:50}}>

                                    <TextInput style={styles.textInput2}
                                        mode="outlined"
                                        outlineColor="#026DA9"
                                        label="Dose"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("medication.drugMedication.dose")}
                                        onBlur={handleBlur("medication.drugMedication.dose")}
                                        value={values.medication.drugMedication.dose}
                                        
                                    />


                                    <DropDownPicker 
                                        style={{
                                            borderWidth:1,
                                            borderColor:'black',
                                            maxHeight:40,
                                            width:65,
                                            justifyContent:'space-evenly',
                                            alignItems:'center',
                                            alignSelf:'center',
                                            marginLeft:20
                                        }}
                                        items={doseUnits}
                                        defaultValue={"gm"}
                                        value={values.medication.drugMedication.doseUnit}
                                    >
                                    </DropDownPicker>
                                </View>
                            </View>
                        :   null
                    }
                </View>
                {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.previous} 
                                    onPress={() => navigation.pop()}>
                        <Text style={{color:'black',fontSize:16,textAlign:'center'}}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.next} 
                                    onPress={() => navigation.navigate('Assessment',{
                                        mpiData:data
                                    })}>
                        <Text style={{color:'black',fontSize:16,textAlign:'center'}}>Next</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </View>
    )
};

export default Basic;

const styles = StyleSheet.create({

    textInput: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: 'gray',
        justifyContent: 'space-evenly',
        height: 60,
        borderRadius: 5,
        marginRight:10,
        marginLeft:10, 
        color:'black'
    },

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

    backbutton: {
        flexDirection:'row',
        backgroundColor:'#e0e0e0',
        opacity:0.8,
        width:100,
        height:35,
        marginLeft:10,
        marginTop:25,
        justifyContent:'center',
        borderRadius:5
    },
    previous: {
        backgroundColor:'#ACD576',
        width:140,
        height:35,
        marginTop:20,
        borderRadius:5,
        justifyContent:'space-evenly',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginLeft:10
    },
    next: {
        backgroundColor:'#ACD576',
        width:140,
        height:35,
        marginTop:20,
        borderRadius:5,
        justifyContent:'space-evenly',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginRight:10
    },
    bannertext: {
        backgroundColor:'#026DA9',
        textAlign:'center',
        fontSize:30,color:'white',
        marginTop:10,
        fontWeight:'bold'
    },
    textInput2: {
        marginLeft:10,         
        height:55,
        width:'95%',
        borderRadius: 5,
        color:'black',
        position:'absolute',
        justifyContent:'center',
    },
    newTextInput: {
        marginLeft:10,         
        height:55,
        width:'95%',
        borderRadius: 5,
        color:'black',
        justifyContent:'center',
    }
})