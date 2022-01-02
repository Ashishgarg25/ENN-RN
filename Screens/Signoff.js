import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import axiosInstance from './Api/APIConfig';
import axios from 'react-native-axios';

const Signoff = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { respoError, setRespError } = useState("")

    const handleLogin = () => {
        setIsLoading(true);

        axiosInstance({
            method: "GET",
            url: "https://idp.devportals.nufactor.com/nurse/login-request",
            withCredentials: false
        }).then(({data}) => {
            const {flowId, flowIdTimeout} = data;
            console.log("=====> FlowID", flowId);
            console.log("=====> FlowTimeout", flowIdTimeout);
            setIsLoading(false)
            navigation.navigate('login', {
                flowId,
                flowIdTimeout
            });
            
        })
        .catch(err => {
            setIsLoading(false)
            console.log(err.response.data);
            ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }) 
        
    }

    const handleSignIn = () => {
        navigation.navigate('signup');
    }

    if(isLoading === true){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" color="#026DA9" />
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <Image style={{
                    position:"absolute",
                    top: 32,      
                    width:'100%',
                    resizeMode:'contain',
                    }}
                    source={require('../Images/logo.png')}
                />
                <TouchableOpacity style={styles.submitbutton} onPress={handleLogin}>
                    <Text style={{color:'#FFFFFF',marginLeft:15, textAlign: "center"}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitbutton} onPress={handleSignIn}>
                    <Text style={{color:'#FFFFFF',marginLeft:15, textAlign: "center"}}>Signup</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default Signoff

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#fff"
    },
    submitbutton: {
        backgroundColor:'#026DA9',
        marginHorizontal:24,
        paddingVertical:12,
        marginTop:16,
        borderRadius:5,
    }
})
