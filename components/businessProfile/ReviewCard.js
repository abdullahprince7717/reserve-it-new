import React from 'react'
import { View, Text } from 'react-native';
import { Caption, Divider, Paragraph, Subheading, } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import moment from 'moment';

function ReviewCard(props) {

    return (
        <View style={{ height: 500 }}>
            <View style={{ width: '90%', flex: 1, flexDirection: 'column', borderRadius: 5 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: 'bold', }}>
                        {props.customerName}
                    </Text>
                    <Text style={{ marginRight: 10 }}>
                        {props.time}
                    </Text>
                </View>


                <StarRating
                    rating={5}
                    // onChange={setRating}
                    maxStars={5}
                    starSize={20}
                    color="orange"
                    style={{ margin: 5 }}
                />

                <Subheading style={{ marginLeft: 10 }}>
                    {props.customerName}
                </Subheading>

                <Caption style={{ marginLeft: 15, }} >
                    {props.businessTitle}
                </Caption>

                <Paragraph style={{ marginLeft: 10, backgroundColor: 'white', borderRadius: 10, paddingLeft: 5 }} >
                    {props.customerReview}
                </Paragraph>

            </View>

            {/* <Divider style={{ height: 2, width: '75%', color: '#000', marginTop: 15, marginBottom: 20, }} /> */}
        </View>
    )
}

export default ReviewCard