import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,FlatList } from 'react-native'
import {TextInput, HelperText} from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FieldArray, useFormikContext} from "formik";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import globalvariable from '../Global/globalvariable'

const symptoms = ["Improved", "Unchanged", "Deteriorated"];
const progress = ["Good", "Fair", "Poor"];

const Response = ({mpiData}) => {

    const {values, handleChange, setFieldValue, errors, handleBlur} = useFormikContext();
    const [addvisible,setaddvisible] = useState(false)
    const [modalcalendarvisible,setModalcalendarvisible] = useState(false)
    const [visitdate,setVisitdate] = useState("")
    const [lotno,setLotno] = useState("")
    const [itemState,setitemState] = useState("")
    const [allergies,setAllergies] = useState("")
    const [additionalNotes,setAdditionalnotes] = useState("")
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
            <Text style={styles.bannertext}>RESPONSE</Text>

            <ScrollView>
                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Response Of Summary</Text>
                    <View>
                        <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Symptom</Text>
                        <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>

                        {
                            symptoms.map(field => (
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text={field}
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12,textAlign:'center',marginRight:15}}
                                    onPress={(checked) => {
                                        // setChecked(!checked)
                                        setFieldValue("response.symptom", checked);
                                    }}
                                />
                            ))
                        }
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize:16,marginLeft:13,marginTop:5}}>Progress towards goal</Text>
                        <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',marginLeft:20}}>
                        {
                            progress.map(field => (
                                <BouncyCheckbox
                                    size={25}
                                    style={{marginTop:10}}
                                    fillColor="#026DA9"
                                    unfillColor="#FFFFFF"
                                    text={field}
                                    iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginRight:15,textAlign:'center' }}
                                    onPress={(checked) => {
                                        // setChecked(!checked)
                                        setFieldValue("response.progressTowardGoals", checked);
                                    }}
                                />
                            ))
                        }
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Additional Nurse Notes</Text>
                    <TextInput style={styles.textInput}
                        multiline={true}
                        numberOfLines={5}
                        mode="outlined"
                        outlineColor="#026DA9"
                        label="Additional Nurse Notes"
                        autoCapitalize="none"
                        onChangeText={handleChange("response.additionalNurseNotes")}
                        onBlur={handleBlur("response.additionalNurseNotes")}
                        value={values.response.additionalNurseNotes}
                        
                    />
                </View>
                <View>
                    <Text style={{fontSize:20,marginLeft:13,marginTop:5}}>Record IG Lot and Expiration</Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginTop:10,width:'95%'}}>
                <View style={{borderRadius:5,borderColor:'grey',borderWidth:1}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5}}>
                <Text >Add Info</Text>
                <TouchableOpacity 
                    style={styles.bannerButton}
                    onPress={() => {setaddvisible(true)}}
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
                <FlatList
                    data={globalvariable.responsearray}
                    extraData={globalvariable.responsearray}
                    renderItem={({item,index}) => 
                    <View style={{width:'95%'}}>
                        <View style={{flexDirection:'row',borderWidth:1,marginTop:5,marginLeft:20,borderRadius:5,width:'95%'}}>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.visitdate}</Text>
                                <Text style={{fontSize:15,marginLeft:5,color:'#7e7e7e',marginTop:5}}>{item.lotno}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.delete}
                                onPress={(index) => {
                                    globalvariable.responsearray.splice(index,1)
                                    setitemState("")
                                    console.log(globalvariable.responsearray)
                            }}>
                                <AntDesign style={{marginLeft:5}}
                                    name='delete'
                                    size={20}
                                    color='red'>
                                </AntDesign>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                    keyExtractor={item => item.id}>
                </FlatList> 
            </View>
        </View>
            </ScrollView>
            <Modal
                isVisible={modalcalendarvisible}
                avoidKeyboard={true}
                onBackdropPress={() => {
                setModalcalendarvisible(false)
                }}
                >
                {opencalendar()}
            </Modal>
            <Modal
                isVisible={addvisible}
                avoidKeyboard={true}
                onBackdropPress={() => {
                    setaddvisible(false)
                    }}
            >
                {openadd()}
            </Modal>

        </View>
    )

    function openadd() {
        return(
            <View style={{flex:1,width:'95%',backgroundColor:'white',marginLeft:10}}>
            <View style={{flexDirection:'column',marginTop:50}}>
                <Text style={{fontSize:15,marginLeft:15}}>Lot No</Text>
                <TextInput style={{
                    borderWidth:1,
                    borderColor:'grey',
                    width:'95%',
                    borderRadius:5,
                    marginLeft:10
                }}
                onChangeText={(text) => setLotno(text)}
                >
                </TextInput>
            </View>
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
                }}>
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
                    globalvariable.responsearray.push({lotno,visitdate})
                }}>
                    <AntDesign style={{marginLeft:5}}
                        name='plus'
                        size={20}
                        color='#026DA9'>
                    </AntDesign>
                    <Text style={{color:'#026DA9',fontWeight:'bold',fontSize:20}}>
                        Add 
                    </Text>
                </TouchableOpacity>
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

export default Response

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

})
