import React, { useState,useEffect } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { FilledTextField } from 'react-native-material-textfield';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFormikContext} from "formik";
// import * as yup from "yup";
import axiosInstance from './Api/APIConfig';
import globalvariable from '../Global/globalvariable';
import Basic from './Basic';
import Assessment from './Assessment';
import Access from './Access';
import Medication from './Medication';
import Administration from './Administration';
import Response from './Response';
import MedicationProfile from './MedicationProfile';

import moment from 'moment';

const Note = (props) => {

    const {
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        handleBlur,
        errors,
        touched
    } = useFormikContext();

    const { navigation, patient } = props;

    // var today = new Date()

    const [modalcalendarvisible,setModalcalendarvisible] = useState(false)
    const [visitdate,setVisitdate] = useState("");

    const [ modalTimeIn, setModalTimeIn ] = useState(false);
    const [timeIn,setTimeIn] = useState(new Date());
    const [ timeInShow, setTimeInShow ] = useState("");

    const [timeOut,setTimeOut] = useState(new Date());
    const [ modalTimeOut, setModalTimeOut ] = useState(false);
    const [ timeOutShow, setTimeOutShow ] = useState("");

    const [modaltimein,setModaltimein] = useState(false)
    const [modaltimeout,setModaltimeout] = useState(false)

    const [count, setCount] = useState(0)

    const items = [
        {label: 'Bleeding Disorder', value: 'bleedingDisorder' },
        {label: 'Immnue Globulin', value: 'immuneGlobulin' },
        {label: 'Monoclonal Antibody', value: 'monoclonalAntibody' },
        {label: 'Miscellaneous', value: 'miscellaneous'}
    ]

    const getBulkData = (item) => {

        // console.log(item.label)

        axiosInstance({
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                authorization: `Bearer ${globalvariable.token}`
            },
            url: `https://api.devnurseportal.nufactor.com/nursing-portal/bulk-data/assessment-dropdowns/all?filterBy=${item.value}`
        })
            .then(({data}) => {

                console.log(data)

                const {
                    adrList,
                    drugList,
                    drugRouteList,
                    frequencyList,
                    needleGaugeList,
                    needleLengthList,
                    preMedDrugList
                } = data;

                globalvariable.drugList = drugList.map(item => ({id: item.id, text: item.displayName}));
                globalvariable.drugRouteList = drugRouteList.map(item => ({id: item.id, text: item.shortName}));
                globalvariable.preMedDrugList = preMedDrugList.map(item => ({id: item.id, text: item.displayName}));
                globalvariable.needleGaugeList = needleGaugeList.map(item => ({id: item.id, text: item.size}));
                globalvariable.needleLengthList = needleLengthList.map(item => ({id: item.id, text: item.length}));
                globalvariable.frequencyList = frequencyList.map(item => ({id: item.id, text: item.name}));
                globalvariable.adrList = adrList;


            })
            .catch(error => {
                const {response} = error;
                const {status} = response ?? {};
                if (status === 401)
                    window.location.reload();
            })
    }

    return(
        <ScrollView contentContainerStyle={styles.note}>

            {
                count === 0 
                
                ?
                    <View>
                        <Image style={{
                            height:'10%',
                            width:300,
                            resizeMode:'contain',
                            }}
                            source={require('../Images/logo.png')}
                        />
                        <Text style={{backgroundColor:'#026DA9',textAlign:'center',fontSize:30,color:'white',marginTop:5}}>Add Note</Text>
                        <View style={{marginTop:20,alignItems:'center',}}>
                            <DropDownPicker style={{maxHeight:55,marginTop:20,width:'95%',alignItems:'center' }}
                                items={items}
                                placeholder="Note Type *"
                                placeholderStyle={{fontSize:15}}
                                onChangeItem={(item) => {
                                    setFieldValue("noteType", item.label)
                                    getBulkData(item);
                                }}
                            >
                            </DropDownPicker>
                        </View>
                        <View style={styles.usernameView}>
                            <Text style={{position:"absolute", right:16, top:24}}> { visitdate === "" ? "Visit Date*" : visitdate }</Text>
                            <TouchableOpacity style={{ marginTop: 25 }} onPress={() => {
                                setModalcalendarvisible(true) 
                                }} >
                                    
                                <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                            </TouchableOpacity>
                            
                        </View>
                        {/* { timeIn === "" ? "Time In*" : timeIn }  */}
                        <View style={styles.usernameView}>
                            <Text style={{position:"absolute", right:16, top:24}}> { timeInShow === "" ? "Time In*" : timeInShow } </Text>
                            <TouchableOpacity style={{ marginTop: 25 }} onPress={ () => setModalTimeIn(true) }>
                                <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                            </TouchableOpacity>
                            {
                                modalTimeIn && (
                                    <RNDateTimePicker value={timeIn} mode="time" onChange={(event, selectedTime) => {
                                        const val = moment(selectedTime).format("h:mm:ss a");
                                        setTimeInShow(val);
                                        setModalTimeIn(false)
                                    }} />
                                )
                            }
                        </View>

                        <View style={styles.usernameView}>
                            <Text style={{position:"absolute", right:16, top:24}}>{ timeOutShow === "" ? "Time Out*" : timeOutShow }</Text>
                            <TouchableOpacity style={{ marginTop: 25 }} onPress={ () => setModalTimeOut(true) }>
                                <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                            </TouchableOpacity>
                            {
                                modalTimeOut && (
                                    <RNDateTimePicker value={timeOut} mode="time" onChange={(event, selectedTime) => {
                                        const val = moment(selectedTime).format("h:mm:ss a");
                                        setTimeOutShow(val);
                                        setModalTimeOut(false)
                                    }} />
                                )
                            }
                        </View>
                        <Modal
                            isVisible={modalcalendarvisible}
                            avoidKeyboard={true}
                            onBackdropPress={() => {
                            setModalcalendarvisible(false)
                            }}
                        >
                            {opencalendar()}
                        </Modal>

                        {/* <Modal
                            isVisible={modaltimein}
                            avoidKeyboard={true}
                            onBackdropPress={() => {
                                setModalTimeIn(false)
                            }}
                        >
                            {opentimein()}
                        </Modal> */}

                      
                    </View>
                :

                count === 1 ? 
                    <Basic mpiData={patient} />
                : count === 2 ?
                    <Assessment mpiData={patient} />
                : count === 3 ?
                    <Access mpiData={patient}/>
                : count === 4 ?
                    <Medication mpiData={patient}/>
                : count === 5 ?
                    <Administration mpiData={patient}/>
                : count === 6 ?
                    <Response mpiData={patient}/>
                : count === 7 ?
                    <MedicationProfile mpiData={patient}/>
                :null
            }

            <View style={{ marginHorizontal: 16, marginBottom:16, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <TouchableOpacity
                    disabled={count === 0 ? true : false}
                    style={styles.backButton}
                    onPress={() => setCount(count - 1)}
                >
                    <Text style={{color:'#fff',fontSize:16,textAlign:'center'}}>BACK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={count === 7 ? true : false}
                    style={styles.nextButton}
                    onPress={() => setCount(count + 1)}
                >
                    <Text style={{color:'#fff',fontSize:16,textAlign:'center'}}>NEXT</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )  
    //ZQwbZWUs7MINo
    function opencalendar() {
        return(
            <View>
                <Calendar style={{marginTop:20}}
                    theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: 'green',
                    todayTextColor: 'red',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#4B5869',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: '#4B5869',
                    indicatorColor: 'blue',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    'stylesheet.calendar.basic': {
                    week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    },
                    }
                    }}
                    // current={today}
                    // minDate={today}
                    onDayPress={(day) => {
                    setModalcalendarvisible(false)
                    setVisitdate(day.dateString)
                    // console.log(visitdate,day.dateString)
                    }}
                    enableSwipeMonths={true}
                />
            </View>
        )   
    }


}

export default Note;

const styles = StyleSheet.create({
    note : {
        flex:1,
        backgroundColor:"#fff"
    },
    nextButton: {
        backgroundColor:'#026DA9',
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
    backButton: {
        backgroundColor:'#aaaaaa',
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
    usernameView: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row-reverse',
        borderBottomWidth: 1,
        borderBottomColor: "#1A1A1A",
    },
    labelTextStyleView:{
        color: '#1a1a1a', 
        marginTop: 10, 
        paddingTop: 5
    },
    textInput: {
        flex: 1, 
        marginVertical: 0, 
        marginLeft: 0, 
        marginRight: 10
    },
})