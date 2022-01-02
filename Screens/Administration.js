import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,FlatList } from 'react-native'
import {TextInput, HelperText} from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FieldArray, useFormikContext} from "formik";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalvariable from '../Global/globalvariable';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';
import Modal from 'react-native-modal';
import { noteTypesText } from '../Global/noteType';

const radioButtonsData = [
    {
    id: '1', 
    label: 'Yes',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'No',
    color:'#026DA9'
    },
    
]
const radioButtonsData2 = [
    {
    id: '1', 
    label: 'Yes',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'No',
    color:'#026DA9'
    },
]
const radioButtonsData3 = [
    {
    id: '1', 
    label: 'Yes',
    color:'#026DA9'
    }, 
    { 
    id: '2',
    label: 'No',
    color:'#026DA9'
    },
]

const Administration = ({mpiData}) => {



    const {values, handleChange, setFieldValue, errors, handleBlur} = useFormikContext();
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [radioButtons2, setRadioButtons2] = useState(radioButtonsData2)
    const [radioButtons3, setRadioButtons3] = useState(radioButtonsData3)
    const [addvisible,setaddvisible] = useState(false)
    const [modaltimein,setModaltimein] = useState(false)
    const [modaladrlist,setModalAdrlist] = useState(false)
    const [timein,setTimein] = useState("")
    const [rate,setRate] = useState("")
    const [temp,setTemp] = useState("")
    const [hr,setHr] = useState("")
    const [rr,setRr] = useState("")
    const [bpsys,setBpsys] = useState("")
    const [bpdia,setBpdia] = useState("")
    const [comm,setComm] = useState("")
    const [textview,setTextview] = useState(true)
    const [summaryinfusion,setSummaryinfusion] = useState("")
    const [itemState,setitemState] = useState(false)
    const [notifiedcheck,setNotifiedcheck] = useState(false)
    const [adrbutton,setAdrbutton] = useState(false)
    var today = new Date()

    const isBleedingDisorderNote = values.noteType === noteTypesText.BLEEDING_DISORDER;

    const instructionJSX = () => {
        const noteType = values.noteType;
        if (noteType === noteTypesText.MONOCLONAL_ANTIBODY){
            return(
                <View style={{backgroundColor: "#E8F4FD", padding: 8}}>
                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>For IV: Record Vital Signs before infusion, before rate change (if applicable) and every 30 minutes in patients who have not experienced an infusion related reaction or minimally every 15 minutes in patients who have had a past history of an infusion related reaction and at the end of the infusion.</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingLeft: 6}}>For SC: Record vital signs at baseline, end of infusion & if clinical signs warrant.</Text>
                    </View>
                </View>
            )
        }else if(noteType === noteTypesText.BLEEDING_DISORDER){
            return null;
        }else{
            return(
                <View style={{backgroundColor: "#E8F4FD", padding: 8}}>
                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>Ensure hypertension patient is compliant with blood pressure medications.</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>Contact Nufactor if:</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 12}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>Before starting IVIG, if baseline SBP {'>'} 140mm Hg (age {'>'} 60 yr), SBP {'>'} 150mm Hg (age {'>'} 60 yr) or DBP {'>'} 90mm Hg.</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 12}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>During IVIG, if increase or decrease in SBP {'>'} 20MM Hg or DBP {'>'} 10 mm Hg from baseline.</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingHorizontal: 6}}>For IV, record vital signs at baseline, 15 minutes into infusion, every rate change, hourly once maximum rate achieved and end of infusion. If vital signs fluctuate, monitor every 15 min until stable.</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent:"center", alignItems:"flex-start", paddingLeft: 6}}>
                        <AntDesign name="arrowright" size={24} color="#026DA9" />
                        <Text style={{paddingLeft: 6}}>For SC: Record vital signs at baseline, end of infusion & if clinical signs warrant.</Text>
                    </View>
                </View>
            )
        }
    }

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
            <Text style={styles.bannertext}>ADMINISTRATION</Text>

            <ScrollView>
                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>IG Infusion Documentation</Text>
                   
                    {instructionJSX()}

                    <View style={{borderWidth:1,borderRadius:10,width:'95%',marginLeft:10,marginTop:10}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:5}}>
                    <Text style={{textAlign:'center'}}>Add Info</Text>
                    <TouchableOpacity 
                        style={styles.bannerButton}
                        onPress={() => {setaddvisible(true),setTextview(!textview)}}
                    >
                        <AntDesign style={{marginLeft:5}}
                                name='plus'
                                size={20}
                                color='#026DA9'
                        >
                        </AntDesign>
                        <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20,alignSelf:'center'}}>
                            Add 
                        </Text>
                    </TouchableOpacity> 
                </View>
                {textview &&
                    <Text style={{fontSize:15,marginLeft:50,color:'#7e7e7e',marginTop:5}}>Add medications!</Text>
                }
                <FlatList
                    data={globalvariable.summaryarray}
                    extraData={globalvariable.summaryarray}
                    renderItem={({item,index}) => 
                    <View style={{width:'95%'}}>
                        <View style={{flexDirection:'row',borderWidth:1,marginTop:5,marginLeft:20,borderRadius:5,width:'95%'}}>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.timein} {item.rate}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.rr} {item.hr}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.bpsys} {item.bpdia}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.rate}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.comm}</Text>
                            </View>
                        <TouchableOpacity 
                            style={styles.delete}
                            onPress={(index) => {
                            globalvariable.summaryarray.splice(index,1)
                            setitemState("")
                        }}>
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
                    keyExtractor={item => item.id}>
                </FlatList>
            </View>

                </View>
            <View style={{borderColor:'black',marginTop:10,borderWidth:1,borderRadius:10,width:'95%',marginLeft:10}}>
                <Text style={{color:'grey',fontSize:15,marginLeft:15}}>Any ADR during infusion?</Text>
                    <View style={{flexDirection:'row'}}>
                        <RadioGroup
                            style={{flexDirection:'row'}}
                            radioButtons={radioButtons}
                            onPress={onPressRadioButton,
                            (radioButtons) => {
                                if(radioButtons[0].selected === true){
                                    setNotifiedcheck(!notifiedcheck)
                                    setAdrbutton(!adrbutton)
                                }
                                else{
                                    setNotifiedcheck(!notifiedcheck)
                                    setAdrbutton(!adrbutton)
                                }
                            }}
                            layout='row'
                            containerStyle={{height:150}}
                            labelStyle={{color:'#026DA9'}}>
                        </RadioGroup>
                    </View>
                    { adrbutton &&
                    <View>
                    <Text style={{color:'grey',fontSize:15,marginLeft:15}}>What ADR ?</Text>
                    <TouchableOpacity style={styles.addAdr}
                        onPress={() => setModalAdrlist(true)}
                    >
                    <AntDesign style={{marginLeft:5}}
                                name='plus'
                                size={20}
                                color='#026DA9'
                        >
                        </AntDesign>
                        <Text style={{color:'#026DA9',fontWeight:'bold'}}>Add ADR</Text>
                    </TouchableOpacity>
                    </View>
                    }
            </View>
            { notifiedcheck &&
            <View style={{borderColor:'black',marginTop:10,borderWidth:1,borderRadius:10,width:'95%',marginLeft:10}}>
                <Text style={{color:'grey',fontSize:15,marginLeft:15}}>Was Nufactor notified of interruption?</Text>
                    <View style={{flexDirection:'row'}}>
                        <RadioGroup
                            style={{flexDirection:'row'}}
                            radioButtons={radioButtons2}
                            onPress={onPressRadioButton2}
                            layout='row'
                            containerStyle={{height:150}}
                            labelStyle={{color:'#026DA9'}}>
                        </RadioGroup>
                    </View>
            </View>
            }
            <View style={{borderColor:'black',marginTop:10,borderWidth:1,borderRadius:10,width:'95%',marginLeft:10}}>
                <Text style={{color:'grey',fontSize:15,marginLeft:15}}>Was infusion slowed or stopped due to ADR?</Text>
                    <View style={{flexDirection:'row'}}>
                        <RadioGroup
                            style={{flexDirection:'row'}}
                            radioButtons={radioButtons3}
                            onPress={onPressRadioButton3}
                            layout='row'
                            containerStyle={{height:150}}
                            labelStyle={{color:'#026DA9'}}>
                        </RadioGroup>
                    </View>
            </View>
                <View>
                    <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Administration of infusion</Text>
                    <TextInput style={{width:"95%",marginLeft:10,borderRadius:10}}
                        multiline={true}
                        numberOfLines={5}
                        mode="outlined"
                        outlineColor="#026DA9"
                        label="Administration of infusion"
                        autoCapitalize="none"
                        onChangeText={handleChange("administration.summaryOfInfusion")}
                        onBlur={handleBlur("administration.summaryOfInfusion")}
                        value={values.administration.summaryOfInfusion}
                        
                    />
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
            <Modal
                isVisible={modaladrlist}
                avoidKeyboard={true}
                onBackdropPress={() => {
                    setModalAdrlist(false)
                    }}
            >
                {openadrlist()}
            </Modal>

        </View>
    )


