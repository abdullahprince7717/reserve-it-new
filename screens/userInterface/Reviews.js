import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
// import ReviewCard from '../../components/businessProfile/ReviewCard'
import { Caption, Divider, Paragraph, Subheading, } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import moment from 'moment';
import { db, auth } from "../../firebase/FirebaseConfig.js";
import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

function Reviews() {

    const reviewsRef = collection(db, "reviews");
    const [queryResult, setQueryResult] = useState([]);

    const getReviews = async () => {
        const q = query(reviewsRef, where("client_email", "==", auth.currentUser.email));
        setQueryResult(q);
        await getDocs(q)
            .then((res) => {
                setQueryResult(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
                console.log('queryResult', queryResult);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const collectionRef = collection(db, "business_users")
    const getQueryResult = async () => {

        let q = query(collectionRef, where("category", "==", 'salon'))
        await getDocs(q)
            .then((res) => {
                setQueryResult(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
                console.log(queryResult);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useFocusEffect(
        React.useCallback(() => {
            getQueryResult();
            getReviews();
            console.log('Screen was focused');
        }, []))
    return (
        <View style={styles.container}>
            <Text>My Reviews</Text>

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
    )
}

export default Reviews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})