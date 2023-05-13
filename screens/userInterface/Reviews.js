import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import ReviewCard from '../../components/businessProfile/ReviewCard'
import { Caption, Divider, Paragraph, Subheading, } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import moment from 'moment';
import { db, auth } from "../../firebase/FirebaseConfig.js";
import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore";

function Reviews() {

    const [reviews, setReviews] = useState([]);
    const reviewsRef = collection(db, "reviews");
    const [queryResult, setQueryResult] = useState([]);

    const getReviews = async () => {
        const q = query(reviewsRef, where("customer_email", "==", auth.currentUser.email));
        setQueryResult(q);
        await getDocs(q)
            .then((res) => {
                setReviews(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));

                // console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

                console.log("reviews", reviews);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getReviews();
    }, []);
    return (
        <View style={{ height: 500, }}>
            <Text>My Reviews</Text>
            {/* {reviews.length < 1 ?
                <View style={{ flex: 1, backgroundColor: '#fff', margin: 10, }}>
                    <ScrollView>
                        {reviews.map((item, index) => (
                            <ReviewCard
                                customerEmail={"abdullahprince7717@gmail.com"}
                                customerName={"Abdullah Ali"}
                                customerReview={"asgdjaskbdbaj"}
                                businessTitle={"item.business_name"}
                                rating={"item.rating"}
                                time={"item.time"}
                                onPress={() => {
                                    console.log('Pressed')
                                    props.navigation.navigate('Booking', { service: services[index], data: props?.route?.params?.data })
                                }}
                            />
                        ))}

                    </ScrollView>
                </View>
                :
                <Text>No Reviews</Text>} */}
            {/* <ReviewCard
                customerEmail={"abdullahprince7717@gmail.com"}
                customerName={"Abdullah Ali"}
                customerReview={"asgdjaskbdbaj"}
                businessTitle={"item.business_name"}
                rating={"item.rating"}
                time={"item.time"}
                onPress={() => {
                    console.log('Pressed')
                    props.navigation.navigate('Booking', { service: services[index], data: props?.route?.params?.data })
                }}
            /> */}
            <View style={{ width: '90%', flex: 1, flexDirection: 'column', borderRadius: 5 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: 'bold', }}>
                        Abdullah Ali
                    </Text>
                    <Text style={{ marginRight: 10 }}>
                        {time}
                    </Text>
                </View>


                <StarRating
                    rating={rating}
                    onChange={setRating}
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
            {/* <Divider style={{ height: 2, width: '75%', color: '#000', marginTop: 15, marginBottom: 20, }} /> */}
        </View>
    )
}

export default Reviews