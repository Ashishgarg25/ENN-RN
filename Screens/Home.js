import React, { useState,useEffect } from 'react';
import {View,Text,Image,ScrollView,FlatList,StyleSheet, Modal, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entyo from 'react-native-vector-icons/Entypo'
import axiosInstance from './Api/APIConfig'
import globalvariable from '../Global/globalvariable'
import PriorVisitNote from '../Components/PriorVisitNote';
import { Menu, Divider, Provider } from 'react-native-paper';

const Home = ({navigation,route}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [isModalDataLoading, setIsModalDataLoading] = useState(false);

    const [patientId, setPatientId] = useState("");
    
    useEffect(() => {
        getAllPatients();
        // mypatientAPICall();
    }, [])

    const getAllPatients = () => {
        axiosInstance({
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${globalvariable.token}`
            },
            url: "/my-patients"
        }).then(res => {
            setData(res.data._embedded.patientOutDtoList);
            // res.data._embedded.patientOutDtoList.map(item => {
            //     console.log(item)
            // })
            setLoading(false)
        })
    }

    const [primaryisShown,setPrimaryisShown] = useState(false)
    const [Data,setData] = useState(globalvariable.alldata)
    const [showAllRecord, setShowAllRecord] = useState()
    

    const showFullRecord = (item) => {
        setPatientId(item.id)
        setModalVisible(true);
    }

    const onRefresh = () => {
        getAllPatients();
    }

    const logOut = () => {
        axiosInstance.post('https://idp.devportals.nufactor.com/nurse/logout')
            .then(res => {
                console.log("LOGOUT WORKING",res.data);
                globalvariable.token = "";
                navigation.navigate('signoff')
            })
    }

    if(loading){
        return(
            <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" color="#026DA9" />
            </View>
        )
    }else{
        return(
            <Provider>
                <View style={{flex:1, backgroundColor:"#fff"}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems: "center", marginHorizontal:16}}>
                        <Image style={{
                                
                                width:'75%',
                                resizeMode:'contain',
                                }}
                                source={require('../Images/logo.png')}
                        />
                        <Menu
                            style={{marginTop:36}}
                            visible={showProfile}
                            onDismiss={() => setShowProfile(false)}
                            anchor={<FontAwesome5 name="user-circle" size={28} color="#026DA9" style={{marginRight:16}} onPress={() => setShowProfile(true)} />}>
                            <Menu.Item icon="account" onPress={() => navigation.navigate('Profile')} title="Profile" />
                            <Divider />
                            <Menu.Item icon="exit-to-app" onPress={() => logOut()} title="Logout" />
                        </Menu>
                    </View>

                    

                    <View style={{flexDirection:'row',marginTop:20,marginLeft:10}}>
                    <Foundation 
                    name="clipboard-notes" 
                    size={40} color='#026DA9'
                    >
                    </Foundation>
                    <Text style={styles.bannerText}>
                        Your Patients
                        </Text> 
                    <TouchableOpacity 
                        style={styles.bannerButton}
                        onPress={() => navigation.navigate('Addvisitnote')}>
                            <AntDesign style={{marginTop:5,marginLeft:10}}
                                name='plus'
                                size={20}
                                color='#026DA9'
                            >
                            </AntDesign>
                            <Text style={{color:'#026DA9',marginTop:5, paddingHorizontal:12}}>
                                Add Patients
                            </Text>
                    </TouchableOpacity>
                    </View>
                    <FlatList
                        data={Data}
                        onRefresh={() => onRefresh()}
                        refreshing={loading}
                        renderItem={({item}) => {
                        return(
                            <>
                            <View style={styles.patientView}>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{color: "#767676"}}>{item.mpi}</Text>
                                <Text>{item.firstname} {item.lastname} ({new Date().getFullYear() - new Date(item.dob).getFullYear()} yrs)
                                </Text>
                            </View>
                            <Text>{item.visitNumber}</Text>
                        <TouchableOpacity  style={{borderLeftWidth:1,marginLeft:10}} onPress={() => {
                            setPrimaryisShown(!primaryisShown)
                        }}>
                            <AntDesign style={{marginLeft:25}} name={ !primaryisShown ? 'right' : 'down'} size={22}></AntDesign>
                        </TouchableOpacity>
                    </View>
                    { primaryisShown &&  
                    <View style={styles.primaryView}>
                        <View style={{flexDirection:'column',justifyContent:'space-evenly'}}>
                            <Text>{item.primaryDiagnosis.icdCode}</Text>
                            <Text>{item.secondaryDiagnosis.icdCode}</Text>
                        </View>
                        <View style={styles.secondaryView}>
                                <TouchableOpacity onPress={() => showFullRecord(item)}>
                                    <FontAwesome5 
                                    style={{marginRight:20}} 
                                    name='eye' 
                                    size={20}
                                    color='#026DA9'
                                >    
                                    </FontAwesome5>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("AssessmentPage", {
                                    mpiData: item
                                })}>
                                    <MaterialCommunityIcons 
                                    style={{marginRight:15}} 
                                    name='note-plus' 
                                    size={23}
                                    color='#026DA9'
                                >    
                                    </MaterialCommunityIcons>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <AntDesign 
                                    style={{marginRight:5}} 
                                    name='filetext1' 
                                    size={20}
                                    color='#026DA9'
                                >   
                                    </AntDesign>
                                </TouchableOpacity>
                        </View>
                    </View>
                    }
                    </>
                        )
                    }}
                    >
                    </FlatList>
        
                    {/* DISPLAY PATIENT DATA IN MODAL */}

                    <Modal
                        transparent={false}
                        visible={modalVisible}
                        animationType="slide"
                        onDismiss={() => setModalVisible(false)}
                    >
                        <PriorVisitNote
                            visibility = {modalVisible}
                            setVisibility = {setModalVisible}
                            patientId={patientId}
                        />
                    </Modal>
        
                </View>
            </Provider>
        )
    }

    
};

export default Home;

const styles = StyleSheet.create({
    bannerText :{
        color:'#026DA9',
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
        marginLeft:6
    },
    bannerButton :{
        marginTop:6,
        borderColor:'#026DA9',
        borderWidth:1,
        height:30,
        // width:120,
        marginLeft:80,
        height:32,
        borderRadius:5,
        flexDirection:'row',
    },
    patientView :{
        flexDirection:'row',
        marginTop:30,
        marginLeft:10,
        marginRight:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    primaryView :{
        flexDirection:'row',
        marginTop:15,
        marginLeft:10,
        marginRight:10,
    },
    secondaryView :{
        flexDirection:'row',
        marginTop:15,
        marginLeft:225,
        marginBottom:10
    },

})