import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from "formik";
import { accessTypes, heparinUnits } from '../Global/formData';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import globalvariable from '../Global/globalvariable';
import {TextInput, HelperText} from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Picker} from '@react-native-picker/picker';

const radioButtonsData = [
    {
    id: '1', 
    label: 'IV Peripheral',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'IV Central',
    color:'#026DA9'
    },
    {
    id : '3',
    label : 'SC',
    color:'#026DA9'
    }
]

const accessDeviceFlushRadio = [
    {
    id: '1', 
    label: 'heparin',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'sodium chloride 0.9%',
    color:'#026DA9'
    }
]

const numberOfLumens = [
    {
        id: '1', 
        label: '1',
        color:'#026DA9'
    }, 
    { 
        id: '2',
        label: '2',
        color:'#026DA9'
    },
    {
        id: '3',
        label: '3',
        color:'#026DA9'
    }
]

const location = [
    {id: "left", text: "Left"},
    {id: "right", text: "Right"},
    {id: "hand", text: "Hand"},
    {id: "forearm", text: "Forearm"},
    {id: "antecubital", text: "Antecubital"},
];

const accessTypeOptions = [
    {id: "centralLine", text: "Central Line"},
    {id: "picc", text: "PICC"},
    {id: "port", text: "Port"},
    {id: "tunneled", text: "Tunneled"},
];

const catheterInformationStatus = [
    {
        text: 'Flushes without resistance',
        id: 'flushesWithoutResistance',
    }, {
        text: 'Positive blood return',
        id: 'positiveBloodReturn'
    }, {
        text: 'Flushed per protocol/orders',
        id: 'flushedPerProtocol'
    }
];

const siteAssessment = [
    {
        text: 'Normal',
        id: 'normal'
    }, {
        text: 'Pain',
        id: 'pain'
    }, {
        text: 'Redness',
        id: 'redness'
    }, {
        text: 'Swelling',
        id: 'swelling'
    }, {
        text: 'Flare/Streaking',
        id: 'flareStreaking'
    }, {
        text: 'Irritation',
        id: 'irritation'
    }, {
        text: 'Infiltration',
        id: 'infiltration'
    }
];

const siteAssessmentForSubQ = [
    {
        text: 'Normal',
        id: 'normal'
    }, {
        text: 'Pain',
        id: 'pain'
    }, {
        text: 'Redness',
        id: 'redness'
    }, {
        text: 'Swelling',
        id: 'swelling'
    }, {
        text: 'Itching',
        id: 'itching'
    }, {
        text: 'Heat',
        id: 'heat'
    }
];

const ACCESS_DEVICE_FLUSH = Object.freeze({
    HEPARIN: "heparin",
    SODIUM_CHLORIDE: "sodium chloride 0.9%"
})


