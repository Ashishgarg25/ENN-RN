import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Formik} from "formik"
import * as yup from "yup";
import {
    doseUnits,
    doseUnitsMedProfile,
    durationUnits,
    heparinUnits,
    preMedicationDoseUnits,
    temperatureUnits,
    weightUnits
} from "../Global/formData";
import Note from './Note';

const AssessmentPage = (props) => {

    const {navigation, route} = props;

    const patient = route.params.mpiData;

    const validationSchema = yup.object().shape({
        noteType: yup.string().required("Required").typeError("Required"),
        visitDate: yup.date().required("Required").typeError("Required"),
        timeIn: yup.string().required("Required").typeError("Required"),
        timeOut: yup.string().required("Required").typeError("Required"),
        nurseFirstname: yup.string("Required").required().typeError("Required"),
        nurseLastname: yup.string("Required").required().typeError("Required"),
        reportDateTime: yup.string("Required").required().typeError("Required"),
        title: yup.string("Required").required().typeError("Required"),
        timezone: yup.string("Required").required().typeError("Required"),
        patientDetails: yup.object().shape({
            firstname: yup.string().required("Required").typeError("Required"),
            lastname: yup.string().required("Required").typeError("Required"),
            mpi: yup.string().required("Required").typeError("Required"),
            dob: yup.string().required("Required").typeError("Required"),
            primaryDiagnosis: yup.object().shape({
                diseaseDesc: yup.string().required("Required").typeError("Required"),
                icdCode: yup.string().required("Required").typeError("Required"),
            })
        }),
        assessment: yup.object().shape({
            vitalSigns: yup.object({
                patientRefusedVitals: yup.boolean(),
                temperature: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
                weight: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
                bpLow: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
                bpHigh: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
                pulse: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
                repositoryRate: yup.number()
                    .when("patientRefusedVitals", {
                        is: false,
                        then: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Please provide a valid value"),
                        otherwise: yup.number().nullable().default(null),
                    }),
            }).required("Please fill in the details for 'Vital Signs'"),
        }),
        medicationProfile: yup.object().shape({
            medications: yup.array().of(yup.object().shape({
                name: yup.string().trim().required("Required").typeError("Required"),
                dose: yup.number().required("Required").min(0, "Please provide a valid value").typeError("Required"),
                frequency: yup.string().trim().required("Required").typeError("Required"),
                startedDate: yup.string().trim().required("Required").typeError("Required"),
            }))
        }),
        administration: yup.object().shape({
            infusionDocumentation: yup.array().of(yup.object().shape({
                time: yup.string().required("Required").typeError("Required"),
                rate: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                temp: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                tempUnit: yup.string().required("Required").typeError("Required"),
                hr: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                rr: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                bpSystolic: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                bpDiastolic: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required")
            }))
        }),
        medication: yup.object().shape({
            preMedications: yup.array().of(yup.object().shape({
                drug: yup.string().trim().required("Required").typeError("Required"),
                dose: yup.number().min(0, "Please provide a valid value").required("Required").typeError("Required"),
                route: yup.string().trim().required("Required").typeError("Required"),
                timeAdministered: yup.string().trim().required("Required").typeError("Required"),
            }))
        }),
        response: yup.object().shape({
            lots: yup.array().of(yup.object().shape({
                number: yup.string().trim().required("Required").typeError("Required"),
                expireAt: yup.string().trim().required("Required").typeError("Required"),
            }))
        })
    })

    return (
        <View style={{backgroundColor:"#fff", flex:1}}>
            
            <Formik
                initialValues={{
                    noteType: null,
                    visitDate: new Date(),
                    timeIn: new Date(),
                    timeOut: new Date(),
                    nurseFirstname: null,
                    nurseLastname: null,
                    reportDateTime: null,
                    title: null,
                    timezone: null,
                    digitallySigned: false,
                    patientDetails: {
                        firstname: patient.firstname,
                        lastname: patient.lastname,
                        mpi: patient.mpi,
                        dob: patient.dob,
                        primaryDiagnosis: {
                            diseaseDesc: patient.primaryDiagnosis.diseaseDesc,
                            icdCode: patient.primaryDiagnosis.icdCode
                        },
                        secondaryDiagnosis: {
                            diseaseDesc: patient.secondaryDiagnosis.diseaseDesc,
                            icdCode: patient.secondaryDiagnosis.icdCode
                        }
                    },
                    assessment: {
                        vitalSigns: {
                            temperatureUnit: temperatureUnits[0].text,
                            temperature: null,
                            bpLow: null,
                            bpHigh: null,
                            weightUnit: weightUnits[0].text,
                            weight: null,
                            weightStatus: null,
                            pulse: null,
                            repositoryRate: null,
                            patientRefusedVitals: false
                        },
                        infectionScreen: {
                            hasActiveInfection: null,
                            infectionDescription: null
                        },
                        recentBleeds: {
                            hasRecentBleeds: null,
                            isMdOrHtcAware: null,
                            when: null,
                            location: null,
                            cause: null,
                            duration: null,
                            durationUnit: durationUnits[0].text,
                            treatment: null
                        },
                        hasNoNewAllergies: null,
                        hasNewAllergies: null,
                        newAllergies: [],
                        cardiovascular: {
                            wnl: false,
                            hyperTension: false,
                            chestPain: false,
                            hypoTension: false,
                            edema: false,
                            arrhythmia: false,
                            other: null
                        },
                        respiratory: {
                            wnl: false,
                            dyspnea: false,
                            cough: false,
                            abnormalLungSound: false,
                            other: null
                        },
                        genitourinary: {
                            wnl: false,
                            urgency: false,
                            increasedFrequency: false,
                            decreasedFrequency: false,
                            abnormalColor: false,
                            other: null
                        },
                        endocrine: {
                            wnl: false,
                            diabetic: false,
                            other: null
                        },
                        gastroIntestinal: {
                            wnl: false,
                            nausea: false,
                            vomiting: false,
                            constipation: false,
                            poorSkinTurgor: false,
                            dryMucousMembranes: false,
                            difficultySwallowing: false,
                            inadequateFoodIntake: false,
                            other: null
                        },
                        activity: {
                            wnl: false,
                            wheelchair: false,
                            bedbound: false,
                            cane: false,
                            walker: false,
                            other: null
                        },
                        neurological: {
                            wnl: false,
                            confused: false,
                            forgetful: false,
                            numbness: false,
                            tingling: false,
                            weakness: false,
                            cramping: false,
                            muscleTwitch: false,
                            difficultySpeaking: false,
                            nasalSlurredSpeech: false,
                            other: null
                        },
                        psychosocial: {
                            wnl: false,
                            inadequateSupportSystem: false,
                            caregiverUnavailable: false,
                            other: null
                        },
                        homeEnvironment: {
                            wnl: false,
                            fallRisk: false,
                            oxygenUseRisk: false,
                            other: null
                        },
                        noteAssessment: null,
                        painLevel: null,
                        painType: {
                            sharp: false,
                            dull: false,
                            ache: false,
                            constant: false,
                            throbbing: false,
                            intermittent: false
                        },
                        painCriteria: {
                            location: null,
                            currentIntervention: null
                        }
                    },
                    access: {
                        type: null,
                        dateOfInsertion: null,
                        location: {
                            left: false,
                            right: false,
                            hand: false,
                            forearm: false,
                            antecubital: false,
                            other: ""
                        },
                        accessType: {
                            centralLine: false,
                            picc: false,
                            port: false,
                            tunneled: false
                        },
                        numberOfLumens: null,
                        huberNeedleInformation: {
                            brand: null,
                            gauge: null,
                            length: null,
                            noOfAttempts: null,
                        },
                        catheterInformation: {
                            brand: null,
                            gauge: null,
                            length: null,
                            noOfAttempts: null,
                            flushesWithoutResistance: false,
                            positiveBloodReturn: false,
                            flushedPerProtocol: false
                        },
                        siteAssessment: {
                            normal: false,
                            pain: false,
                            redness: false,
                            swelling: false,
                            flareStreaking: false,
                            irritation: false,
                            infiltration: false,
                            itching: false,
                            heat: false,
                            isPicPac: false,
                            other: null
                        },
                        accessDeviceFlush: {
                            type: null,
                            sodiumChlorideVolume: null,
                            heparinConcentration: null,
                            heparinConcentrationUnit: heparinUnits[0].text,
                            heparinVolume: null
                        },
                        subcutaneousAccess: {
                            needleLength: null,
                            needleGauge: null,
                            sites: null,
                            locationOfSites: null,
                            noBloodReturn: true,
                            siteReactionDetails: null
                        }
                    },
                    medication: {
                        drugMedication: {
                            drugName: null,
                            doseUnit: doseUnits[0].text,
                            dose: null,
                            reasonForInfusion: null,
                            bleedSite: null,
                            diluentSolution: null,
                            diluentVolume: null,
                            diluentVolumeUnit: "ml"
                        },
                        preMedicationsRefused: null,
                        preMedications: [{
                            drug: null,
                            doseUnit: preMedicationDoseUnits[0].text,
                            dose: null,
                            route: null,
                            timeAdministered: null
                        }],
                        hydrationTime: {
                            preIg: null,
                            postIg: null,
                            concomitantWithIg: null
                        },
                        eventsSinceLastDose: {
                            naNaive: false,
                            none: false,
                            headache: false,
                            fever: false,
                            chills: false,
                            nausea: false,
                            vomiting: false,
                            rash: false,
                            hypotension: false,
                            hypertension: false,
                            painMyalgia: false,
                            reactionOther: null,
                            sideEffectOther: null,
                            diarrhea: false,
                            fatigue: false,
                            headacheOrMigraine: false,
                            injectionSiteReaction: false,
                            muscleAches: false,
                        },
                        soughtMedicalTreatment: null
                    },
                    administration: {
                        infusionDocumentation: [{
                            time: null,
                            rate: null,
                            temp: null,
                            tempUnit: temperatureUnits[0].text,
                            hr: null,
                            rr: null,
                            bpSystolic: null,
                            bpDiastolic: null,
                            comments: null
                        }],
                        hasAdrDuringInfusion: false,
                        adrTypes: [], //{adr: "string", details: "string", scale: number}
                        nufactorNotified: false,
                        amountInfused: null,
                        infusionStopped: false,
                        infusionSlowedOrStopped: false,
                        summaryOfInfusion: null
                    },
                    response: {
                        symptom: null,
                        progressTowardGoals: null,
                        lots: [
                            {number: null, expireAt: null}
                        ],
                        additionalNurseNotes: null
                    },
                    medicationProfile: {
                        notes: null,
                        medications: [{
                            name: null,
                            doseUnit: doseUnitsMedProfile[0].text,
                            dose: null,
                            frequency: null,
                            startedDate: null
                        }]
                    }
                }}
                validationSchema={validationSchema}
                onSubmit={(values, formikActions) => {
                    //remove 'Z' from Date() fields. Java have serialization issues if 'Z' is present
                    values.visitDate = new Date(values.visitDate).toISOString().replace("Z", "");
                    values.timeIn = new Date(values.timeIn).toISOString().replace("Z", "");
                    values.timeOut = new Date(values.timeOut).toISOString().replace("Z", "");
                    //
                    formikActions.setStatus({errorMessage: null});
                    const {_links} = patient;
                    const {addVisitNote} = _links;
                    axios({
                        method: "POST",
                        data: values,
                        baseURL: addVisitNote.href
                    }).then(({data}) => {
                        // dispatchAction(setPatient(data));
                        // openSuccessDialog(true);
                        // setTransitionBlocked(false);
                        formikActions.setStatus({isSaved: true}); //used in Confirmation dialog
                        formikActions.setSubmitting(false);
                    }).catch(e => {
                        // const errorMessage = postOrPutErrorExtractor(e, formikActions);
                        formikActions.setStatus({errorMessage});
                        formikActions.setSubmitting(false);
                    })
                }}
                // validateOnChange={false}
            >
                {() => (
                    
                        <View style={{flex:1, backgroundColor:"#fff"}}>
                            <Note patient={patient} {...props}/>
                            {/* <Basic initialData = {patient} /> */}
                            {/* <Access needleLengthList={needleLengthList} needleGaugeList={needleGaugeList} />
                            <Administration adrList={adrList} /> */}
                            {/* <Assessment /> */}
                            {/* <Medication drugList={drugList} preMedDrugList={preMedDrugList} drugRouteList={drugRouteList} />
                            <Response />
                            <MedicationProfile frequencyList={frequencyList} /> */}
                        </View>
                    
                )}
            </Formik>

        </View>
    )
}

export default AssessmentPage

const styles = StyleSheet.create({})
