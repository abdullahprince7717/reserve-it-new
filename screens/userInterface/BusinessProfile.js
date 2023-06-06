import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import { ImageSlider } from "react-native-image-slider-banner";
import { Caption, Title, Divider, Paragraph, ProgressBar, Subheading, Button } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AntDesign, Ionicons } from "@expo/vector-icons/"
import StarRating from 'react-native-star-rating-widget';
import moment from 'moment';
import ServiceCard from '../../components/businessProfile/ServiceCard.js';
import ReviewCard from '../../components/businessProfile/ReviewCard.js';
import { db, auth } from "../../firebase/FirebaseConfig.js";
import { collection, getDocs, doc, setDoc, query, where, addDoc } from "firebase/firestore";
import * as Linking from 'expo-linking';

const BusinessProfile = (props) => {
    const layout = useWindowDimensions();
    const [isFilled, setIsFilled] = useState(false)
    const reviewRef = useRef();

    const [showReview, setShowReview] = useState(true)
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    // const [reviews, setReviews] = useState([{ customer_email: 'abdullahprince7717', customer_name: 'Abdullah Ali', customer_review: 'asgdjaskbdbaj', business_title: 'Hameed clinic', rating: 5, time: moment().format('MMMM Do YYYY'), business_email: props?.route?.params?.data?.email }]);
    const [reviews, setReviews] = useState([]);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [reviewsAverage, setReviewsAverage] = useState(0);
    let fiveRating = reviews.filter((item) => item.rating == 5).length
    fiveRating = reviews.length == 0 ? 0 : (fiveRating / reviews.length)

    let fourRating = reviews.filter((item) => item.rating == 4).length
    fourRating = reviews.length == 0 ? 0 : (fourRating / reviews.length)

    let threeRating = reviews.filter((item) => item.rating == 3).length
    threeRating = reviews.length == 0 ? 0 : (threeRating / reviews.length)

    let twoRating = reviews.filter((item) => item.rating == 2).length
    twoRating = reviews.length == 0 ? 0 : (twoRating / reviews.length)

    let oneRating = reviews.filter((item) => item.rating == 1).length
    oneRating = reviews.length == 0 ? 0 : (oneRating / reviews.length)



    const [index, setIndex] = useState(0);
    const [rating, setRating] = useState(0);
    const [data, setData] = useState([props.route?.params?.data]);
    const [services, setServices] = useState([]);
    const [userData, setUserData] = useState();
    const [queryResult, setQueryResult] = useState([]);
    const servicesRef = collection(db, "services");
    const reviewsRef = collection(db, "reviews");
    const time = moment().format('MMMM Do YYYY h:mm:ss a');

    const getUserData = () => {
        const myDoc = doc(db, "users", auth.currentUser.uid)
        getDocs(myDoc)
            .then((snapshot) => {

                if (snapshot.exists) {
                    setUserData(snapshot.data())
                    // console.log(storedCredentials);
                    console.log(myDoc)
                }
                else {
                    console.log("No User Data")
                }
            })
            .catch((error) => {
                console.log(error.message)

            })
    }

    const getServices = async () => {
        const q = query(servicesRef, where("business_email", "==", props?.route?.params?.data?.email));
        setQueryResult(q);
        await getDocs(q)
            .then((res) => {
                setServices(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getReviews = async () => {
        const q = query(reviewsRef, where("business_email", "==", props?.route?.params?.data?.
            email));
        setQueryResult(q);
        await getDocs(q)
            .then((res) => {
                setReviews(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
                console.log("reviews",
                    reviews);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addReview = () => {
        const reviewsCollection = collection(db, "reviews");
        const review = {
            customer_name: userData?.name,
            business_name: props?.route?.params?.data?.business_name,
            rating: rating,
            business_email: props?.route?.params?.data?.business_email,
            customer_email: userData?.email,
            customer_review: reviewText,
            time: time,

        }

        addDoc(reviewsCollection, review)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
    };


    useEffect(() => {
        getServices();
        getReviews();
        // getUserData();
        // console.log("reviews.length", reviews.length)
    }, [])

    // useEffect(() => {
    //     const sendVerificationEmail = async () => {
    //         const user = auth.currentUser.uid;

    //         if (user) {
    //             try {
    //                 await user.sendEmailVerification();
    //                 console.log('Verification email sent successfully.');
    //             } catch (error) {
    //                 console.error('Error sending verification email:', error);
    //             }
    //         }
    //     };

    //     sendVerificationEmail();
    // }, []);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff', margin: 10, }}>
            <ScrollView>
                {services.map((item, index) => (
                    <ServiceCard
                        name={item.name}
                        price={item.price}
                        time={item.duration + " mins"}
                        onPress={() => {
                            console.log('Pressed')
                            props.navigation.navigate('Booking', { service: services[index], data: props?.route?.params?.data })
                        }}
                    />))}

            </ScrollView>
        </View>
    );

    const SecondRoute = () => (

        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }} >

                {/* START of Overall rating card */}

                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 130, borderRadius: 20, borderWidth: 0.4, justifyContent: 'center', alignItems: 'center', margin: 20, flexWrap: 'wrap' }}>

                    <View style={{
                        flexDirection: 'column', height: '90%', width: '46%', justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 0, fontSize: 30 }}>
                                {reviewsAverage.toFixed(1)}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 20 }}>
                                /5
                            </Text>
                        </View>
                        <StarRating
                            rating={3.5}
                            onChange={() => console.log("Pressed")}
                            starSize={20}
                            color="orange"
                            style={{ margin: 5 }}

                        />
                        <Text style={{ marginTop: 10, fontSize: 10 }}>
                            Based on {reviews.length} reviews
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column', margin: 5, width: 0.4, height: '90%', backgroundColor: 'grey' }} />

                    <View style={{ flexDirection: 'column', height: '90%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 5 }}>
                                5 <Ionicons color="orange" name="star" size={16} />
                            </Text>

                            <ProgressBar style={{ height: 5, width: 115, backgroundColor: 'grey' }} progress={fiveRating} color='orange' />

                            <Text style={{ marginLeft: 5 }}>
                                {reviews.filter((item) => item.rating == 5).length}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 5 }}>
                                4 <Ionicons color="orange" name="star" size={16} />
                            </Text>

                            <ProgressBar style={{ height: 5, width: 115, backgroundColor: 'grey' }} progress={0.25} color='orange' />

                            <Text style={{ marginLeft: 5 }}>
                                {reviews.filter((item) => item.rating == 4).length}
                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 5 }}>
                                3 <Ionicons color="orange" name="star" size={16} />
                            </Text>

                            <ProgressBar style={{ height: 5, width: 115, backgroundColor: 'grey' }} progress={0.9} color='orange' />

                            <Text style={{ marginLeft: 5 }}>
                                {reviews.filter((item) => item.rating == 3).length}
                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 5 }}>
                                2 <Ionicons color="orange" name="star" size={16} />
                            </Text>

                            <ProgressBar style={{ height: 5, width: 115, backgroundColor: 'grey' }} progress={0.8} color='orange' />

                            <Text style={{ marginLeft: 5 }}>
                                {reviews.filter((item) => item.rating == 2).length}
                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', margin: 3, alignItems: 'center', }}>
                            <Text style={{ marginRight: 5 }}>
                                1 <Ionicons color="orange" name="star" size={16} />
                            </Text>

                            <ProgressBar style={{ height: 5, width: 115, backgroundColor: 'grey' }} progress={0.5} color='orange' />

                            <Text style={{ marginLeft: 5 }}>
                                {reviews.filter((item) => item.rating == 1).length}
                            </Text>

                        </View>
                    </View>
                </View>

                {/* END of Overall rating card */}

                {showReview === true && reviews.client_email != auth.currentUser.email ? (
                    <View style={{ height: "25%", width: '90%', borderColor: 'black', borderWidth: 0.5, borderRadius: 10, padding: 10 }} >
                        <View >
                            <StarRating
                                rating={reviewRating}
                                onChange={setReviewRating}
                                maxStars={5}
                                starSize={20}
                                color="orange"
                                style={{ margin: 5, marginLeft: 0 }}
                            />
                            <TextInput
                                placeholder="Review"
                                placeholderTextColor={"#000"}
                                value={reviewText}
                                onChangeText={text => setReviewText(text)}
                                style={{ height: 40 }}
                                multiline={true}
                            />

                            <Button mode="outlined" style={{ marginTop: 10 }} labelStyle={{ color: 'black' }} onPress={() => {
                                console.log('Pressed')
                                if (reviewText.length === 0) {
                                    Alert.alert('Please enter your review');
                                }
                                else {
                                    setShowReview(!showReview)
                                }
                            }}>
                                Submit
                            </Button>
                        </View>
                    </View>) : null}

                <View style={{ width: '90%', borderRadius: 5, borderWidth: 1, borderColor: '#000' }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: 'bold', }}>
                            Abdullah Ali
                        </Text>
                        <Text style={{ marginRight: 10 }}>
                            {moment().format('MMMM Do YYYY, h:mm:ss a')}
                        </Text>
                    </View>


                    <StarRating
                        rating={5}
                        onChange={() => console.log("rating")}
                        maxStars={5}
                        starSize={20}
                        color="orange"
                        style={{ margin: 5 }}
                    />

                    <Subheading style={{ marginLeft: 10 }}>
                        Service name
                    </Subheading>

                    <Caption style={{ marginLeft: 15, }} >
                        By Business Name
                    </Caption>

                    <Paragraph style={{ marginLeft: 10, backgroundColor: 'white', borderRadius: 10, paddingLeft: 5 }} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec eget ex vitae nunc tincidunt egestas.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec eget ex vitae nunc tincidunt egestas.
                    </Paragraph>

                </View>

                <Divider style={{ height: 2, width: '75%', color: '#000', marginTop: 15, marginBottom: 20, }} />



            </View>
        </ScrollView>

    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', }} >
            <ScrollView>
                <View style={styles.details}>

                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
                        ABOUT US
                    </Text>

                    <Paragraph style={{ color: 'black', fontSize: 15, marginTop: 10 }}>
                        {props?.route?.params?.data?.business_description}
                    </Paragraph>

                    <Divider style={{ height: 1, color: '#000', marginTop: 10, marginBottom: 10, }} />

                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
                        CONTACT AND BUSINESS HOURS
                    </Text>

                    <Divider style={{ height: 1, color: '#000', marginTop: 10, marginBottom: 10, }} />

                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign color="black" name="mobile1" size={20} />
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`tel:${props?.route?.params?.data?.business_phone}`);
                        }}>
                            <Text style={{ marginLeft: 10, color: "black", fontSize: 17, color: 'grey' }}>
                                {props?.route?.params?.data?.business_phone}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Divider style={{ height: 1, color: '#000', marginTop: 10, marginBottom: 15, }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Monday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>

                            {props?.route?.params?.data?.monday?.isOpen === true ? (props?.route?.params?.data?.monday?.startTime) + " - " + (props?.route?.params?.data?.monday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}

                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Tuesday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {props?.route?.params?.data?.tuesday?.isOpen === true ? (props?.route?.params?.data?.tuesday?.startTime) + " - " + (props?.route?.params?.data?.tuesday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Wednesday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {props?.route?.params?.data?.wednesday?.isOpen === true ? (props?.route?.params?.data?.wednesday?.startTime) + " - " + (props?.route?.params?.data?.wednesday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Thursday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {props?.route?.params?.data?.thursday?.isOpen === true ? (props?.route?.params?.data?.thursday?.startTime) + " - " + (props?.route?.params?.data?.thursday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}
                        </Text>
                    </View><View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Friday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {props?.route?.params?.data?.friday?.isOpen === true ? (props?.route?.params?.data?.friday?.startTime) + " - " + (props?.route?.params?.data?.friday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Saturday
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {props?.route?.params?.data?.saturday?.isOpen === true ? (props?.route?.params?.data?.saturday?.startTime) + " - " + (props?.route?.params?.data?.saturday?.endTime) : "CLOSED"}
                            {/* <Text>10:00 AM - 10:00 PM</Text> */}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginBottom: 15, }} >
                        <Text style={{}}>
                            Sunday
                        </Text>
                        <Text style={{ fontWeight: 'bold', }}>
                            {props?.route?.params?.data?.sunday?.isOpen === true ? (props?.route?.params?.data?.sunday?.startTime) + " - " + (props?.route?.params?.data?.sunday?.endTime) : "CLOSED"}
                            {/* <Text>CLOSED</Text> */}
                        </Text>
                    </View>

                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
                        Social Media and Share
                    </Text>

                    <Divider style={{ height: 1, color: '#000', marginTop: 10, marginBottom: 10, }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 360, marginTop: 20, marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`https://www.instagram.com/sharer/sharer.php?u=${props?.route?.params?.data?.business_url}`);
                        }}>
                            <AntDesign color="red" name="instagram" size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`whatsapp://send?text=${props?.route?.params?.data?.business_name + " " + props?.route?.params?.data?.business_phone + " " + props?.route?.params?.data?.business_email}`);
                        }}>
                            <AntDesign color="green" name="sharealt" size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${props?.route?.params?.data?.business_url}`);
                        }}>
                            <AntDesign color="blue" name="facebook-square" size={40} />
                        </TouchableOpacity>

                    </View>

                    <Divider style={{ height: 1, color: '#000', marginTop: 10, marginBottom: 10, }} />

                    {/* <TouchableRipple
                        onPress = { ()=> {
                                console.log("jhasdk,")
                        }}
                    >
                        <Text style={{ color:'grey',fontSize: 20, fontWeight:'bold',marginLeft: 10,marginTop: 10,marginBottom: 10 }}>
                            Payment and Cancellation Policy
                        </Text>
                    </TouchableRipple>
                    
                    <TouchableRipple
                        onPress = { ()=> {
                                console.log("jhasdk,")
                        }}
                    >
                        <Text style={{ color:'grey',fontSize: 20, fontWeight:'bold',marginLeft: 10,marginTop: 10,marginBottom: 10 }}>
                            Report
                        </Text>
                    </TouchableRipple> */}



                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>
                        EXTRAA TEXT
                    </Text>
                    {/* <Divider style = {{height:1,color:'#000',marginTop:10,marginBottom:10,}} /> */}

                </View>
            </ScrollView>
        </View>
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
            style={{ backgroundColor: '#000', }}
        />
    );

    const [routes] = React.useState([
        { key: 'first', title: 'Services' },
        { key: 'second', title: 'Reviews' },
        { key: 'third', title: 'Details' },
    ]);

    const handleFav = () => { }

    // const renderScene = ({ route }) => {
    //     switch (route.key) {
    //         case 'first':
    //             return <FirstRoute prop={props} />;
    //         case 'second':
    //             return <SecondRoute />;
    //         default:
    //             return null;
    //     }
    // };


    return (
        <View style={{ height: '100%' }}>
            <View style={styles.imageSlider}>
                <ImageSlider
                    data={[
                        { img: props?.route?.params?.data?.image },
                        // { img: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
                        // { img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' }
                    ]}
                    autoPlay={false}
                    // onItemChanged={(item) => console.log("item", item)}
                    closeIconColor="#fff"
                >
                </ImageSlider>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <View style={{ flex: 0.9, margin: 10, }}>
                    <Title>
                        <Text>{props.route?.params?.data?.business_name}</Text>                        {/* {props.title} */}
                    </Title>
                    <Caption>
                        {props.route?.params?.data?.business_address}                        {/* {props.address} */}
                    </Caption>
                </View>
                {/* <View style={{ flex: 0.1 }}>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={handleFav}>
                        <Ionicons name={isFilled ? "heart" : "heart-outline"} size={28} color="red" />

                    </TouchableOpacity>
                </View> */}

            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default BusinessProfile;

const deviceWidth = Math.round(Dimensions.get('window').width);

styles = StyleSheet.create({

    container: {

        height: '100%'
        // backgroundColor: 'grey',
    },
    services: {
        borderRadius: 30,
    },
    service: {
        flexDirection: 'column',
        backgroundColor: 'blue',
        width: deviceWidth - 25,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 20,
        height: 80,
        flexWrap: 'wrap',
        marginBottom: 20,
        borderRadius: 30,


    },

    listView: {
        flexDirection: 'row',
        backgroundColor: 'red',
        flex: 3,

    },
    buttonView: {
        flexDirection: 'row',
        backgroundColor: 'green',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#57B9BB',
        width: '85%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageSlider: {

    },
    details: {
        flex: 1,
        width: deviceWidth - 30,
        backgroundColor: '#fff',
        marginTop: 30,
        // justifyContent: 'center',
        // alignItems: 'center',

    },

});