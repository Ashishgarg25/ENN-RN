import React,{useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, DevSettings } from 'react-native';
// import { FilledTextField } from 'react-native-material-textfield';
import axiosInstance from './Api/APIConfig'
import {Formik} from "formik";
import * as yup from "yup";
import Constant from '../Global/globalvariable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, HelperText, Snackbar} from 'react-native-paper';

const login = ({navigation, route}) => {
    // const [userName,setUserName] = useState("")
    // const [password,setPassword]= useState("")
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [flowId, setFlowId] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [flowIdTimeout, setFlowIdTimeout] = useState();
    
    useEffect(() => {

        const { flowId, flowIdTimeout } = route.params;
        setFlowId(flowId);
        setFlowIdTimeout(flowIdTimeout)
        
        // const timer = setTimeout(() => DevSettings.reload(), flowIdTimeout * 1000);
        // return () => clearTimeout(timer);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor:"#fff" }}>
            
            <Snackbar
                style={styles.errBtn}
                visible={showError}
                onDismiss={() => setShowError(false)}
                action={{
                    label: <Text style={{color:"#000"}}>Close</Text>,
                    onPress: () => {
                        setShowError(false)
                    }
            }}>
                <Text>{error}</Text>
            </Snackbar>
            <ScrollView>
                <View>
                    <Image style={styles.bannerImage}
                        source={require("../Images/banner.png")}
                    />
                    <Image style={{
                        marginTop: 50,
                        alignSelf:'center',
                        resizeMode:'contain',
                    }}
                        source={require('../Images/logo.png')}
                    />

                    {/* NEW CODE */}
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            otp: ""
                        }}
                        validationSchema={yup.object().shape({
                            username: yup.string().trim().required("Please provide a valid username"),
                            password: yup.string().trim().required("Please provide a valid password"),
                        })}
                        onSubmit={(values, formikHelpers) => {
                            setError(null);
                            if(values.otp !== ""){
                                axiosInstance({
                                    method: "POST",
                                    url: "https://idp.devportals.nufactor.com/nurse/check-otp",
                                    data: {
                                        flowId : flowId,
                                        otp : values.otp
                                    }
                                }).then(({data}) => {
                                    const {status, accessToken} = data;
                                    if (status !== "AUTHENTICATED")
                                        setError("Failed To Authenticate")
                                    Constant.token = accessToken;
                                    navigation.navigate('Home')
                                }).catch(() => {
                                    formikHelpers.setSubmitting(false);
                                    setError("Invalid username or password");
                                    setShowError(true)
                                })
                            }else {
                                console.log("Working")
                                axiosInstance({
                                    method: "POST",
                                    url: "https://idp.devportals.nufactor.com/nurse/login",
                                    data: {
                                        flowId: flowId,
                                        username: values.username,
                                        password: values.password
                                    }
                                }).then(({data}) => {
                                    const {status, flowId} = data;
                                    console.log(status)
                                    if (status !== "OTP_REQUIRED")
                                        setError("Failed To Authenticate")
                                    setShowOtpField(true)
                                }).catch((err) => {
                                    console.log("Not Workig",err.message)
                                    formikHelpers.setSubmitting(false);
                                    setError(err.message);
                                    setShowError(true)
                                })
                            }
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            errors,
                            touched
                        }) => (
                            <View>
                                {showOtpField === false ?
                                    <View>
                                        <TextInput style={styles.textInput}
                                            autoCompleteType="email"
                                            importantForAutofill="yes"
                                            mode="outlined"
                                            outlineColor="#026DA9"
                                            label="Username"
                                            maxLength={30}
                                            autoCapitalize="none"
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                            error={touched.username && errors.username !== undefined}
                                        />
                                        <HelperText 
                                            type="error"
                                            visible={touched.username ? errors.username : ""}
                                        >
                                            {errors.username}
                                        </HelperText>
                                        <TextInput style={styles.textInput}
                                            autoCompleteType="password"
                                            importantForAutofill="yes"
                                            mode="outlined"
                                            outlineColor="#026DA9"
                                            label="Password"
                                            secureTextEntry
                                            maxLength={30}
                                            autoCapitalize="none"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            error={touched.password && errors.password !== undefined}
                                        />
                                        <HelperText 
                                            type="error"
                                            visible={touched.password ? errors.password : ""}
                                        >
                                            {errors.password}
                                        </HelperText>
                                    </View>
                                :
                                    <View>
                                        <TextInput style={styles.textInput}
                                            importantForAutofill="yes"
                                            mode="outlined"
                                            outlineColor="#026DA9"
                                            label="OTP"
                                            secureTextEntry
                                            maxLength={30}
                                            autoCapitalize="none"
                                            onChangeText={handleChange('otp')}
                                            onBlur={handleBlur('otp')}
                                            value={values.otp}
                                            error={touched.otp && errors.otp !== undefined}
                                        />
                                        <HelperText 
                                            type="error"
                                            visible={touched.otp ? errors.otp : ""}
                                        >
                                            {errors.otp}
                                        </HelperText>
                                    </View>
                                }
                                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} >
                                    <Text style={{
                                        color: 'white', alignSelf: 'center',
                                        fontSize: 25
                                    }} >
                                        {showOtpField === false ? "Login" : "Submit OTP"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{
                        marginTop:20,
                        fontSize:15
                    }}>
                        Don't have an account ?
                    </Text>
                    <TouchableOpacity style={{marginTop:20,marginLeft:10}} onPress={() => navigation.navigate("signup")}>
                        <Text style={{
                            fontSize:15,
                            color:'blue'
                        }}>Create Account</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )

    function loginAPICall() {
        // setloading(true)
        let postdata = {
         "username":userName.toString(),
         "password":password.toString()
  
        }
        axiosInstance.post('login',postdata
        ).then(response => {
          navigation.navigate('Home')  
          console.log(postdata)
          console.log("response is :",response.data.token)
        }).catch(error=>{
            console.log(error.message)
        })
    }
};

export default login;

const styles = StyleSheet.create({
    usernameView: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row-reverse',
        borderBottomWidth: 1,
        borderBottomColor: "#1A1A1A",
        
    },
    bannerImage: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        justifyContent: "center",
    },
    textInput: {
        flex: 1, 
        marginVertical: 0, 
        marginLeft: 16, 
        marginRight: 16
    },
    loginButton: {
        backgroundColor: '#026DA9',
        height: 50,
        borderRadius: 25,
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        justifyContent: 'center'
    },
    forgotTextStyle: {
        opacity:0.6,
        fontWeight:"bold"
    },
    labelTextStyleView:{
        color: '#1a1a1a', 
        marginTop: 10, 
        paddingTop: 5
    },
    errBtn: {
        backgroundColor:"#f56",
        zIndex: 9999
        // position:"absolute", 
        // top:16, 
        // left:0, 
        // right:0, 
        // zIndex:99999
    }

})