function openadd() {
    return(
        <View style={{flex:1,backgroundColor:'white',alignSelf:'center',width:'95%'}}>
            <ScrollView>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                <View style={{flexDirection:'column',marginLeft:20,marginRight:0,marginVertical:20,flex:1}}>
                    <Text>
                       Time in* 
                    </Text>
                    <Text>{timein}</Text>
                    <View style={{height:1,backgroundColor:'grey',width:'108%'}}></View>
                </View>
                <TouchableOpacity style={{marginTop:20,marginRight:15}} onPress={() => {
                        setModaltimein(true) 
                        }} >
                        <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                    </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:18,marginLeft:15,color:'#7e7e7e',fontWeight:'bold'}}>Rate</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    placeholder='Rate in ml/hr'
                    onChangeText={(text) => setRate(text)}
                />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>Temp</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    placeholder='°F'
                    onChangeText={(text) => setTemp(text)}
                />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>HR</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    onChangeText={(text) => setHr(text)}
                    />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>RR</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    onChangeText={(text) => setRr(text)}
                />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>BP(Systolic)</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    onChangeText={(text) => setBpsys(text)}
                />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>BP(Diastolic)</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    onChangeText={(text) => setBpdia(text)}  
                />
                <Text style={{fontSize:18,marginLeft:15,marginTop:5,color:'#7e7e7e',fontWeight:'bold'}}>Comments</Text>
                <TextInput style={{width:'90%',borderColor:'grey',height:45,borderWidth:1,marginLeft:15,borderRadius:5}}
                    onChangeText={(text) => setComm(text)}                          
                />
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
                        globalvariable.summaryarray.push({timein,rate,temp,hr,rr,bpsys,bpdia,comm})
                        console.log(globalvariable.summaryarray)
                        setaddvisible(false)
                    }}>
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