const Access = ({mpiData}) => {

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    // const []

    const {values, handleChange, handleBlur, setFieldValue} = useFormikContext();

    const [selectedVal, setSelectedVal] = useState('defalutVal');
    const [selectedVal1, setSelectedVal1] = useState('defalutVal1');
    const [label, setLabel] = useState("");
    const [isSubQ, setIsSubQ] = useState(false);
    const [isIvPeripheral, setIsIvPeripheral] = useState(false);
    const [isIvCentral, setIsIvCentral] = useState(false)

    // const isIvPeripheral = values?.access?.type === accessTypes[0];
    // const isIvCentral = values?.access?.type === accessTypes[1]
    // const isSubQ = values?.access?.type === accessTypes[2];

    useEffect(() => {
        globalvariable.needleLengthList.map(item => {
            console.log(item)
        })
    },[])

    useEffect(() => {
        const accessType = values.access.accessDeviceFlush.type;
        if (accessType) {
            if (accessType === ACCESS_DEVICE_FLUSH.HEPARIN) {
                setFieldValue("access.accessDeviceFlush.sodiumChlorideVolume", null);
            } else if (accessType === ACCESS_DEVICE_FLUSH.SODIUM_CHLORIDE) {
                setFieldValue("access.accessDeviceFlush.heparinConcentration", null);
                setFieldValue("access.accessDeviceFlush.heparinVolume", null);
            } else {
                setFieldValue("access.accessDeviceFlush.sodiumChlorideVolume", null);
                setFieldValue("access.accessDeviceFlush.heparinConcentration", null);
                setFieldValue("access.accessDeviceFlush.heparinVolume", null);
            }
        } else {
            setFieldValue("access.accessDeviceFlush.sodiumChlorideVolume", null);
            setFieldValue("access.accessDeviceFlush.heparinConcentration", null);
            setFieldValue("access.accessDeviceFlush.heparinVolume", null);
        }
    }, [values.access.accessDeviceFlush.type])

    return (
        <View style={{flex: 1}}>
            <Image 
                style={{
                    height:'10%',
                    width:'100%',
                    resizeMode:'contain'
                }}
                source={require('../Images/logo.png')}      
            />

            <View>
                <View style={{flexDirection:'row',marginLeft:80}}>
                    <MaterialCommunityIcons style={{alignSelf:'center',marginTop:25,marginLeft:50}}
                     name='account-outline' size={35} color='#026DA9'>
                    </MaterialCommunityIcons>
                    <Text style={{alignSelf:'center',marginTop:25,fontSize:22}}>
                        {mpiData.firstname}{mpiData.lastname}
                    </Text>
                </View>
            </View>
            <Text style={styles.bannertext}>ACCESS</Text>
            <ScrollView>
                <View style={{marginTop:15}}>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={(value) => value.map(item => {
                        if(item.selected === true){
                            setFieldValue("access.type", item.label.length !== undefined ? item.label : null)
                            if(item.label === "SC"){
                                setIsSubQ(true);
                                setIsIvCentral(false)
                                setIsIvPeripheral(false)
                            }
                            if(item.label === "IV Central"){
                                setIsIvCentral(true)
                                setIsIvPeripheral(false)
                                setIsSubQ(false);
                            }
                            if(item.label === "IV Peripheral"){
                                setIsIvPeripheral(true)
                                setIsSubQ(false);
                                setIsIvCentral(false)
                            }
                        }
                    })
                }
                    layout='row'
                    containerStyle={{height:100}}
                    labelStyle={{color:'#026DA9'}}
                />
                </View>

                {isSubQ === true ?
                    <View>
                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Subcutaneous Access</Text>
                            {/* <DropDownPicker 
                                style={{
                                    borderWidth:1,
                                    borderColor:'black',
                                    maxHeight:40,
                                    width:60,
                                    justifyContent:'space-evenly',
                                    alignItems:'center',
                                    marginLeft:20
                                }}
                                
                                items={globalvariable.needleLengthList}
                                schema={{
                                    label: 'text',
                                    value: 'text'
                                }}
                                value={values.access.subcutaneousAccess.needleLength}
                            >
                            </DropDownPicker> */}

                            <View>
                                <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Needle Length</Text>
                                <Picker
                                style={{backgroundColor:'white'}}
                                    selectedValue={selectedVal}
                                    onValueChange={(itemValue, itemIndex) =>
                                        {setSelectedVal(itemValue); setFieldValue('access.subcutaneousAccess.needleLength', itemValue)}
                                    }>
                                    {
                                        globalvariable.needleLengthList.map((item, i) => (
                                            <Picker.Item key={i} label={item.text} value={item.text} />
                                        ))
                                    }
                                </Picker>
                            </View>

                            <View>
                                <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Needle Gauge</Text>
                                <Picker
                                    selectedValue={selectedVal1}
                                    onValueChange={(itemValue, itemIndex) =>
                                        {setSelectedVal1(itemValue); setFieldValue('access.subcutaneousAccess.needleGauge', itemValue)}
                                    }>
                                    {
                                        globalvariable.needleGaugeList.map((item, i) => (
                                            <Picker.Item key={i} label={item.text} value={item.text} />
                                        ))
                                    }
                                </Picker>
                            </View>

                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="# Injection Sites"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.subcutaneousAccess.sites")}
                                onBlur={handleBlur("access.subcutaneousAccess.sites")}
                                value={values.access.subcutaneousAccess.sites}
                                
                            />

                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="Location Of Sites"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.subcutaneousAccess.locationOfSites")}
                                onBlur={handleBlur("access.subcutaneousAccess.locationOfSites")}
                                value={values.access.subcutaneousAccess.locationOfSites}
                                
                            />

                            <BouncyCheckbox
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="No Blood Return"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue("access.subcutaneousAccess.noBloodReturn", checked ?? null);
                                }}
                            />
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Site Assessment</Text>

                            {
                                siteAssessmentForSubQ.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:24 }}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.siteAssessment.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.siteAssessment.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }
                            
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>If Site Reactions, Please Describe</Text>

                            <TextInput style={styles.textInput}
                                multiline={true}
                                numberOfLines={5}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="Site Reactions"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.subcutaneousAccess.siteReactionDetails")}
                                onBlur={handleBlur("access.subcutaneousAccess.siteReactionDetails")}
                                value={values.access.subcutaneousAccess.siteReactionDetails}
                                
                            />
                            
                        </View>
                    
                    </View>

                    :isIvPeripheral === true ?
                    
                    <View>
                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Location</Text>

                            {
                                location.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:24 }}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.siteAssessment.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.siteAssessment.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }

                            <TextInput style={styles.textInput}
                                multiline={true}
                                numberOfLines={5}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="Others"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.location.other")}
                                onBlur={handleBlur("access.location.other")}
                                value={values.access.location.other}
                                
                            />

                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Catheter Information</Text>
                            <TextInput style={styles.textInput}
                                multiline={true}
                                numberOfLines={5}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="Brand"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.catheterInformation.brand")}
                                onBlur={handleBlur("access.catheterInformation.brand")}
                                value={values.access.catheterInformation.brand}
                                
                            />

                            <View>
                                <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Needle Length</Text>
                                <Picker
                                    selectedValue={selectedVal}
                                    onValueChange={(itemValue, itemIndex) =>
                                        {setSelectedVal(itemValue); setFieldValue('access.subcutaneousAccess.needleLength', itemValue)}
                                    }>
                                    {
                                        globalvariable.needleLengthList.map((item, i) => (
                                            <Picker.Item key={i} label={item.text} value={item.text} />
                                        ))
                                    }
                                </Picker>
                            </View>

                            <View>
                                <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Needle Gauge</Text>
                                <Picker
                                    selectedValue={selectedVal1}
                                    onValueChange={(itemValue, itemIndex) =>
                                        {setSelectedVal1(itemValue); setFieldValue('access.subcutaneousAccess.needleGauge', itemValue)}
                                    }>
                                    {
                                        globalvariable.needleGaugeList.map((item, i) => (
                                            <Picker.Item key={i} label={item.text} value={item.text} />
                                        ))
                                    }
                                </Picker>
                            </View>

                            <TextInput style={styles.textInput}
                                multiline={true}
                                numberOfLines={5}
                                mode="outlined"
                                outlineColor="#026DA9"
                                label="No. Of Attempts"
                                autoCapitalize="none"
                                onChangeText={handleChange("access.catheterInformation.noOfAttempts")}
                                onBlur={handleBlur("access.catheterInformation.noOfAttempts")}
                                value={values.access.catheterInformation.noOfAttempts}
                            />
                            <HelperText
                                visible={true}
                            >
                                <Text>Please contact Nufactor Nursing after 3 attempts</Text>
                            </HelperText>
                        </View>

                        
                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Site Assessment</Text>
                                <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                            {
                                siteAssessment.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center',marginRight:10}}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.siteAssessment.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.siteAssessment.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }
                                </View>
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Access Device Flush</Text>

                            <RadioGroup 
                                radioButtons={accessDeviceFlushRadio} 
                                layout='row'
                                containerStyle={{height:100}}
                                labelStyle={{color:'#026DA9'}}
                            />
                            
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Status</Text>
                            <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                            {
                                catheterInformationStatus.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, textAlign:'center',marginRight:15}}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.catheterInformation.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.catheterInformation.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }
                             </View>
                        </View>

                    </View>

                :
             
                isIvCentral === true ?

                <View>
                    <View>
                        <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Access Type</Text>
                        <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                        {
                            accessTypeOptions.map(field => (
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text={field.text}
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:24 }}
                                    onPress={(checked) => {
                                        // setChecked(!checked)
                                        if(checked === true){
                                            setFieldValue(`access.accessType.${field.id}`, field.id);
                                        }else{
                                            setFieldValue(`access.accessType.${field.id}`, null);
                                        }
                                    }}
                                />
                            ))
                        }
                        </View>

                        <TextInput style={styles.textInput}
                            multiline={true}
                            numberOfLines={5}
                            mode="outlined"
                            outlineColor="#026DA9"
                            label="Others"
                            autoCapitalize="none"
                            onChangeText={handleChange("access.accessType.other")}
                            onBlur={handleBlur("access.accessType.other")}
                            value={values.access.accessType.other}
                            
                        />


                        <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Number Of Lumens:</Text>

                        <RadioGroup 
                            radioButtons={numberOfLumens} 
                            layout='row'
                            containerStyle={{height:100}}
                            labelStyle={{color:'#026DA9'}}
                        />

                    </View>

                    <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Site Assessment</Text>
                                <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                            {
                                siteAssessment.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center',marginRight:10}}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.siteAssessment.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.siteAssessment.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }
                                </View>
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Access Device Flush</Text>

                            <RadioGroup 
                                radioButtons={accessDeviceFlushRadio} 
                                layout='row'
                                containerStyle={{height:100}}
                                labelStyle={{color:'#026DA9'}}
                            />
                            
                        </View>

                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Status</Text>
                            <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                            {
                                catheterInformationStatus.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, textAlign:'center',marginRight:15}}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            if(checked === true){
                                                setFieldValue(`access.catheterInformation.${field.id}`, field.id);
                                            }else{
                                                setFieldValue(`access.catheterInformation.${field.id}`, null);
                                            }
                                        }}
                                    />
                                ))
                            }
                             </View>
                        </View>

                </View>

                : null
                }

                        
                            
                    
                            
                
            </ScrollView>
        </View>

        
    )
}

export default Access

const styles = StyleSheet.create({

 bannertext:{
     backgroundColor:'#026DA9',
     fontSize:30,
     color:'white',
     textAlign:'center',
     marginTop:5
 }


})
