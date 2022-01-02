import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import axiosInstance from './Api/APIConfig'
import {VALID_EMAIL_REGEX, VALID_NAME_REGEX, VALID_PASSWORD_REGEX} from "./utils/validators";
import {Formik} from "formik";
import * as yup from "yup";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {TextInput, HelperText, Snackbar} from 'react-native-paper';
import {Autocomplete} from 'react-native-autocomplete-input'

const signup = ({navigation}) => {

    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [agencies, setAgencies] = useState([]);
    const [agenciesToShow, setAgenciesToShow] = useState([]);
    const [agency, setAgency] = useState({});
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        console.log(agency)

        axiosInstance({
            method: "GET",
            url: "/bulk-data" + "/nursing-agencies"
        }).then(({data}) => {
            setAgencies(data);
        }).catch(() => {
            // toast("Failed to load list of agencies, please refresh the page and try again", {type: "error"})
        })
    },[])

    return (
        <ScrollView contentContainerStyle={{backgroundColor:"#fff"}}>
            <Snackbar
                style={styles.errBtn}
                visible={showError}
                onDismiss={() => setShowError(false)}
                action={{
                    label: <Text style={{color:"#000"}}>Close</Text>,
                    onPress: () => {setShowError(false)},
            }}>
                <Text>{error}</Text>
            </Snackbar>
            <View style={{marginHorizontal:16}}>
                <Image style={styles.bannerImage}
                    source={require("../Images/banner.png")}
                />
                <Image style={{
                    marginTop: 50,
                    resizeMode:'contain',
                }}
                    source={require('../Images/logo.png')}
                />
                <Formik
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        password: "",
                        passwordConfirm: "",
                        email: "",
                        nurseId: "",
                        nursingAgencyId: "",
                        phone: "",
                        // agreedTerms: false
                    }}
                    validationSchema={yup.object().shape({
                        firstname: yup.string().trim().required("Required").matches(VALID_NAME_REGEX, "No special character or space allowed. Minimum 3 and maximum 20 characters allowed").typeError("Required"),
                        lastname: yup.string().trim().required("Required").matches(VALID_NAME_REGEX, "No special character or space allowed. Minimum 3 and maximum 20 characters allowed").typeError("Required"),
                        password: yup.string().required("Required").matches(VALID_PASSWORD_REGEX, "Minimum 8 characters, one uppercase, one lowercase, one digit and one special character required").typeError("Required"),
                        passwordConfirm: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match').required("Required"),
                        email: yup.string().trim().required("Please provide a valid email address").matches(VALID_EMAIL_REGEX, "Please provide a valid email address"),
                        nurseId: yup.string().trim().required("Please provide a valid nurse ID"),
                        nursingAgencyId: yup.number().required("Please provide a valid nursing agency").typeError("Please provide a valid nursing Agency"),
                        phone: yup.string().trim().required("Please provide your phone number"),
                        // recaptchaResponse: yup.string().trim().required("Required")
                    })}
                    onSubmit={(values, formikHelpers) => {
                        console.log(agency.id)
                        if(checked !== true){
                            setError("Please Check the checkbox")
                            return;
                        }
                        setError(null);
                        delete values.passwordConfirm;
                        // delete values.agreedTerms
                        axiosInstance({
                            method: "POST",
                            url: "/signup",
                            data: values
                        }).then(() => {
                            // setSuccess(true);
                            formikHelpers.setSubmitting(false);
                        }).catch(e => {
                            const errorMessage = e.message;
                            formikHelpers.setStatus({errorMessage});
                            setError(errorMessage);
                            setShowError(true);
                            formikHelpers.setSubmitting(false);
                            // captchaRef && captchaRef.current && captchaRef.current.reset();
                            // formikHelpers.setFieldValue("recaptchaResponse", null);
                        })
                    }}
                >
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                          errors,
                          touched,
                          handleBlur,
                          setFieldValue
                        //   setFieldValue, status
                    }) => (
                        <View>
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="FIRST NAME"
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                value={values.firstname}
                                error={touched.firstname && errors.firstname !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.firstname ? errors.firstname : ""}
                            >
                                {errors.firstname}
                            </HelperText>
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="LAST NAME"
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                value={values.lastname}
                                error={touched.lastname && errors.lastname !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.lastname ? errors.lastname : ""}
                            >
                                {errors.lastname}
                            </HelperText>
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="EMAIL"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={touched.email && errors.email !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.email ? errors.email : ""}
                            >
                                {errors.email}
                            </HelperText>
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="PHONE"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                error={touched.phone && errors.phone !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.phone ? errors.phone : ""}
                            >
                                {errors.phone}
                            </HelperText>
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="NURSE ID"
                                onChangeText={handleChange('nurseId')}
                                onBlur={handleBlur('nurseId')}
                                value={values.nurseId}
                                error={touched.nurseId && errors.nurseId !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.nurseId ? errors.nurseId : ""}
                            >
                                {errors.nurseId}
                            </HelperText>
                            
                            {/* ADD NURSING AGENCY */}
                            {/* <Text style={{position:"absolute", top: "52%", left: 32, zIndex: 9999, fontSize:18}}></Text> */}
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label={Object.keys(agency).length > 0 ? agency.name : "NURSING AGENCY"}
                                onChangeText={(text) => {
                                    if (text)
                                        setAgenciesToShow(agencies.filter(agency => agency.name.toLowerCase().includes(text.toLowerCase())))
                                    else
                                        setAgenciesToShow([])
                                        
                                }}
                                onBlur={() => setFieldValue("nurseAgencyId", agency ? agency.id : "")}
                                error={ Object.keys(agency).length === 0 && touched.nursingAgencyId && errors.nursingAgencyId !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={ Object.keys(agency).length === 0 && touched.nursingAgencyId ? errors.nursingAgencyId : ""}
                            >
                                {errors.nursingAgencyId}
                            </HelperText>
                            <FlatList
                                data={agenciesToShow}
                                ItemSeparatorComponent={() =>{
                                return(
                                <View style={{height:1,borderColor:'black',borderWidth:1}}></View>
                                    )
                                }}
                                renderItem={({item}) => {
                                    return(
                                        <View style={{borderColor:'grey'}}>
                                        <TouchableOpacity onPress={() => {setAgency(item); agency !== null ? setAgenciesToShow([]) : ""}} style={{marginVertical: 6}} key={item.id}>
                                            <Text style={{color: "#000",textAlign:'center'}}>{item.name}</Text>
                                        </TouchableOpacity>
                                        </View> 
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                            />

                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="PASSWORD"
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
                            <TextInput style={styles.textInput}
                                mode="outlined"
                                outlineColor="#026DA9"
                                maxLength={30}
                                autoCapitalize="none"
                                label="CONFIRM PASSWORD"
                                onChangeText={handleChange('passwordConfirm')}
                                onBlur={handleBlur('passwordConfirm')}
                                value={values.passwordConfirm}
                                error={touched.passwordConfirm && errors.passwordConfirm !== undefined}
                            />
                            <HelperText 
                                type="error"
                                visible={touched.passwordConfirm ? errors.passwordConfirm : ""}
                            >
                                {errors.passwordConfirm}
                            </HelperText>
                            {/* ADD CHECKBOX */}
                            <BouncyCheckbox
                                size={25}
                                fillColor="#026DA9"
                                unfillColor="#FFFFFF"
                                text="By creating an account, you agree to the Terms of Service. For more information about privacy practices, see the Privacy Statement. We'll occasionally send you account-related emails."
                                iconStyle={{ borderColor: "#026DA9", borderRadius:6 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 12, marginTop:24 }}
                                onPress={() => {
                                    setChecked(!checked)
                                }}
                            />
                            <HelperText 
                                type="error"
                                visible={!checked ? true : ""}
                            >
                                Required
                            </HelperText>
                            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center',
                                    fontSize: 20
                                }} >
                                    {isSubmitting ? <ActivityIndicator color="#fff" size="small" /> : "Create Account"}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

export default signup

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        marginBottom:16
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
