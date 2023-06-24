import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, StatusBar, Alert,ActivityIndicator } from 'react-native';
import { db, auth } from '../../firebase/FirebaseConfig.js'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, SignInWithRedirect, FacebookAuthProvider } from "firebase/auth";
import { MaterialIndicator } from 'react-native-indicators';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.number()
            .min(11, 'Write Valid Phone Number')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    useEffect(() => {

    }, [])


    const storeData = (userDoc, servicesDoc, roleDoc, email,) => {
        // const userDoc = doc(db,"business_users",credentials.user.uid);

        // const userDoc = doc(db,"business_users","test");
        // const appointmentsDoc = doc(db,"appointments","test");
        // const servicesDoc = doc(db,"services","test");

        const userData = {
            name: name,
            phone: phone,
            business_phone: "",
            email: email,
            business_name: "",
            business_description: "",
            category: "",
            address: "",
            instagram: "",
            facebook: "",
            image: "",
            rating: 0,
            startTime: "",
            endTime: "",
            // workingDays: {
            //     monday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""
            //     },
            //     tuesday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""
            //     },
            //     wednesday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""

            //     },
            //     thursday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""

            //     },
            //     friday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""
            //     },
            //     saturday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""
            //     },
            //     sunday: {
            //         isOpen:true,
            //         startTime:"",
            //         endTime:"",
            //         breakTimeStart:"",
            //         breakTimeEnd:""
            //     }

            // },
        }
        const services = {
            name: '',
            price: '',
            duration: '',
            business_email: '',

        }

        const role = {
            user_email: email,
            user_id: auth.currentUser.uid,
            role: 'business',
        }

        console.log(userDoc)

        setDoc(userDoc, userData)
            .then(() => {
                alert("User Created Successfully")
                setLoading(false)
            })
            .catch((error) => {
                alert(error.message)
            })

        setDoc(servicesDoc, services)
            .then(() => {
                console.log("services Created Successfully")
            })
            .catch((error) => {
                alert(error.message)
            })
        setDoc(roleDoc, role)
            .then(() => {
                console.log("role Created Successfully")
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const signUp = () => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email.trim(), password)
            .then((credentials) => {

                if ((name || phone) != '') {
                    console.log(credentials);
                    const userDoc = doc(db, "business_users", credentials.user.uid);
                    const servicesDoc = doc(db, "services", credentials.user.uid);
                    const roleDoc = doc(db, "roles", credentials.user.uid);

                    storeData(userDoc, servicesDoc, roleDoc, credentials.user.email);
                    setLoading(false);
                    navigation.replace("AccountSetup1")
                }

                else {
                    setLoading(false);
                    alert("Any Field cant be empty!")
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error Message :" + error.message);
                console.log("Error Code :" + error.code);
                Alert.alert(error.message)
            })

        // {loading == true ? <MaterialIndicator color='black' />: navigation.navigate("AccountSetup1")}
    }



    return (
        <>
            {loading &&
                (
                    <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={30} />
                        <Text style={{ color: 'white', fontSize: 15 }}>Please Wait</Text>
                    </View>
                )
            }
            <View style={styles.mainView}>
                <View style={styles.upView}>
                    <Image style={{ resizeMode: 'contain', height: '60%' }} source={require('../../assets/logo.png')} />
                </View>

                <ScrollView style={styles.downView}>
                    <Text style={styles.heading}> Sign Up as Business </Text>
                    <Formik
                        initialValues={{ name: '', email: '', phone, password: '', confirmPassword: '', }}
                        onSubmit={values => console.log(values)}
                        validationSchema={SignupSchema}
                    >
                        {({ errors, values, touched, handleChange, setFieldTouched }) => (
                            <View style={styles.form}>
                                <TextInput
                                    placeholder="Full name"
                                    value={values.name}
                                    placeholderTextColor={"#fff"}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    style={styles.textInput}

                                />
                                {touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                                <TextInput
                                    placeholder="Email"
                                    value={values.email}
                                    placeholderTextColor={"#fff"}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    style={styles.textInput}
                                />
                                {touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                                <TextInput
                                    placeholder="Phone number"
                                    placeholderTextColor={"#fff"}
                                    style={styles.textInput}
                                    value={values.phone}
                                    onBlur={() => setFieldTouched('phone')}
                                    onChangeText={handleChange('phone')}
                                    keyboardType="phone-pad"
                                />
                                {touched.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                                <TextInput
                                    placeholder="Password"
                                    value={values.password}
                                    secureTextEntry={true}
                                    onBlur={() => setFieldTouched('password')}
                                    onChangeText={handleChange('password')}
                                    placeholderTextColor={"#fff"}
                                    style={styles.textInput}

                                />
                                {touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                                <TouchableOpacity style={styles.button}
                                    onPress={() => {
                                        if (errors.name || errors.email || errors.phone || errors.password) {
                                            alert("Please fill all the fields accordingly")
                                            return;
                                        }
                                        setName(values.name);
                                        setEmail(values.email);
                                        setPhone(values.phone);
                                        setPassword(values.password);
                                        signUp();
                                    }} >
                                    <Text>Sign Up </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                        <TouchableOpacity disabled={true}>
                            <Text style={{ color: '#fff', fontSize: 15, textDecorationLine: 'underline' }}> Already have an account? </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                console.log('Pressed')
                                navigation.navigate('Login')
                            }}
                        >
                            <Text style={{ color: '#4267B2', fontSize: 15, fontWeight: 'bold' }}>SignIn</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    upView: {

        width: '100%',
        height: '20%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downView: {

        width: '100%',
        height: '80%',
        backgroundColor: '#000',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    },
    heading: {
        display: 'flex',
        marginTop: 30,
        marginLeft: 20,
        color: '#57B9BB',
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        borderTopLeftRadius: 80,
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 30

    },
    textInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#fff'
    },
    button: {
        display: 'flex',
        width: '90%',
        backgroundColor: '#fff',
        // marginLeft: 20,
        height: 52,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    fbText: {
        color: '#fff',
    },
    fbButton: {
        display: 'flex',
        width: '90%',
        backgroundColor: '#4267B2',
        marginLeft: 20,
        height: 54,
        borderRadius: 10,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        marginLeft: 100,
        textDecorationLine: 'underline',
    }
});