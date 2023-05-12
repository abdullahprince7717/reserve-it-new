import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import ReviewCard from '../../components/businessProfile/ReviewCard'
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

                console.log("reviews", "reviews");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getReviews();
    }, []);
    return (
        <View>
            <Text>My Reviews</Text>
            {/* {reviews ? <View style={{ flex: 1, backgroundColor: '#fff', margin: 10, }}>
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
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> No Reviews to show </View>} */}
            <View style={{ flex: 1, backgroundColor: '#fff', margin: 10, }}>
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
            </View>
        </View>
    )
}

export default Reviews