function openadrlist () {
    console.log(globalvariable.adrList)
    return(
        <ScrollView contentContainerStyle={{backgroundColor:'#fff', flexDirection:"row", flexWrap:"wrap"}}>
            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Text style={{fontSize:20,marginLeft:13,marginVertical:8}}>Select one or more ADR</Text>
                <TouchableOpacity style={{marginRight: 8}} onPress={() => setModalAdrlist(false)}>
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
           {
               globalvariable.adrList.sort((a, b) => a.adr.toLowerCase().localeCompare(b.adr.toLowerCase()))
               .map(adrType => (
                    <BouncyCheckbox
                        key={adrType.adr}
                        size={25}
                        fillColor="#026DA9"
                        unfillColor="#FFFFFF"
                        text={adrType.adr}
                        isChecked={values.administration.adrTypes && (values.administration.adrTypes.findIndex(valAdr => adrType.adr.toString().toLowerCase() === valAdr.adr.toString().toLowerCase()) !== -1)}
                        iconStyle={{ borderColor: "#026DA9", borderRadius:6, marginVertical: 6, marginLeft: 12}}
                        textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:0, marginRight:12, textDecorationLine: "none", }}
                        onPress={(checked) => {
                            // setChecked(!checked)
                        }}
                    />
               ))
           }
        </ScrollView>
    )
    
}
function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
}
function onPressRadioButton2(radioButtonsArray) {
    setRadioButtons2(radioButtonsArray);
}
function onPressRadioButton3(radioButtonsArray) {
    setRadioButtons3(radioButtonsArray);
}

}

export default Administration

const styles = StyleSheet.create({
    bannertext:{
        backgroundColor:'#026DA9',
        fontSize:30,
        color:'white',
        textAlign:'center',
        marginTop:5
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
    addAdr:{
        width:100,
        height:40,
        borderColor:'#026DA9',
        borderWidth:2,
        borderRadius:5,
        marginLeft:15,
        justifyContent:"center",
        flexDirection:'row',
        alignItems:'center',
        marginTop:5,
        marginBottom:10
    }

})
