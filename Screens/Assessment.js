import React, { useState ,useEffect, useCallback} from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity, Button} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFormikContext} from "formik";
import {temperatureUnits, weightUnits} from "../Global/formData";
import {TextInput, HelperText} from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Slider from '@react-native-community/slider';
import { noteTypesText } from '../Global/noteType';
import DateTimePicker from '@react-native-community/datetimepicker';

const radioButtonsData = [
    {
    id: '1', 
    label: 'Gain',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'Loss',
    color:'#026DA9'
    },
    {
    id : '3',
    label : 'Same',
    color:'#026DA9'
    },
    {
    id : '4',
    label : 'Unable to obtain',
    color:'#026DA9'
    }
]

const durationUnits = [
    {label: "hr", value: "hr"},
    {label: "min", value: "min"}
]

const cardiovascular = [
    {
        name: 'Hypertension',
        value: 'Hypertension',
        id: 'hyperTension'
    }, {
        name: 'Chest pain',
        value: 'Chest pain',
        id: 'chestPain'
    }, {
        name: 'Hypotension',
        value: 'Hypotension',
        id: 'hypoTension'
    }, {
        name: 'Edema',
        value: 'Edema',
        id: 'edema'
    }, {
        name: 'Arrhythmia',
        value: 'Arrhythmia',
        id: 'arrhythmia'
    }
];

const respiratory = [
    {
        name: 'Dyspnea',
        value: 'Dyspnea',
        id: 'dyspnea'
    }, {
        name: 'Cough',
        value: 'Cough',
        id: 'cough'
    }, {
        name: 'Abnormal lung sounds',
        value: 'Abnormal lung sounds',
        id: 'abnormalLungSound'
    }
];

const genitourinary = [
    {
        name: 'Urgency',
        value: 'Urgency',
        id: 'urgency'
    }, {
        name: 'Increased frequency',
        value: 'Increased frequency',
        id: 'increasedFrequency'
    }, {
        name: 'Decreased frequency',
        value: 'Decreased frequency',
        id: 'decreasedFrequency'
    }, {
        name: 'Abnormal color',
        value: 'Abnormal color',
        id: 'abnormalColor'
    }
];

const endocrine = [
    {
        name: 'Diabetic',
        value: 'Diabetic',
        id: 'diabetic'
    }
];

const gastroIntestinal = [
    {
        name: 'Diarrhea',
        value: 'Diarrhea',
        id: 'diarrhea'
    },
    {
        name: 'Poor dietary compliance',
        value: 'Poor dietary compliance',
        id: 'poorDietaryCompliance'
    },
    {
        name: 'Nausea',
        value: 'Nausea',
        id: 'nausea'
    }, {
        name: 'Vomiting',
        value: 'Vomiting',
        id: 'vomiting'
    }, {
        name: 'Constipation',
        value: 'Constipation',
        id: 'constipation'
    }, {
        name: 'Poor skin turgor',
        value: 'Poor skin turgor',
        id: 'poorSkinTurgor'
    }, {
        name: 'Dry mucous membranes',
        value: 'Dry mucous membranes',
        id: 'dryMucousMembranes'
    }, {
        name: 'Difficulty swallowing',
        value: 'Difficulty swallowing',
        id: 'difficultySwallowing'
    }, {
        name: 'Inadequate food intake',
        value: 'Inadequate food intake',
        id: 'inadequateFoodIntake'
    }
];

const activity = [
    {
        name: 'Wheelchair',
        value: 'Wheelchair',
        id: 'wheelchair'
    }, {
        name: 'Bedbound',
        value: 'Bedbound',
        id: 'bedbound'
    }, {
        name: 'Cane',
        value: 'Cane',
        id: 'cane'
    }, {
        name: 'Walker',
        value: 'Walker',
        id: 'walker'
    }
];

