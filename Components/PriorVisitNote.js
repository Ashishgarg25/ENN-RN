import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isValid, format} from "date-fns";
import globalvariable from '../Global/globalvariable'
import axiosInstance from '../Screens/Api/APIConfig'

const PriorVisitNote = (props) => {

    const { visibility, setVisibility, patientId } = props;
    const [isModalDataLoading, setIsModalDataLoading] = useState(true);
    const [showPriorVisitNote, setShowPriorVisitNote] = useState([]);

    useEffect(() => {
        axiosInstance({
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${globalvariable.token}`
            },
            url: `/my-patients/${patientId}/visit-notes/last`
        }).then(res => {
            console.log(res.data)
            setShowPriorVisitNote(res.data);
            setIsModalDataLoading(false)
        })
    },[])

    let set = new Set();
    set.add("string");
    set.add("number");

    /**
     * Used For extracting data from Arrays like Strings , Numbers , Booleans ,nested Arrays and nested Objects.
     * @param node
     * @param name
     */

     const forExtractingDataFromArray = (node, name = null) => {
        let container = [];
        if (name !== null) {
            container.push(<View><Text style={{fontSize:20}}>{name}</Text></View>);
        }
        node.forEach(element => {
            if (set.has(typeof element)) {
                container.push(<View>
                    <View>
                        <Text>{element}</Text>
                    </View>
                </View>)
            } else if (Array.isArray(element)) {
                container.push(<View >{forExtractingDataFromArray(element)}</View>);
            } else if (typeof element === "object") {
                container.push(<View>{forExtractingDataFromObject(element)}</View>);
            }
        })
        return container;
    }

    /**
     * Used for Extracting string and number data
     * @param node
     * @param name
     * @returns {JSX.Element}
     */

    const forExtractingStringAndNumberData = (node, name) => {
        const isDate = typeof node === "string" && isValid(new Date(node)); //if the data is a date, parse it in a format
        return (<View>
            <View>
                <Text style={{color:'black'}}>{name}</Text>
                <Text style={{color: "grey"}}>{isDate ? format(new Date(node), "MM-dd-yyyy") : node}</Text>
            </View>
        </View>);
    }

    // Used for extracting data from Booleans like true or false is converted to Yes or No.
    const forExtractingDataFromBoolean = (node, name) => {
        if (node === true) {
            return (<View>
                <View>
                    <Text>{name}</Text>
                    <Text style={{color: "grey"}}>Yes</Text>
                </View>
            </View>);
        } else {
            return (<View >
                <View>
                    <Text>{name}</Text>
                    <Text style={{color: "grey"}}>No</Text>
                </View>
            </View>);
        }
    }

    /**
     * Extracts Data from objects like Strings, Numbers ,Arrays ,Booleans and nested objects.
     * @param node
     * @param name
     * @returns {[]}
     */

     const forExtractingDataFromObject = (node, name = null) => {
        let container = [];
        if (name !== null) {
            container.push(<View><Text style={{fontSize:20}}>{"\n"}{name}</Text></View>);
        }

        for (let element in node) {
            if (node.hasOwnProperty(element) && set.has(typeof node[element])) {
                container.push(
                    <View style={{flexDirection:"row"}}>{forExtractingStringAndNumberData(node[element], element)}</View>
                );
            } else if (node.hasOwnProperty(element) && Array.isArray(node[element])) {
                container.push(<View>{forExtractingDataFromArray(node[element], element)}</View>);

            } else if (node.hasOwnProperty(element) && typeof node[element] === "object" && node[element] !== null) {
                container.push(
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:"wrap"}}>{forExtractingDataFromObject(node[element], element)}</View>
                    </View> 
                );
            } else if (node.hasOwnProperty(element) && typeof node[element] === "boolean" && node[element] !== null) {
                container.push(
                    <View style={{flexDirection:'row'}}>{forExtractingDataFromBoolean(node[element], element)}</View>
                );
            }
        }
        return container;
    }

    /**
     * Used only once for base data of Visit nate  like Strings, Numbers and Booleans.
     * @param node
     * @param name
     * @returns {JSX.Element}
     */

     const forExtractingBaseDetails = (node, name) => {
        let container = [];
        container.push(<View><Text style={{fontSize:20}}>{name}</Text></View>);
        for (let element in node) {
            if (node.hasOwnProperty(element) && typeof node[element] === "string") {
                container.push(
                    <View style={{flex:1,flexDirection:'row'}}>
                    <View>{forExtractingStringAndNumberData(node[element], element)}</View>
                    </View>
                );
            }
            if (node.hasOwnProperty(element) && typeof node[element] === "boolean") {
                container.push(
                    <View>{forExtractingDataFromBoolean(node[element], element)}</View>
                );
            }
        }
        return <View>{container}</View>;
    }

    const renderData = () => {
        try {
            return <>
                {forExtractingBaseDetails(showPriorVisitNote.visitNote, "visitNote")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.assessment, "assessment")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.access, "access")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.medication, "medication")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.administration, "administration")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.response, "response")}
                {forExtractingDataFromObject(showPriorVisitNote.visitNote.medicationProfile, "medicationProfile")}
            </>
        } catch (e) {
            console.log(e);
            return <View>
                <Text>Something went wrong. This issue has been reported to us and will be resolved soon</Text>
            </View>
        }
    }
    
    if(isModalDataLoading){
        return(
            <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#026DA9" />
            </View>
        )
    }else{
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visibility}
                    onRequestClose={() => {
                        setVisibility(!visibility);
                    }}
                >
                    <ScrollView>
                        <View>
                            <View>
                                <TouchableOpacity onPress={() => setVisibility(false)}>
                                    <AntDesign name="close" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'95%',marginLeft:10}}>
                                <Text style={{fontSize:25,textAlign:'center'}}>Prior Notes</Text>
                                <Text style={{fontSize:20,textAlign:'center',color:'grey'}}>{showPriorVisitNote && showPriorVisitNote.patientName}</Text>
                            </View>
                        </View>
                        <View style={{width:"95%",marginLeft:10,flexWrap:'wrap'}}>
                            { (showPriorVisitNote && showPriorVisitNote.visitNote) && renderData()}
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}

export default PriorVisitNote

const styles = StyleSheet.create({})
