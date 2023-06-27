import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from 'react';
// import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase/FirebaseConfig.js';
import axios from "axios"
import { Picker } from '@react-native-picker/picker';
import getFileExtension from '../../utils/getFileExtension.js';
import { Formik } from 'formik';
import * as Yup from 'yup';

const BusinessDetails = (props) => {
    // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Salon', value: 'salon' },
        { label: 'Doctor', value: 'doctor' }
    ]);
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [category, setCategory] = useState("");
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');

    const businessDoc = doc(db, "business_users", auth.currentUser.uid);
    // const businessDoc = doc(db, "business_users", "auth.uid");

    const [image, setImage] = useState({ uri: 'hahahahahahah' });
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [text, setText] = useState('');
    const onChangeText = text => setText(text);
    const hasErrors = () => {
        return !businessEmail.includes('@');
    };
    const accountSetupSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.number()
            .min(11, 'Write Valid Phone Number')
            .required('Required'),
        address: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        description: Yup.string()
            .min(5, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required'),
        category: Yup.string()
            .required('Required'),
        instagram: Yup.string()
            .required('Required'),
        facebook: Yup.string()
            .required('Required'),
        image: Yup.string()
            .required('Required'),
    });


    const addBusinessInfo = async (values, image_url) => {

        const business = {
            business_name: values.name,
            business_address: values.address,
            business_email: values.email,
            category: values.category,
            business_phone: values.phone,
            business_description: values.description,
            instagram: values.instagram,
            facebook: values.facebook,
            image: image_url

        }
        console.log(auth.currentUser.uid)

        await setDoc(businessDoc, business, { merge: true })
            .then(
                (res) => {
                    console.log("response" + res)
                })
            .catch(
                (err) => {
                    console.log("error" + err)
                });
    };

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [5, 10],
            // quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };
    const deleteImage = () => {
        setImage(null);
    }
    const uploadImage = async (values) => {
        let extension = getFileExtension(image.uri);
        let base64 = `data:image/${extension};base64,${image.base64}`;
        let apiUrl = 'https://api.cloudinary.com/v1_1/reserve-it-fyp/image/upload';

        let data = {
            "file": base64,
            "upload_preset": "q4x11otx",
        }

        const { data: hello } = await axios.post(apiUrl, data).catch(err => {
            console.log("error: " + err)
        });
        addBusinessInfo(values, hello.url);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                    Business Details
                </Text>
                <Formik
                    initialValues={{ name: '', email: '', phone: '', address: '', description: '', category: '', instagram: '', facebook: '', image: '' }}
                // validationSchema={SignupSchema}
                >
                    {({ errors, values, touched, handleChange, setFieldTouched }) => (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -15 }}>
                                {/* <Ionicons color="#57B9BB" name="business" size={23} style ={{margin:10, marginTop: 25, }} />  */}
                                <TextInput
                                    label="Business Name"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    mode="outlined"
                                    value={values.name}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                />
                            </View>
                            {touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    label="Business Email"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    mode="outlined"
                                    value={values.email}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                />
                            </View>
                            {touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    label="Business Address"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    mode="outlined"
                                    value={values.address}
                                    onBlur={() => setFieldTouched('address')}
                                    onChangeText={handleChange('address')}
                                />
                            </View>
                            {touched.address && <Text style={{ color: 'red' }}>{errors.address}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    label="Business Phone"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    mode="outlined"
                                    value={values.phone}
                                    onBlur={() => setFieldTouched('phone')}
                                    onChangeText={handleChange('phone')}
                                />
                            </View>
                            {touched.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    label="Business Description"
                                    placeholderTextColor={"grey"}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    style={styles.description}
                                    mode="outlined"
                                    value={values.description}
                                    onBlur={() => setFieldTouched('description')}
                                    onChangeText={handleChange('description')}
                                />
                            </View>
                            {touched.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <DropDownPicker
                                    open={open}
                                    value={category}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setCategory}
                                    setItems={setItems}
                                    style={{
                                        backgroundColor: "#E7E7E7",
                                        borderRadius: 5,
                                        height: 55,
                                        zIndex: 99
                                    }}
                                    containerStyle={{
                                        width: '85%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 30,
                                        zIndex: 99
                                    }}
                                    textStyle={{
                                        fontSize: 15
                                    }}
                                    labelStyle={{
                                        fontWeight: "bold"
                                    }}

                                />
                            </View>
                            {touched.category && <Text style={{ color: 'red' }}>{errors.category}</Text>}
                            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                                Social Media
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -15 }}>

                                <TextInput
                                    placeholder="Instagram"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    value={values.instagram}
                                    onBlur={() => setFieldTouched('instagram')}
                                    onChangeText={handleChange('instagram')}
                                />
                            </View>
                            {touched.instagram && <Text style={{ color: 'red' }}>{errors.instagram}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    placeholder="Facebook"
                                    placeholderTextColor={"grey"}
                                    style={styles.textInput}
                                    value={values.facebook}
                                    onBlur={() => setFieldTouched('facebook')}
                                    onChangeText={handleChange('facebook')}
                                />
                            </View>
                            {touched.facebook && <Text style={{ color: 'red' }}>{errors.facebook}</Text>}
                            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                                Select a Banner Image
                            </Text>

                            <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>

                                <View style={{ flexDirection: "row", margin: 10 }}>
                                    {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, borderRadius: 13 }} />}

                                    <View style={{ justifyContent: 'center', margin: 10 }}>
                                        {image &&
                                            <Button icon="delete" color='red' onPress={deleteImage} />}
                                    </View>

                                </View>

                                <View style={{ margin: 15, marginBottom: 20 }}>
                                    <Button icon="camera" mode="outlined" color='#57B9BB' onPress={pickImage}>
                                        {image ? <Text>Reselect the picture</Text> : <Text>Select a Picture from Gallery</Text>}
                                    </Button>
                                </View>

                            </View>
                            <View style={{ justifyContent: 'center', margin: 20, marginTop: 2 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {

                                        if (errors.name || errors.email || errors.address || errors.phone || errors.description || errors.category || errors.instagram || errors.facebook) {
                                            Alert.alert(
                                                "Please fill all the fields correctly",
                                                "",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                                ],
                                                { cancelable: false }
                                            );
                                            return;
                                        }
                                        else {
                                            uploadImage(values);
                                            props.navigation.navigate('AccountSetup3')
                                        }

                                    }}
                                >

                                    <Text style={{ color: '#fff', fontSize: 17 }}>
                                        NEXT
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default BusinessDetails;

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    textInput: {
        width: '85%',
        // borderWidth:1,
        // borderColor: '#000',
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#000',
        // padding:10,

    },
    description: {
        width: '85%',
        // borderWidth:1,
        // borderColor: '#000',
        height: 95,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#000',
        padding: 10,

    },
    button: {
        backgroundColor: '#57B9BB',
        width: deviceWidth - 45,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

});