const neurological = [
    {
        name: 'Confused',
        value: 'Confused',
        id: 'confused'
    }, {
        name: 'Forgetful',
        value: 'Forgetful',
        id: 'forgetful'
    }, {
        name: 'Numbness',
        value: 'Numbness',
        id: 'numbness'
    }, {
        name: 'Tingling',
        value: 'Tingling',
        id: 'tingling'
    }, {
        name: 'Weakness',
        value: 'Weakness',
        id: 'weakness'
    }, {
        name: 'Cramping',
        value: 'Cramping',
        id: 'cramping'
    }, {
        name: 'Muscle twitch',
        value: 'Muscle twitch',
        id: 'muscleTwitch'
    }, {
        name: 'Difficulty speaking',
        value: 'Difficulty speaking',
        id: 'difficultySpeaking'
    }, {
        name: 'Nasal/slurred speech',
        value: 'Nasal/slurred speech',
        id: 'nasalSlurredSpeech'
    }
];

const psychosocial = [
    {
        name: 'Inadequate support system',
        value: 'Inadequate support system',
        id: 'inadequateSupportSystem'
    }, {
        name: 'Caregiver unavailable',
        value: 'Caregiver unavailable',
        id: 'caregiverUnavailable'
    }
];

const homeEnvironmentSafety = [
    {
        name: 'Fall risk',
        value: 'Fall risk',
        id: 'fallRisk'
    }, {
        name: 'Oxygen use risk',
        value: 'Oxygen use risk',
        id: 'oxygenUseRisk'
    },
];

const painType = [
    {
        name: 'Sharp',
        value: 'Sharp',
        id: 'sharp'
    }, {
        name: 'Dull',
        value: 'Dull',
        id: 'dull'
    }, {
        name: 'Ache',
        value: 'Ache',
        id: 'ache'
    }, {
        name: 'Constant',
        value: 'Constant',
        id: 'constant'
    }, {
        name: 'Throbbing',
        value: 'Throbbing',
        id: 'throbbing'
    }, {
        name: 'Intermittent',
        value: 'Intermittent',
        id: 'intermittent'
    },
];

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 10,
        label: '10',
    },
];


