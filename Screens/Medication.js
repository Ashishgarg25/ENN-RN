import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,FlatList } from 'react-native'
import {TextInput, HelperText, RadioButton} from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FieldArray, useFormikContext} from "formik";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import globalvariable from '../Global/globalvariable';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Modal from 'react-native-modal';
import { noteTypesText } from '../Global/noteType';

const reasonsForInfusion = ["Prophylaxis", "Bleed", "Surgery related"];

const doseUnitsForBD = [
    {label: 'IU', value: 'IU' },
    {label: 'mcg', value: 'mcg' },
    {label: 'mg', value: 'mg' },
    {label: 'units', value: 'units' },
    {label: 'VWF', value: 'VWF' }
]

const doseUnits = [
    {label: "gm", value: "gm"},
    {label: "ml", value: "ml"}
]

const doseUnitsForMAB = [
    {label: "mg", value: "mg"},
    {label: "gm", value: "gm"},
]

const hydrations = [
    {id: "preIg", text: "Pre-IG"},
    {id: "postIg", text: "Post IG"},
    {id: "concomitantWithIg", text: "Concomitant with IG"},
]
const fluids = ["D5W", "NS", "Other"];

const reactions = [
    {id: "naNaive", text: "N/A (naive or first Nufactor dose)"},
    {id: "none", text: "None"},
    {id: "headache", text: "Headache"},
    {id: "fever", text: "Fever"},
    {id: "chills", text: "Chills"},
    {id: "nausea", text: "Nausea"}
];

const sideEffects = [
    {id: "vomiting", text: "Vomiting"},
    {id: "rash", text: "Rash"},
    {id: "painMyalgia", text: "Pain/Myalgia"},
    {id: "diarrhea", text: "Diarrhea"},
    {id: "fatigue", text: "Fatigue"},
    {id: "headacheOrMigraine", text: "Headache/migraine"},
    {id: "injectionSiteReaction", text: "Injection site reaction (SCIG only)"},
    {id: "muscleAches", text: "Muscle aches"},
];

const soughtMedicalTreatments = ["Prescriber office visit", "Urgent care visit", "ER visit", "Hospitalization"]

