import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, ScrollView, useWindowDimensions,TouchableOpacity } from "react-native";
import Card from '../../components/businessUIComponents/AppointmentCard.js';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { db, auth } from "../../firebase/FirebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from "@expo/vector-icons/"

import Fontisto from 'react-native-vector-icons/Fontisto';


function Appointments({ navigation }) {

    const appointmentsRef = collection(db, "appointments");

    const [appointments, setAppointments] = useState([]);
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Current' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Cancelled' },
    ]);


    const getAppointments = async () => {
        await getDocs(appointmentsRef)
            .then((res) => {

                setAppointments(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));

                // console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                console.log(appointments[0].status.is_completed);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        getAppointments();
        console.log(auth.currentUser.uid)
    }, []);





    const FirstRoute = () => (

        <ScrollView style={styles.container}>
            <View >
                {appointments ? appointments.map((item, index) => (
                    // <Text>{item.id}</Text>
                    appointments[index].status?.is_pending === true
                        && appointments[index].business_email == auth.currentUser.email ? (
                        <Card
                            title={item.service_name}
                            customerName={item.customer_name}
                            serviceName={item.service_name}
                            customerEmail={item.customer_email}
                            customerPhone={item.customer_phone}
                            price={item.price}
                            date={item.date}
                            time={item.time}
                            onPress={() => {
                                console.log("Pressed");
                            }}
                            buttonText1="Edit"
                            buttonText2="Cancel"
                        />) : null
                )) :
                    <View style={styles.iconArea}>
                        <Ionicons color="grey" name="card-outline" size={250} />
                    </View>

                }


            </View>
        </ScrollView>
    );

    const SecondRoute = () => (
        <ScrollView style={styles.container}>
            <View >
                {appointments?.map((item, index) => (
                    // <Text>{item.id}</Text>
                    appointments[index].status?.is_completed === true
                        && appointments[index].business_email == auth.currentUser.email ? (
                        <>
                            {/* <Card
                                title={item.service_name}
                                customerName={item.customer_name}
                                serviceName={item.service_name}
                                customerEmail={item.customer_email}
                                customerPhone={item.customer_phone}
                                price={item.service_price}
                                date={item.date}
                                time={item.time}
                                onPress={() => {
                                    console.log("Pressed");
                                }}
                                buttonText1="Edit"
                                buttonText2="Cancel"
                            /> */}


                            <TouchableOpacity
                                // onPress={() => { navigation.navigate('TimeSheetView') }}
                                style={{
                                    marginVertical: 7, justifyContent: 'center', borderRadius: 10, shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 2, padding: 12, marginStart: 15, marginEnd: 15, backgroundColor: 'white'
                                }}>

                                <Text style={{  fontSize: 18, marginVertical: 3, color: 'black', marginBottom: 8 }}>{item.customer_name} </Text>
                                <View style={{flexDirection:'row',backgroundColor:'#4cb7cb',alignItems:'center',borderRadius:40,padding:2}}>
                                <Fontisto name='email' size={15} color={'white'} style={{flex:1,marginStart:10}} />
                                <Text style={{  fontSize: 14,flex:9  }}>{item.customer_email}</Text>
                                </View>
                               
                                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', flex: .4, justifyContent: 'space-around', backgroundColor: '#4cb7cb', padding: 5, borderRadius: 5 }}>
                                        <Fontisto name='date' size={15} color={'white'} />
                                        <Text style={{  fontSize: 14, color: 'white' }}>{item.date}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', flex: .27, justifyContent: 'space-around', backgroundColor: '#4cb7cb', padding: 5, borderRadius: 5 }}>
                                        <Fontisto name='clock' size={15} color={'white'} />
                                        <Text style={{  fontSize: 14, color: 'white' }}>{item.time}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', flex: .27, justifyContent: 'space-around', backgroundColor:'#4cb7cb', padding: 5, borderRadius: 5 }}>
                                        <Fontisto name='dollar' size={15} color={'white'} />
                                        <Text style={{  fontSize: 14, color: 'white' }}>{item.service_price} Pkr</Text>
                                    </View>

                                </View>

                                <View style={{ position: 'absolute', right: 1, top: 8 }}>
                                    <Text style={{  fontSize: 14, flex: 0.23, backgroundColor: '#000', color: 'white', padding: 5, borderRadius: 30, paddingStart: 10, marginRight: 10, fontWeight: 'bold' }}>{item.service_name}</Text>
                                </View>

                            </TouchableOpacity>



                        </>
                    ) : null
                ))}

            </View>
        </ScrollView>
    );

    const ThirdRoute = () => (

        <ScrollView style={styles.container}>
            <View >
                {appointments?.map((item, index) => (
                    // <Text>{item.id}</Text>
                    appointments[index].status?.is_cancelled === true
                        && appointments[index].business_email == auth.currentUser.email ? (
                        <Card
                            title={item.service_name}
                            customerName={item.customer_name}
                            serviceName={item.service_name}
                            customerEmail={item.customer_email}
                            customerPhone={item.customer_phone}
                            price={item.service_price}
                            date={item.date}
                            time={item.time}
                            onPress={() => {
                                console.log("Pressed");
                            }}
                            buttonText1="Edit"
                            buttonText2="Cancel"
                        />) : null
                ))}


            </View>
        </ScrollView>
    );




    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#fff' }}
            style={{ backgroundColor: '#57B9BB', }}
        />
    );


    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={styles.container}
            renderTabBar={renderTabBar}
        />

    );
}

export default Appointments;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // height: '80%',
    },

    tabdesign:{
        backgroundColor:'#fff'
    }
})