const Assessment = ({mpiData}) => {

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [counter,setCounter] = useState(0)
    const [temp,setTemp] = useState("")
    const [showcheck,setShowcheck] = useState(false)
    const [checked, setChecked] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFieldValue("assessment.recentBleeds.when", selectedDate ? selectedDate : null)
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

    const items = [
        {label: '°F', value: '°F' },
        {label: '°C', value: '°C' }
    ]

    const weight = [
        {label: 'lbs', value: ';bs' },
        {label: 'kg', value: 'kg' }
    ]

    const [isOtherCardiovascular, setIsOtherCardiovascular] = useState(false);
    const [isOtherRespiratory, setIsOtherRespiratory] = useState(false);
    const [isOtherGenitourinary, setIsOtherGenitourinary] = useState(false);
    const [isOtherEndocrine, setIsOtherEndocrine] = useState(false);
    const [isOtherGastroIntestinal, setIsOtherGastroIntestinal] = useState(false);
    const [isOtherActivity, setIsOtherActivity] = useState(false);
    const [isOtherPsychosocial, setIsOtherPsychosocial] = useState(false);
    const [isOtherNeurological, setIsOtherNeurological] = useState(false);
    const [isOtherSafety, setIsOtherSafety] = useState(false);
    const [sliderVal, setSliderVal] = useState(0);

    const left = sliderVal * 30;

    const {
        values,
        handleChange,
        setFieldValue,
        errors,
        handleBlur,
        setFieldError
    } = useFormikContext();

    useEffect(() => {
        console.log("==================>", values.noteType)
    },[])

    const isError_vitalSigns = (field) => {
        return (errors && errors.assessment && errors.assessment.vitalSigns) && (errors.assessment.vitalSigns[field] !== undefined);
    }

    const getError_vitalSigns = (field) => {
        return (errors && errors.assessment && errors.assessment.vitalSigns) ? errors.assessment.vitalSigns[field] : undefined
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
            <View style={{flexDirection:'row'}}>
                {/* <TouchableOpacity style={styles.backbutton}
                        onPress={() => navigation.replace('Home')}
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
                                    fontSize:16}}>
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
            <Text style={{backgroundColor:'#026DA9',textAlign:'center',fontSize:30,color:'white',marginTop:10}}>ASSESSMENT</Text>
            <ScrollView>
                <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Baseline Vital Signs</Text>
                    
                    <View style={{flex:1,justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',alignItems:'center',height:50}}>
                                {/* <TextInput style={styles.textInput} placeholder='Temperature' ></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity>      */}


                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Temperature*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.temperature")}
                                    onBlur={handleBlur("assessment.vitalSigns.temperature")}
                                    value={values.assessment.vitalSigns.temperature}
                                    error={isError_vitalSigns("temperature")}
                                />
                                

                                <DropDownPicker 
                                    style={{
                                        borderWidth:1,
                                        borderColor:'black',
                                        maxHeight:40,
                                        width:60,
                                        justifyContent:'space-evenly',
                                        alignItems:'center',
                                        marginLeft:20
                                    }}
                                    items={items}
                                    defaultValue="°F"
                                    value={values.assessment.vitalSigns.temperatureUnits}
                                >
                                </DropDownPicker>
                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("temperature") ? true : false}
                                >
                                    {getError_vitalSigns("temperature")}
                            </HelperText>

                            <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                                {/* <TextInput style={styles.textInput} placeholder='Diastolic (mm Hg)'></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity> */}

                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Systolic (mm Hg)*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.bpLow")}
                                    onBlur={handleBlur("assessment.vitalSigns.bpLow")}
                                    value={values.assessment.vitalSigns.bpLow}
                                    error={isError_vitalSigns("bpLow")}
                                />
                                

                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("bpLow") ? true : false}
                                >
                                    {getError_vitalSigns("bpLow")}
                                </HelperText>
                            <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                                {/* <TextInput style={styles.textInput} placeholder='Systolic (mm Hg)'></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity> */}
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Diastolic (mm Hg)*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.bpHigh")}
                                    onBlur={handleBlur("assessment.vitalSigns.bpHigh")}
                                    value={values.assessment.vitalSigns.bpHigh}
                                    error={isError_vitalSigns("bpHigh")}
                                />
                               
                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("bpHigh") ? true : false}
                                >
                                    {getError_vitalSigns("bpHigh")}
                            </HelperText>
                            <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                                {/* <TextInput style={styles.textInput} placeholder='Pulse (Beats per minute)'></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity> */}

                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Pulse (Beats per min)*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.pulse")}
                                    onBlur={handleBlur("assessment.vitalSigns.pulse")}
                                    value={values.assessment.vitalSigns.pulse}
                                    error={isError_vitalSigns("pulse")}
                                />
                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("pulse") ? true : false}
                                >
                                    {getError_vitalSigns("pulse")}
                                </HelperText>
                            <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                                {/* <TextInput style={styles.textInput} placeholder='Respiratory Rate (Beats per minute)'></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity> */}

                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Respiratory Rate (Beats per min)*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.repositoryRate")}
                                    onBlur={handleBlur("assessment.vitalSigns.repositoryRate")}
                                    value={values.assessment.vitalSigns.repositoryRate}
                                    error={isError_vitalSigns("repositoryRate")}
                                />
                               
                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("repositoryRate") ? true : false}
                                >
                                    {getError_vitalSigns("repositoryRate")}
                                </HelperText>
                            <View style={{flexDirection:'row',marginTop:10,height:60,justifyContent:'center',alignItems:'center'}}>
                                {/* <TextInput style={styles.textInput} placeholder='Weight'></TextInput>
                                <TouchableOpacity style={styles.increment}>
                                    <AntDesign  name='caretup' size={15} color='#323232'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.decrement}>
                                    <AntDesign  name='caretdown' size={15} color='#323232'/>
                                </TouchableOpacity> */}

                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Weight*"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.vitalSigns.weight")}
                                    onBlur={handleBlur("assessment.vitalSigns.weight")}
                                    value={values.assessment.vitalSigns.weight}
                                    error={isError_vitalSigns("weight")}
                                />
        
                                <DropDownPicker 
                                    style={{
                                        borderWidth:1,
                                        borderColor:'black',
                                        maxHeight:40,
                                        width:60,
                                        justifyContent:'space-evenly',
                                        alignItems:'center',
                                        marginLeft:20
                                    }}
                                    items={weight}
                                    defaultValue="kg"
                                    value={values.assessment.vitalSigns.weightUnit}
                                >
                                </DropDownPicker>

                            </View>
                            <HelperText 
                                    type="error"
                                    visible={isError_vitalSigns("weight") ? true : false}
                                >
                                    {getError_vitalSigns("weight")}
                            </HelperText>
                    </View>
                
                <View style={{marginTop:40}}>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={(value) => setFieldValue("assessment.vitalSigns.weightStatus", value)}
                        layout='row'
                        containerStyle={{height:100}}
                        labelStyle={{color:'#026DA9'}}
                    />
                </View>
                <View style={{backgroundColor:'#fff',marginTop:10,height:50,marginLeft:20,flexDirection:'row'}}>
                    {/* <TouchableOpacity onPress={() => {
                        setShowcheck(!showcheck)
                        setFieldValue("assessment.vitalSigns.patientRefusedVitals", showcheck);
                    }}>
                        {!showcheck ? 
                        <MaterialCommunityIcons name='checkbox-blank-outline' size={30}></MaterialCommunityIcons>
                        : 
                        <MaterialCommunityIcons name='check-box-outline' size={30}></MaterialCommunityIcons>
                        }
                    </TouchableOpacity>
                    <Text>Patient Refused Some or All Vitals</Text> */}

                    <BouncyCheckbox
                        size={25}
                        style={{flexDirection:'row'}}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="Patient refused some or all vitals"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:5 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center'}}
                        onPress={(checked) => {
                            // setChecked(!checked)
                            setFieldValue("assessment.vitalSigns.patientRefusedVitals", checked ?? null);
                        }}
                    />
                </View>

                {
                    noteTypesText.MONOCLONAL_ANTIBODY === values.noteType ?
                        <View style={{ height: 220 }}>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Infection screen</Text>
                            <View>
                                <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Does patient have signs or symptoms of an active infection?</Text>
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text="No"
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                    onPress={(checked) => {
                                        if (checked)
                                        setFieldValue("assessment.infectionScreen.hasActiveInfection", false)
                                        else
                                            setFieldValue("assessment.infectionScreen.hasActiveInfection", null)
                                        }}
                                />
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text="Yes - do NOT administer. Contact Nufactor"
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                    onPress={(checked) => {
                                        if (checked)
                                        setFieldValue("assessment.infectionScreen.hasActiveInfection", true)
                                        else
                                            setFieldValue("assessment.infectionScreen.hasActiveInfection", null)
                                        }}
                                />

                                {
                                    values.assessment.infectionScreen.hasActiveInfection ?
                                        <View>
                                            <TextInput style={styles.textInput}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                label="Describe infection*"
                                                autoCapitalize="none"
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={handleChange("assessment.infectionScreen.infectionDescription")}
                                                onBlur={handleBlur("assessment.infectionScreen.infectionDescription")}
                                                value={values.assessment.infectionScreen.infectionDescription}
                                                error={errors?.assessment?.infectionScreen?.infectionDescription !== undefined}
                                            />
                                            <HelperText type="error">{errors?.assessment?.infectionScreen?.infectionDescription}</HelperText>
                                        </View>
                                    :   null
                                }
                            </View>
                        </View>
                    :   null
                }

                {
                    noteTypesText.BLEEDING_DISORDER === values.noteType ? 
                        <View>
                            <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Any Recent Bleeds</Text>
                            <View>
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text="Yes"
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                    onPress={(checked) => {
                                        if (checked)
                                            setFieldValue("assessment.recentBleeds.hasRecentBleeds", true)
                                        else
                                            setFieldValue("assessment.recentBleeds.hasRecentBleeds", null)
                                    }}
                                />
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text="No"
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                    onPress={(checked) => {
                                        if (checked)
                                            setFieldValue("assessment.recentBleeds.hasRecentBleeds", false)
                                        else
                                            setFieldValue("assessment.recentBleeds.hasRecentBleeds", null)
                                    }}
                                />
                            </View>

                            {
                                values.assessment.recentBleeds.hasRecentBleeds ?
                                    <View>
                                        <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Is MD or HTC aware?</Text>
                                        <BouncyCheckbox
                                            size={25}
                                            style={{marginTop:10}}
                                            fillColor="#026DA9"
                                            unfillColor="#FFFFFF"
                                            text="Yes"
                                            iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                            textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                            onPress={(checked) => {
                                                if (checked)
                                                    setFieldValue("assessment.recentBleeds.isMdOrHtcAware", false)
                                                else
                                                    setFieldValue("assessment.recentBleeds.isMdOrHtcAware", null)
                                            }}
                                        />
                                        <BouncyCheckbox
                                            size={25}
                                            style={{marginTop:10}}
                                            fillColor="#026DA9"
                                            unfillColor="#FFFFFF"
                                            text="No"
                                            iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                                            textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                                            onPress={(checked) => {
                                                if (checked)
                                                    setFieldValue("assessment.recentBleeds.isMdOrHtcAware", false)
                                                else
                                                    setFieldValue("assessment.recentBleeds.isMdOrHtcAware", null)
                                            }}
                                        />
                                        <View style={{height: 450}}>

                                            {/* DATE & TIME */}
                                            <View style={{ margin: 16 }}>
                                                <Button onPress={showDatepicker} title="Show date picker!" />
                                            </View>
                                            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                                                <Button onPress={showTimepicker} title="Show time picker!" />
                                            </View>
                                            {show && (
                                                <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                                />
                                            )}

                                            <TextInput style={styles.newTextInput}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                label="Location"
                                                onChangeText={handleChange("assessment.recentBleeds.location")}
                                                onBlur={handleBlur("assessment.recentBleeds.location")}
                                                value={values.assessment.recentBleeds.location}
                                                
                                            />
                                            <TextInput style={styles.newTextInput}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                label="Cause"
                                                onChangeText={handleChange("assessment.recentBleeds.cause")}
                                                onBlur={handleBlur("assessment.recentBleeds.cause")}
                                                value={values.assessment.recentBleeds.cause}
                                                
                                            />
                                            {/* <TextInput style={styles.newTextInput}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                label="Duration"
                                                autoCapitalize="none"
                                                onChangeText={handleChange("assessment.recentBleeds.duration")}
                                                onBlur={handleBlur("assessment.recentBleeds.duration")}
                                                value={values.assessment.recentBleeds.duration}
                                                error={isError_vitalSigns("weight")}
                                            /> */}

                                            <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',alignItems:'center',height:50}}>

                                                <TextInput style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#026DA9"
                                                    label="Dose"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("assessment.recentBleeds.duration")}
                                                    onBlur={handleBlur("assessment.recentBleeds.duration")}
                                                    value={values.assessment.recentBleeds.duration}
                                                    
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
                                                    items={durationUnits}
                                                    defaultValue={"hr"}
                                                    value={values.assessment.recentBleeds.durationUnit}
                                                >
                                                </DropDownPicker>
                                            </View>
                    
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
                                                items={durationUnits}
                                                defaultValue="hr"
                                                value={values.assessment.recentBleeds.durationUnit}
                                            >
                                            </DropDownPicker> */}
                                            <TextInput style={[styles.newTextInput, {marginTop: 16}]}
                                                mode="outlined"
                                                outlineColor="#026DA9"
                                                multiline={true}
                                                numberOfLines={3}
                                                label="Treatment"
                                                onChangeText={handleChange("assessment.recentBleeds.treatment")}
                                                onBlur={handleBlur("assessment.recentBleeds.treatment")}
                                                value={values.assessment.recentBleeds.treatment}
                                                
                                            />
                                        </View>
                                    </View>
                                    
                                : null
                            }

                        </View>
                    : null
                }

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Allergies</Text>
                    <View style={{flex:1,flexWrap:'wrap',marginLeft:15}}>

                    <BouncyCheckbox
                        size={25}
                        style={{marginTop:10}}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="No New Allergy"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6}}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center' }}
                        onPress={(checked) => {
                            // setChecked(!checked)
                            setFieldValue("assessment.hasNoNewAllergies", checked ?? null);
                        }}
                    />
                    <BouncyCheckbox
                        size={25}
                        style={{marginTop:10}}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="New Allergy"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6,}}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center'}}
                        onPress={(checked) => {
                            // setChecked(!checked)
                            setFieldValue("assessment.hasNewAllergies", checked ?? null);
                        }}
                    />
                    </View>

                    {/* ADD NEW ALLERGY FORM */}

                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Cardiovascular</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            
                            if (checked) {
                                Object.keys(values.assessment[cardiovascular])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.cardiovascular.${key}`, false))

                                setFieldValue("assessment.cardiovascular.wnl", checked ?? null);
                                setFieldValue("assessment.cardiovascular.other", null);
                                setIsOtherCardiovascular(false);
                            }
                            
                        }}
                    />
 
                    {cardiovascular.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.cardiovascular.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.cardiovascular.wnl", false);
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherCardiovascular(checked);
                                    setFieldValue("assessment.cardiovascular.other", null);
                                }}
                            />

                            {
                                isOtherCardiovascular === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.cardiovascular.other")}
                                    value={values.assessment.cardiovascular.other}
                                />
                                : null
                            }

                    </View>
                </View>


                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Respiratory</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            //setIsOtherRespiratory(checked);
                            if (checked) {
                                Object.keys(values.assessment[respiratory])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.respiratory.${key}`, false))

                                setFieldValue("assessment.respiratory.wnl", checked ?? null);
                                setFieldValue("assessment.respiratory.other", null);
                                setIsOtherRespiratory(false);
                            }
                            
                        }}
                    />
                    
                    {respiratory.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.respiratory.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.respiratory.wnl", false);
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherRespiratory(checked);
                                    setFieldValue("assessment.respiratory.other", null);
                                }}
                            />

                            {
                                isOtherRespiratory === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.respiratory.other")}
                                    value={values.assessment.respiratory.other}
                                />
                                : null
                            }

                    </View>
                </View>


                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Genitourinary</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            
                            if (checked) {
                                Object.keys(values.assessment[genitourinary])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.genitourinary.${key}`, false))

                                setFieldValue("assessment.genitourinary.wnl", checked ?? null);
                                setFieldValue("assessment.genitourinary.other", null);
                                setIsOthergenitourinary(false);
                            }
                            
                        }}
                    />

                    {genitourinary.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.genitourinary.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.genitourinary.wnl", false)
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherGenitourinary(checked);
                                    setFieldValue("assessment.genitourinary.other", null);
                                }}
                            />

                            {
                                isOtherGenitourinary === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.genitourinary.other")}
                                    value={values.assessment.genitourinary.other}
                                />
                                : null
                            }

                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Endocrine</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            
                            if (checked) {
                                Object.keys(values.assessment[endocrine])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.endocrine.${key}`, false))

                                setFieldValue("assessment.endocrine.wnl", checked ?? null);
                                setFieldValue("assessment.endocrine.other", null);
                                setIsOtherendocrine(false);
                            }
                            
                        }}
                    />

                    {endocrine.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (
                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.endocrine.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.endocrine.wnl", false)
                                }}
                            />
                    ))}
                            <BouncyCheckbox
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherEndocrine(checked);
                                    setFieldValue("assessment.endocrine.other", null);
                                }}
                            />
                            {
                                isOtherEndocrine === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.endocrine.other")}
                                    value={values.assessment.endocrine.other}
                                />
                                : null
                            }
                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>GastroIntestinal</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            
                            if (checked) {
                                Object.keys(values.assessment[gastroIntestinal])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.gastroIntestinal.${key}`, false))

                                setFieldValue("assessment.gastroIntestinal.wnl", checked ?? null);
                                setFieldValue("assessment.gastroIntestinal.other", null);
                                setIsOthergastroIntestinal(false);
                            }
                            
                        }}
                    />

                    {gastroIntestinal.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.gastroIntestinal.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.gastroIntestinal.wnl", false)
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherGastroIntestinal(checked);
                                    setFieldValue("assessment.gastroIntestinal.other", null);
                                }}
                            />

                            {
                                isOtherGastroIntestinal === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.gastroIntestinal.other")}
                                    value={values.assessment.gastroIntestinal.other}
                                />
                                : null
                            }

                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Neurological</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            if (checked) {
                                Object.keys(values.assessment[neurological])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.neurological.${key}`, false))

                                setFieldValue("assessment.neurological.wnl", checked ?? null);
                                setFieldValue("assessment.neurological.other", null);
                                setIsOtherneurological(false);
                            }
                            
                        }}
                    />

                    {neurological.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.neurological.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.neurological.wnl", false)
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherNeurological(checked);
                                    setFieldValue("assessment.neurological.other", null);
                                }}
                            />

                            {
                                isOtherNeurological === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.neurological.other")}
                                    value={values.assessment.neurological.other}
                                />
                                : null
                            }

                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Activity</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            if (checked) {
                                Object.keys(values.assessment[activity])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.activity.${key}`, false))

                                setFieldValue("assessment.activity.wnl", checked ?? null);
                                setFieldValue("assessment.activity.other", null);
                                setIsOtheractivity(false);
                            }
                            
                        }}
                    />

                    {activity.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.activity.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.activity.wnl", false)
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherActivity(checked);
                                    setFieldValue("assessment.activity.other", null);
                                }}
                            />

                            {
                                isOtherActivity === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.activity.other")}
                                    value={values.assessment.activity.other}
                                />
                                : null
                            }

                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Psychosocial</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            if (checked) {
                                Object.keys(values.assessment[psychosocial])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.psychosocial.${key}`, false))

                                setFieldValue("assessment.psychosocial.wnl", checked ?? null);
                                setFieldValue("assessment.psychosocial.other", null);
                                setIsOtherpsychosocial(false);
                            }
                            
                        }}
                    />

                    {psychosocial.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.psychosocial.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.psychosocial.wnl", false);
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherPsychosocial(checked);
                                    setFieldValue("assessment.psychosocial.other", null);
                                }}
                            />

                            {
                                isOtherPsychosocial === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.psychosocial.other")}
                                    value={values.assessment.psychosocial.other}
                                />
                                : null
                            }

                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Home</Text>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}> */}
                    <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                    <BouncyCheckbox          
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text="WNL"
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                        onPress={(checked) => {
                            if (checked) {
                                Object.keys(values.assessment[homeEnvironment])
                                    .filter(key => key !== "wnl")
                                    .forEach(key => setFieldValue(`assessment.homeEnvironment.${key}`, false))

                                setFieldValue("assessment.homeEnvironment.wnl", checked ?? null);
                                setFieldValue("assessment.homeEnvironment.other", null);
                                setIsOtherhomeEnvironment(false);
                            }
                            
                        }}
                    />

                    {homeEnvironmentSafety.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map(field => (

                            <BouncyCheckbox
                                key={field.id}
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text={field.name}
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    // setChecked(!checked)
                                    setFieldValue(`assessment.homeEnvironment.${field.id}`, checked ?? null);
                                    setFieldValue("assessment.homeEnvironment.wnl", false)
                                }}
                            />
                        
                    ))}

                            <BouncyCheckbox
                                
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="Other"
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                onPress={(checked) => {
                                    setIsOtherSafety(checked);
                                    setFieldValue("assessment.homeEnvironment.other", null);
                                }}
                            />

                            {
                                isOtherSafety === true ? 
                                <TextInput style={styles.textInput}
                                    mode="outlined"
                                    outlineColor="#026DA9"
                                    label="Other"
                                    autoCapitalize="none"
                                    onChangeText={handleChange("assessment.homeEnvironment.other")}
                                    value={values.assessment.homeEnvironment.other}
                                />
                                : null
                            }

                    </View>
                </View>
                

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:16}}>Other Notes</Text>
                    <TextInput style={[styles.newTextInput]}
                        multiline={true}
                        numberOfLines={4}
                        mode="outlined"
                        outlineColor="#026DA9"
                        label="Other Notess"
                        autoCapitalize="none"
                        onChangeText={handleChange("assessment.noteAssessment")}
                        value={values.assessment.noteAssessment}
                    />
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:16}}>Pain Screen</Text>
                    <View>
                        <Text style={{fontSize:14,marginLeft:13,marginTop:5}}>Pain Level (0-10)</Text>
                        <Slider
                            style={{width: 350, height: 40}}
                            minimumValue={0}
                            step={0.1}
                            maximumValue={1}
                            thumbTintColor="#026DA9"
                            minimumTrackTintColor="#026DA9"
                            maximumTrackTintColor="#000000"
                            onValueChange={(value) => {
                                setSliderVal(value*10);
                                setFieldValue("assessment.painLevel", value);

                                if (value < 1) {
                                    setFieldValue("assessment.painCriteria.location", null);
                                    setFieldValue("assessment.painCriteria.currentIntervention", null);
                                    painType.forEach(field => {
                                        setFieldValue(`assessment.painType[${field.id}]`, null);
                                    })
                                }
                            }}
                        />
                        <Text style={{fontSize:18,marginLeft:13,marginTop:0, fontWeight:"bold", backgroundColor:"#026DA9", borderRadius:60, width:35, height:35, textAlign:"center", textAlignVertical:"center", color:"#fff", left: left}}>{Math.floor(sliderVal)}</Text>
                    </View>

                    <View>
                        
                        {
                        sliderVal > 0 ?
                        <View>
                            <Text style={{fontSize:14,marginLeft:13,marginTop:16}}>Pain Type</Text>
                            {painType.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                            .map(field => (

                                <BouncyCheckbox
                                    key={field.id}
                                    size={25}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text={field.name}
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginTop:16 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:16, marginRight:24 }}
                                    onPress={(checked) => {
                                        // setChecked(!checked)
                                        setFieldValue(`assessment.painType[${field.id}]`, checked ?? null);
                                    }}
                                />
                            
                            ))}
                            <View>
                                <Text style={{fontSize:14,marginLeft:13,marginVertical: 16}}>Pain Criteria</Text>
                                <View>
                                    <TextInput style={styles.newTextInput}
                                        mode="outlined"
                                        outlineColor="#026DA9"
                                        label="Location"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("assessment.painCriteria.location")}
                                        value={values.assessment.painCriteria.location}
                                    />
                                    <TextInput style={styles.newTextInput}
                                        mode="outlined"
                                        outlineColor="#026DA9"
                                        label="Current Intervention"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("assessment.painCriteria.currentIntervention")}
                                        value={values.assessment.painCriteria.currentIntervention}
                                    />
                                </View>
                            </View>
                        </View> 
                        : null
                    }
                    </View>

                    
                </View>
                
            </ScrollView>
        </View>
    )

    // function onPressRadioButton(radioButtonsArray) {
    //     setRadioButtons(radioButtonsArray);
    // }
    

};

export default Assessment;

const styles = StyleSheet.create({

    textInput: {
        marginLeft:10,
        height:55,
        width:'95%',
        borderRadius: 5,
        color:'black',
        position:'absolute'
    },
    newTextInput: {
        marginLeft:10,
        height:55,
        width:'95%',
        borderRadius: 5,
        color:'black',
        marginBottom:16
    },
    container: {
        height: 60, 
        marginTop:20,
        backgroundColor:'red'
    },

    labelContainer: {
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
    submitbutton: {
        backgroundColor:'#ACD576',
        width:140,
        height:35,
        marginTop:20,
        borderRadius:5,
        justifyContent:'space-evenly',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    increment : {
        backgroundColor:'#e6ecf0',
        marginLeft:200,
        justifyContent:'center',
        height:20,
        width:20,
        alignItems:'center'
    },
    decrement: {
        backgroundColor:'#e6ecf0',
        marginTop:20,
        marginLeft:-20,
        justifyContent:'center',
        height:15,
        width:20,
        alignItems:'center'
    }
})