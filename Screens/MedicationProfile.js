import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity,FlatList } from 'react-native'
import {TextInput, DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import globalvariable from '../Global/globalvariable'
import {FieldArray, useFormikContext} from 'formik';

const MedicationProfile = ({mpiData}) => {

    const {values, handleChange, handleBlur, handleSubmit} = useFormikContext();
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [addvisible,setaddvisible] = useState(false)
    const [med,setMed] = useState("")
    const [modalcalendarvisible,setModalcalendarvisible] = useState(false)
    const [visitdate,setVisitdate] = useState("")
    const [itemState,setitemState] = useState(false)
    const [dose,setDose] = useState("")
    const [freq,setFreq] = useState("")
    const [medname,setMedname] = useState("")
    const [textview,setTextview] = useState(true)
    const [medprofileadditionalnotes,setMedprofileadditionalnotes] = useState("")

    const datechange = (item) =>{
        setVisitdate(item)
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
            <Text style={styles.bannertext}>MEDICATION PROFILE</Text>

            <ScrollView>

                <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Medication Profile</Text>
                        <TouchableOpacity style={styles.submitBtn} onPress={showModal}>
                            <Text style={{color:'#000',fontSize:16,textAlign:'center'}}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Medication Name</DataTable.Title>
                            <DataTable.Title>Dose</DataTable.Title>
                            <DataTable.Title>Frequency</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Title>Action</DataTable.Title>
                        </DataTable.Header>

                        

                    </DataTable> */}
                </View>

                <View>
                    <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Additional Notes</Text>
                    <TextInput style={styles.textInput}
                        multiline={true}
                        numberOfLines={5}
                        mode="outlined"
                        outlineColor="#026DA9"
                        label="Additional Notes"
                        autoCapitalize="none"
                        onChangeText={handleChange("medicationProfile.notes")}
                        onBlur={handleBlur("medicationProfile.notes")}
                        value={values.medicationProfile.notes}
                        
                    />
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:15,width:'95%'}}>
                <Text style={{color:'grey',fontSize:20,fontWeight:'bold'}}>Write Lots and exp(s) from Vials</Text>
                <View style={{borderRadius:5,borderColor:'grey',borderWidth:1}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5}}>
                <Text >Add Info</Text>
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
                    <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20}}>
                        Add 
                    </Text>
                </TouchableOpacity>
                </View>
                {textview &&
                    <Text style={{fontSize:15,marginLeft:50,color:'#7e7e7e',marginTop:5}}>Add medications!</Text>
                }
                <FlatList
                        data={globalvariable.medprofile}
                        extraData={globalvariable.medprofile}
                        renderItem={({item,index}) => 
                        <View style={{width:'95%'}}>
                            <View style={{flexDirection:'row',borderWidth:1,marginTop:5,marginLeft:20,borderRadius:5,width:'95%'}}>
                                <View style={{flexDirection:'column'}}>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.visitdate}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.freq}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.delete}
                                    onPress={(index) => {
                                        globalvariable.medprofile.splice(index,1)
                                        setitemState("")
                                        console.log(globalvariable.medprofile)
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
                        keyExtractor={item => item.id}>
                </FlatList> 
                </View>
            </View>

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={{color:'#000',fontSize:16,textAlign:'center'}}>SAVE & SUBMIT</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal> */}
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
                isVisible={modalcalendarvisible}
                avoidKeyboard={true}
                onBackdropPress={() => {
                setModalcalendarvisible(false)
                }}
                >
                {opencalendar()}
            </Modal>
        
        </View>
    )
    
    function openadd() {
        return(
            <View style={{flex:1,width:'95%',backgroundColor:'white',marginLeft:10}}>
                <View style={{flexDirection:'column',marginTop:50}}>
                <Text style={{fontSize:15,marginLeft:15}}>Medication Name</Text>
                <TextInput style={{
                    borderWidth:1,
                    borderColor:'grey',
                    width:'95%',
                    height:50,
                    borderRadius:5,
                    marginLeft:10
                }}
                    onChangeText={(text) => setMedname(text)}
                >
                </TextInput>
                <Text style={{fontSize:15,marginLeft:15,marginTop:5}}>Dose</Text>
                <TextInput style={{
                    borderWidth:1,
                    borderColor:'grey',
                    width:'95%',
                    height:50,
                    borderRadius:5,
                    marginLeft:10
                }}
                    onChangeText={(text) => setDose(text)}
                >
                </TextInput>
                {/* <Dropdown
                    data={dose2}
                    containerStyle={{width:'95%',borderWidth:1,height:50,borderRadius:5,marginLeft:10,marginTop:15}}
                    style={{height:50,backgroundColor:'transparent'}}
                    icon="chevron-down"
                    label="Dose"
                    onChangeText={(value) => {
                    setDose(value)
                    }}
                >
                </Dropdown> */}
                {/* Need To Add from API */}
                {/* <Dropdown
                    data={globalvariable.frequencyList}
                    containerStyle={{width:'95%',borderWidth:1,height:50,borderRadius:5,marginLeft:10,marginTop:15}}
                    style={{height:50,backgroundColor:'transparent'}}
                    icon="chevron-down"
                    label="Frequency"
                    onChangeText={(value) => {
                    setFreq(value)
                    }}
                >
                </Dropdown> */}
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',marginLeft:20,marginRight:0,marginVertical:20,flex:1}}>
                        <Text>
                           Visit Date* 
                        </Text>
                        <Text>{visitdate}</Text>
                        <View style={{height:1,backgroundColor:'grey',marginTop:10,width:'108%'}}></View>
                    </View>
                    <TouchableOpacity style={{marginTop:30,marginRight:15}} onPress={() => {
                            setModalcalendarvisible(true) 
                            }} >
                            <MaterialCommunityIcons name='calendar' size={25} color='#9F9F9F'/>
                        </TouchableOpacity>
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
                                setaddvisible(false)
                                globalvariable.medprofile.push({medname,dose,freq,visitdate})
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
            </View>
                
            </View>
        )
    }
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
                    onDayPress={(day) => {
                    setModalcalendarvisible(false)
                    datechange(day.dateString)
                    console.log(visitdate,day.dateString)
                    }}
                    enableSwipeMonths={true}
                />
            </View>
        )   
    }

}

export default MedicationProfile

const styles = StyleSheet.create({
    submitBtn: {
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
    textInput: {
        flex: 1, 
        marginVertical: 0, 
        marginLeft: 16, 
        marginRight: 16
    },
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
})