const Medication = ({mpiData}) => {

    var today = new Date()
    let [itemState, setitemState] = useState()
    const {values, handleChange, setFieldValue, errors, handleBlur} = useFormikContext();
    const [selectedVal, setSelectedVal] = useState('defalutVal');
    const [checked, setChecked] = useState(false);
    const [modaltimein,setModaltimein] = useState(false)
    const [timein,setTimein] = useState("")
    const [wgt,setWgt] = useState("")
    const [txtwgt,setTextwgt] = useState("")
    const [routetxt,setRoutetxt] = useState("")
    const [med,setMed] = useState("")
    const [druglist,setDruglist] = useState(false)
    const [showcheck,setShowcheck] = useState(false)
    const [textview,setTextview] = useState(true)
    const [addvisible,setaddvisible] = useState(false)
    const [ patientRefused, setPatientRefused ] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const [date1, setDate1] = useState(new Date(1598051730000));
    const [mode1, setMode1] = useState('time');
    const [show1, setShow1] = useState(false);

    const [date2, setDate2] = useState(new Date(1598051730000));
    const [mode2, setMode2] = useState('time');
    const [show2, setShow2] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFieldValue("medication.hydrationTime.preIg.timeAdministered", selectedDate ? selectedDate : null)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate);
        setFieldValue("medication.hydrationTime.postIg.timeAdministered", selectedDate ? selectedDate : null)
    };

    const showMode1 = (currentMode) => {
        setShow1(true);
        setMode1(currentMode);
    };

    const showDatepicker1 = () => {
        showMode1('date');
    };

    const showTimepicker1 = () => {
        showMode1('time');
    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
        setFieldValue("medication.hydrationTime.concomitantWithIg.timeAdministered", selectedDate ? selectedDate : null)
    };

    const showMode2 = (currentMode) => {
        setShow2(true);
        setMode2(currentMode);
    };

    const showDatepicker2 = () => {
        showMode2('date');
    };

    const showTimepicker2 = () => {
        showMode2('time');
    };

    let dose2 = [
        { label:'gm', value: 'gm' },
        {label:'mg', value: 'mg' },
        {label:'ml', value: 'ml' },
        {label:'units', value: 'units' },
        {label:'mcg', value: 'mcg' },
    ]

    let doseBD = [
        { label:'gm', value: 'gm' },
        { label:'mg', value: 'mg' },
        { label:'ml', value: 'ml' },
        { label:'mcg', value: 'mcg' },
    ]

    const isPreMedError = (index, field) => {
        return errors.medication && errors.medication.preMedications && errors.medication.preMedications[index] && errors.medication.preMedications[index][field] !== undefined
    }

    const getPreMedError = (index, field) => {
        return errors.medication && errors.medication.preMedications && errors.medication.preMedications[index] && errors.medication.preMedications[index][field];
    }

    const isHydrationError = (fieldP, fieldC) => {
        return errors?.medication?.hydrationTime?.[fieldP]?.[fieldC] !== undefined
    }

    const getHydrationError = (fieldP, fieldC) => {
        return errors?.medication?.hydrationTime?.[fieldP]?.[fieldC] ?? undefined;
    }

    useEffect(() => {
        if (values.medication.drugMedication.drugName)
            setIsOtherDrug(drugList.findIndex(drug => drug.text === values.medication.drugMedication.drugName) === -1)
    }, [values.medication.drugMedication.drugName])

    const isBleedingDisorderNote = values.noteType === noteTypesText.BLEEDING_DISORDER;
    const isMabNote = values.noteType === noteTypesText.MONOCLONAL_ANTIBODY;

    const preMedicationTempArr = [];

    return (
        <View style={{flex:1}}>
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
            <Text style={styles.bannertext}>MEDICATION</Text>

            <ScrollView>
                <View>
                    <View>
                        {
                            isBleedingDisorderNote ?
                                <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Bleeding Disorder Drug</Text>
                            : isMabNote ?
                                <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Monoclonal Antibody</Text>
                            :   <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Immune Globulin Brand</Text>
                        }
                        <View>
                            
                            {checked === !false ?
                                <View>
                                    <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Select Drug</Text>
                                    <Picker
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
                                    </Picker>
                                </View>

                            :
                                <TextInput style={styles.textInput}
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

                        <View>
                            {
                                isBleedingDisorderNote ?
                                    <View>
                                        <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Reason for Infusion</Text>
                                        <View>
                                            {reasonsForInfusion.map(reasonForInfusion => (
                                                <BouncyCheckbox
                                                    size={25}
                                                    style={{marginLeft:15,marginTop:15}}
                                                    fillColor="#026DA9"
                                                    unfillColor="#FFFFFF"
                                                    text={reasonForInfusion}
                                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:0 }}
                                                    isChecked={values.medication.drugMedication.reasonForInfusion === reasonForInfusion}
                                                    onPress={(checked) => {
                                                        setFieldValue("medication.drugMedication.reasonForInfusion", checked ? reasonForInfusion : null)
                                                    }}
                                                />
                                            ))}

                                            <BouncyCheckbox
                                                size={25}
                                                style={{marginLeft:15,marginTop:15}}
                                                fillColor="#026DA9"
                                                unfillColor="#FFFFFF"
                                                text="Other"
                                                iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:0 }}
                                                isChecked={(reasonsForInfusion.findIndex(reason => reason === values.medication.drugMedication.reasonForInfusion) === -1) && (values.medication.drugMedication.reasonForInfusion !== null)}
                                                onPress={(checked) => {
                                                    setFieldValue("medication.drugMedication.reasonForInfusion", checked ? "" : null)
                                                }}
                                            />

                                            <TextInput style={styles.textInput}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                label="Other Reason"
                                                autoCapitalize="none"
                                                onChangeText={handleChange("medication.drugMedication.reasonForInfusion")}
                                                onBlur={handleBlur("medication.drugMedication.reasonForInfusion")}
                                                value={values.medication.drugMedication.reasonForInfusion}
                                                error={errors?.medication?.drugMedication?.reasonForInfusion !== undefined}
                                            />
                                            <HelperText>{errors?.medication?.drugMedication?.reasonForInfusion ?? undefined}</HelperText>

                                            {
                                                values.medication.drugMedication.reasonForInfusion === "Bleed" ?
                                                    <View>
                                                        <TextInput style={styles.textInput}
                                                            mode="outlined"
                                                            outlineColor="#026DA9"
                                                            label="Bleed Site"
                                                            autoCapitalize="none"
                                                            onChangeText={handleChange("medication.drugMedication.bleedSite")}
                                                            onBlur={handleBlur("medication.drugMedication.bleedSite")}
                                                            value={values.medication.drugMedication.bleedSite}
                                                            error={errors?.medication?.drugMedication?.bleedSite !== undefined}
                                                        />
                                                        <HelperText>{errors?.medication?.drugMedication?.bleedSite ?? undefined}</HelperText>
                                                    </View>
                                                : null
                                            }

                                        </View>
                                    </View>
                                
                                : isMabNote ?
                                    <View>
                                        <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Diluent Solution</Text>
                                        <RadioButton.Group 
                                            onValueChange={handleChange("medication.drugMedication.diluentSolution")} 
                                            value={values.medication.drugMedication.diluentSolution}
                                            
                                        >
                                            <View style={{flexDirection : "row", justifyContent: "space-evenly", alignItems: "center"}}>
                                                <View style={{flexDirection : "row", justifyContent: "space-evenly", alignItems: "center"}}>
                                                    <Text>Sodium chloride 0.9%</Text>
                                                    <RadioButton value="Sodium chloride 0.9%" />
                                                </View>
                                                <View style={{flexDirection : "row", justifyContent: "space-evenly", alignItems: "center"}}>
                                                    <Text>D5W</Text>
                                                    <RadioButton value="D5W" />
                                                </View>
                                            </View>
                                        </RadioButton.Group>

                                        {
                                            values.medication.drugMedication.diluentSolution !== null ?
                                                <View>
                                                    <TextInput style={styles.textInput}
                                                        mode="outlined"
                                                        keyboardType="numeric"
                                                        outlineColor="#026DA9"
                                                        label="Diluent Volume"
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange("medication.drugMedication.diluentVolume")}
                                                        onBlur={handleBlur("medication.drugMedication.diluentVolume")}
                                                        value={values.medication.drugMedication.diluentVolume}
                                                    />
                            
                                                    <Text 
                                                        style={{
                                                            color: "#767676",
                                                            maxHeight:40,
                                                            width:60,
                                                            justifyContent:'space-evenly',
                                                            alignItems:'center',
                                                            marginLeft:20
                                                        }}
                                                    >
                                                        ml
                                                    </Text>
                                                </View>
                                            : null
                                        }
                                    </View>
                                
                                : null
                            }
                        </View>

                        <View>
                            {/* <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Reason for infusion</Text> */}
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
                                    items={ isBleedingDisorderNote ? doseUnitsForBD : isMabNote ? doseUnitsForMAB : doseUnits }
                                    defaultValue={ isBleedingDisorderNote || isMabNote ? "mg" : "gm"}
                                    value={values.medication.drugMedication.doseUnit}
                                >
                                </DropDownPicker>
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
                                    setChecked(!checked)
                                }}
                            />

                        </View>

                    </View>

                    <View style={{flexDirection:'row'}}>
                    
                        {
                            isBleedingDisorderNote ?
                                <Text style={{fontSize:20,marginLeft:13,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>Other Medication</Text>
                            :   <Text style={{fontSize:20,marginLeft:13,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>Pre Medication</Text>    
                        }

                        <TouchableOpacity 
                            style={[styles.bannerButton, { display: patientRefused ? "none" : "flex" }]}
                            onPress={() => {setaddvisible(true),setTextview(!textview)}}
                            >
                                <AntDesign style={{marginLeft:5}}
                                name='plus'
                                size={20}
                                color='#026DA9'
                                >
                                </AntDesign>
                            <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20}}>
                                Add 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: patientRefused ? "none" : "flex" }}>
                        {textview &&
                            <Text style={{fontSize:15,marginLeft:20,color:'#7e7e7e',marginTop:5}}>Add medications!</Text>
                        }
                        <FlatList
                            data={values.medication.preMedications}
                            extraData={values.medication.preMedications}
                            renderItem={({item,index}) => 
                            <View style={{flexDirection:'column'}}>
                                <View style={{flexDirection:'row',borderWidth:1,marginTop:5,marginLeft:10,marginRight:10,borderRadius:5}}>
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.med} {item.timein}</Text>
                                    <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.routetxt} {item.txtwgt + item.wgt}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.delete}
                                        onPress={(index) => {
                                            values.medication.preMedications.splice(index,1)
                                            setitemState("")
                                            console.log(values.medication.preMedications)
                                            console.log()
                                        }}
                                        >
                                            <AntDesign style={{marginLeft:5}}
                                            name='delete'
                                            size={20}
                                            color='red'
                                            >
                                            </AntDesign>
                                        
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                        keyExtractor={item => item.id}
                        >
                        </FlatList>
                    </View>
                    
                    {/* Patient Refused Pre Medication */}
                    <BouncyCheckbox
                        size={25}
                        style={{marginTop:10}}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text={`Patient refused ${isBleedingDisorderNote ? "other medications" : "pre medications"}`}
                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,marginRight:15,textAlign:'center' }}
                        isChecked={values.medication.preMedicationsRefused}
                        onPress={(checked) => {
                            if (checked){
                                setFieldValue("medication.preMedications", []);
                                setPatientRefused(true);
                            }  
                            else
                                setPatientRefused(false);
                                setFieldValue("medication.preMedications", [{
                                    drug: '',
                                    doseUnit: preMedicationDoseUnits[0].value,
                                    dose: null,
                                    route: '',
                                    timeAdministered: ''
                                }]);
                        }}
                    />

                    {
                        !isBleedingDisorderNote || !isMabNote ?
                            <View>
                                <Text style={{fontSize:20,marginLeft:13,marginTop:10}}>Hydration IV</Text>
                                <View>
                                    <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>Hydration time:</Text>
                                    
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                        {
                                            hydrations.map(field => (

                                                <BouncyCheckbox
                                                    size={25}
                                                    style={{marginTop:10}}
                                                    fillColor="#026DA9"
                                                    unfillColor="#FFFFFF"
                                                    text={field.text}
                                                    isChecked={values.medication.hydrationTime[field.id] !== null}
                                                    iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12 ,marginRight:15,textAlign:'center'}}
                                                    onPress={(checked) => {
                                                        if (checked)
                                                            setFieldValue(`medication.hydrationTime.${field.id}`, {
                                                                volume: "",
                                                                rate: "",
                                                                timeAdministered: "",
                                                                fluid: ""
                                                            })
                                                        else setFieldValue(`medication.hydrationTime.${field.id}`, null);
                                                    }}
                                                />
                                            )
                                        )}
                                    </View>

                                    {
                                        values.medication.hydrationTime.preIg &&
                                        <View>
                                            <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>Pre IG:</Text>
                                            <View>
                                                    <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Volume (ml)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.preIg.volume")}
                                                    onBlur={handleBlur("medication.hydrationTime.preIg.volume")}
                                                    value={values.medication.hydrationTime.preIg.volume}
                                                    error={isHydrationError("preIg", "volume")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("preIg", "volume") ? true : false}
                                                >
                                                    {getHydrationError("preIg", "volume")}
                                            </HelperText>

                                            <View>
                                                <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Rate (ml/hr)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.preIg.rate")}
                                                    onBlur={handleBlur("medication.hydrationTime.preIg.rate")}
                                                    value={values.medication.hydrationTime.preIg.rate}
                                                    error={isHydrationError("preIg", "rate")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("preIg", "rate") ? true : false}
                                                >
                                                    {getHydrationError("preIg", "rate")}
                                            </HelperText>

                                            {/* TIME ADMINISTERED */}
                                            
                                            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                                                <Button onPress={showTimepicker} title="Show time picker!" />
                                            </View>
                                            {show && (
                                                <RNDateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                                />
                                            )}

                                            {
                                                fluids.map((text, i) => (
                                                    <BouncyCheckbox
                                                        size={25}
                                                        style={{marginTop:10}}
                                                        fillColor="#026DA9"
                                                        unfillColor="#FFFFFF"
                                                        text={text}
                                                        isChecked={text === values.medication.hydrationTime.preIg.fluid}
                                                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12 ,marginRight:15,textAlign:'center'}}
                                                        onPress={(checked) => {
                                                            setFieldValue("medication.hydrationTime.preIg.fluid", checked ? text : null)    
                                                        }}
                                                    />
                                                ))
                                            }

                                        </View>
                                        
                                    }

                                    {
                                        values.medication.hydrationTime.postIg &&
                                        <View>
                                            <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>Post IG:</Text>
                                            <View>
                                                    <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Volume (ml)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.postIg.volume")}
                                                    onBlur={handleBlur("medication.hydrationTime.postIg.volume")}
                                                    value={values.medication.hydrationTime.postIg.volume}
                                                    error={isHydrationError("postIg", "volume")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("postIg", "volume") ? true : false}
                                                >
                                                    {getHydrationError("postIg", "volume")}
                                            </HelperText>

                                            <View>
                                                <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Rate (ml/hr)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.postIg.rate")}
                                                    onBlur={handleBlur("medication.hydrationTime.postIg.rate")}
                                                    value={values.medication.hydrationTime.postIg.rate}
                                                    error={isHydrationError("postIg", "rate")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("postIg", "rate") ? true : false}
                                                >
                                                    {getHydrationError("postIg", "rate")}
                                            </HelperText>

                                            {/* TIME ADMINISTERED */}
                                            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                                                <Button onPress={showTimepicker1} title="Show time picker!" />
                                            </View>
                                            {show && (
                                                <RNDateTimePicker
                                                testID="dateTimePicker"
                                                value={date1}
                                                mode={mode1}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange1}
                                                />
                                            )}

                                            {
                                                fluids.map((text, i) => (
                                                    <BouncyCheckbox
                                                        size={25}
                                                        style={{marginTop:10}}
                                                        fillColor="#026DA9"
                                                        unfillColor="#FFFFFF"
                                                        text={text}
                                                        isChecked={text === values.medication.hydrationTime.postIg.fluid}
                                                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12 ,marginRight:15,textAlign:'center'}}
                                                        onPress={(checked) => {
                                                            setFieldValue("medication.hydrationTime.postIg.fluid", checked ? text : null)    
                                                        }}
                                                    />
                                                ))
                                            }

                                        </View>                                        
                                    }

                                    {
                                        values.medication.hydrationTime.concomitantWithIg &&
                                        <View>
                                            <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>Concomitant With IG:</Text>
                                            <View>
                                                    <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Volume (ml)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.concomitantWithIg.volume")}
                                                    onBlur={handleBlur("medication.hydrationTime.concomitantWithIg.volume")}
                                                    value={values.medication.hydrationTime.concomitantWithIg.volume}
                                                    error={isHydrationError("concomitantWithIg", "volume")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("concomitantWithIg", "volume") ? true : false}
                                                >
                                                    {getHydrationError("concomitantWithIg", "volume")}
                                            </HelperText>

                                            <View>
                                                <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Rate (ml/hr)*"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("medication.hydrationTime.concomitantWithIg.rate")}
                                                    onBlur={handleBlur("medication.hydrationTime.concomitantWithIg.rate")}
                                                    value={values.medication.hydrationTime.concomitantWithIg.rate}
                                                    error={isHydrationError("concomitantWithIg", "rate")}
                                                />
                                            
                                            </View>
                                            <HelperText 
                                                    type="error"
                                                    visible={isHydrationError("concomitantWithIg", "rate") ? true : false}
                                                >
                                                    {getHydrationError("concomitantWithIg", "rate")}
                                            </HelperText>

                                            {/* TIME ADMINISTERED */}
                                            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                                                <Button onPress={showTimepicker2} title="Show time picker!" />
                                            </View>
                                            {show && (
                                                <RNDateTimePicker
                                                testID="dateTimePicker"
                                                value={date2}
                                                mode={mode2}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange2}
                                                />
                                            )}

                                            {
                                                fluids.map((text, i) => (
                                                    <BouncyCheckbox
                                                        size={25}
                                                        style={{marginTop:10}}
                                                        fillColor="#026DA9"
                                                        unfillColor="#FFFFFF"
                                                        text={text}
                                                        isChecked={text === values.medication.hydrationTime.concomitantWithIg.fluid}
                                                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12 ,marginRight:15,textAlign:'center'}}
                                                        onPress={(checked) => {
                                                            setFieldValue("medication.hydrationTime.concomitantWithIg.fluid", checked ? text : null)    
                                                        }}
                                                    />
                                                ))
                                            }

                                        </View>                                        
                                    }

                                </View>
                            </View>
                        :   null
                    }

                    <View>
                        {
                            isBleedingDisorderNote || isMabNote ?
                                <Text style={{fontSize:20,marginLeft:13,marginTop:10}}>Event Since Last Dose or Course</Text>
                            :   <Text style={{fontSize:20,marginLeft:13,marginTop:10}}>Event(s) Since Last IG Dose or Course</Text>
                        }
                        <View>
                            <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Reaction</Text>
                                <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>
                            {
                                reactions.map(field => (

                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12 ,marginRight:15,textAlign:'center'}}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            setFieldValue(`medication.eventsSinceLastDose.${field.id}`, checked);
                                        }}
                                    />
                                ))}
                                </View>
                        </View>

                        <View>
                            {
                                isBleedingDisorderNote || isMabNote ? 
                                    <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>Side Effects</Text>
                                :   <Text style={{fontSize:16,marginLeft:13,marginTop:10}}>IG Side Effects</Text>
                                
                            }
                             <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20,marginTop:5}}>

                            {
                                sideEffects.map(field => (
                                    <BouncyCheckbox
                                        size={25}
                                        style={{marginTop:10}}
                                        fillColor="#026DA9"
                                        unfillColor="#FFFFFF"
                                        text={field.text}
                                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,marginRight:15,textAlign:'center' }}
                                        onPress={(checked) => {
                                            // setChecked(!checked)
                                            setFieldValue(`medication.eventsSinceLastDose.${field.id}`, checked);
                                        }}
                                    />
                                ))
                            }
                            </View>
                        </View>
                        
                    </View>

                    <View>
                        <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Sought Medical Treatment</Text>
                        <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                        {
                            sideEffects.map(field => (
                                <BouncyCheckbox
                                    key={field.id}
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text={field.text}
                                    isChecked={field.text === values.medication.soughtMedicalTreatment}
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginRight:15,textAlign:'center' }}
                                    onPress={(checked) => {
                                        // setChecked(!checked)
                                        setFieldValue("medication.soughtMedicalTreatment", checked);
                                    }}
                                />
                            ))
                        }
                        </View>
                    </View>

                </View>
            </ScrollView>
            <Modal
                isVisible={addvisible}
                avoidKeyboard={true}
                onBackdropPress={() => {
                setaddvisible(false)
                }}
            >
                {openadd()}
            </Modal>
            <Modal
                isVisible={modaltimein}
                avoidKeyboard={true}
                onBackdropPress={() => {
                setModaltimein(false)
                    }}
            >
                {opentimein()}
            </Modal>
        </View>
    )

    function openadd() {
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <ScrollView>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5,color:'#7e7e7e'}}>Medication Name</Text>
                   
                    {
                        isBleedingDisorderNote ?
                            <View style={{marginTop:10,width:'95%',marginLeft:10}}>
                                <TextInput style={styles.textInput} placeholder ="Type Medication"
                                    onChangeText={(text) => 
                                        setMed(text)
                                    }
                                />
                            </View>
                        :
                        <View style={{marginTop:10,width:'95%',marginLeft:10}}>
                            {!druglist ?
                                <Dropdown
                            // {/*Data from Api */}
                                data={globalvariable.preMedDrugList}
                                containerStyle={{width:'100%',borderWidth:1,height:50,borderRadius:5}}
                                style={{height:50,backgroundColor:'transparent'}}
                                icon="chevron-down"
                                label="Medication"
                                onChangeText={(value) => {
                                    setMed(value)
                                }}
                                >
                                </Dropdown>
                                :
                                <TextInput style={styles.textInput} placeholder ="Type Medication"
                                    onChangeText={(text) => 
                                        setMed(text)
                                    }
                                ></TextInput>
                            }
                        </View>
                    }

                    <Text style={{fontSize:20,marginLeft:13,marginTop:5,color:'#7e7e7e'}}>Dose</Text>
                    <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                            <TextInput style={[styles.textInput,{position:'absolute'}]} placeholder='Weight' 
                                onChangeText={(text) =>{
                                    setTextwgt(text)
                                }}
                            ></TextInput>
                        <Dropdown
                            data={ isBleedingDisorderNote ? doseBD : dose2}
                            containerStyle={{width:80,borderWidth:1,height:35,borderRadius:5,marginLeft:200}}
                            style={{height:35,backgroundColor:'transparent'}}
                            icon="chevron-down"
                            onChangeText={(value) => 
                                setWgt(value)
                            }>
                        </Dropdown>
                    </View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5,color:'#7e7e7e'}}>Route</Text>
                    {
                        isBleedingDisorderNote ?
                            <View style={{marginTop:10,marginLeft:10,width:'95%'}}>
                                <TextInput style={styles.textInput} placeholder ="Type Route"
                                    onChangeText={(text) => 
                                        setRoutetxt(text)
                                    }
                                />
                            </View>
                        :   <View style={{marginTop:10,marginLeft:10,width:'95%'}}>
                                <Dropdown
                                    data={globalvariable.drugRouteList}
                                    containerStyle={{width:'100%',borderWidth:1,height:50,borderRadius:5}}
                                    style={{height:50,backgroundColor:'transparent'}}
                                    icon="chevron-down"
                                    label="Route"
                                    onChangeText={(value) => 
                                        setRoutetxt(value)
                                    }
                                    >
                                </Dropdown>
                            </View>
                    }
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',marginLeft:20,marginRight:0,marginVertical:20,flex:1}}>
                        <Text>
                           Time in* 
                        </Text>
                        <Text>{timein}</Text>
                        <View style={{height:1,backgroundColor:'grey',marginTop:10,width:'108%'}}></View>
                    </View>
                    <TouchableOpacity style={{marginTop:20,marginRight:15}} onPress={() => {
                            setModaltimein(true) 
                            }} >
                            <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:50,flexDirection:'row',alignItems:'center',marginLeft:5}}>
                        <TouchableOpacity onPress={() => {
                            setShowcheck(!showcheck)
                            setDruglist(!druglist)
                        }}>
                            {!showcheck ? 
                            <MaterialCommunityIcons name='checkbox-blank-outline' size={30} color='black'></MaterialCommunityIcons>
                            : 
                            <MaterialCommunityIcons name='check-box-outline' size={30} color='#026DA9'></MaterialCommunityIcons>
                            }
                        </TouchableOpacity>
                        <Text style={{fontSize:15,marginLeft:5}}>Drug on the list?</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.bannerButton2} onPress={() => {setaddvisible(false)}}>
                        <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20}}>
                            Cancel 
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.addbutton2}
                        onPress={() => {
                            preMedicationTempArr.push({
                                drug: med,
                                doseUnit: wgt,
                                dose: txtwgt,
                                route: routetxt,
                                timeAdministered: timein
                            });
                            setFieldValue("medication.preMedications", preMedicationTempArr)
                            
                            setaddvisible(false)
                        }}
                        >
                            <AntDesign style={{marginLeft:5}}
                             name='plus'
                             size={20}
                             color='#026DA9'
                             >
                            </AntDesign>
                        <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20}}>
                            Add 
                        </Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
        
    }
    function opentimein() {
        return(
            <View style={{flex:1}}>
                <RNDateTimePicker
                timeZoneOffsetInMinutes={0}
                mode="time" value={today} style={{height:200}} onChange={(event,date)=>{
                    setModaltimein(false)
                    setTimein(date.getUTCHours().toString() + ":" + date.getUTCMinutes().toString())
                }} />
            </View>
           
        )
    }
}

export default Medication

const styles = StyleSheet.create({
    textInput: {
        marginLeft:10,         
        height:55,
        width:'95%',
        borderRadius: 5,
        color:'black',
    },
    bannertext:{
        backgroundColor:'#026DA9',
        fontSize:30,
        color:'white',
        textAlign:'center',
        marginTop:5
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
    bannerButton2 :{
        marginLeft:15,
        borderColor:'#026DA9',
        borderWidth:2,
        height:35,
        width:80,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:10,
        marginTop:10
    },
    addbutton2 :{
        marginLeft:155,
        borderColor:'#026DA9',
        height:35,
        width:80,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:10,
        borderWidth:2
    },
    bannerButton :{
        marginLeft:150,
        borderColor:'#026DA9',
        borderWidth:2,
        height:30,
        width:80,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center'
    },
})
