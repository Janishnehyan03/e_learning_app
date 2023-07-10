import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import Axios from '../utils/Axios';

export default function PaymentScreen({route}) {
  const navigation = useNavigation();
  const {courseId, title, thumbnail, price} = route.params;

  useEffect(() => {
    return () => {
      RazorpayCheckout.clear();
    };
  }, []);

  const openCheckout = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await Axios.post(`/booking/${courseId}`);

    const responseData = response.data;
    const paymentId = responseData.order.id;

    const options = {
      key: 'rzp_test_PXZvFNXpJFylGx',
      amount: price * 100,
      name: 'CPET Darul Huda',
      order_id: paymentId,
      description: 'Payment',
      notes: {orderId: paymentId},
      prefill: {contact: '9746229547', email: 'cpetdarulhuda@gmail.com'},
      external: {
        wallets: ['paytm'],
      },
    };

    try {
      RazorpayCheckout.open(options);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async data => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await Axios.post('/booking/success/booking', {
      course: courseId,
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
      price: price,
    });

    if (response.status === 200) {
      navigation.navigate('HomeScreen');
    }
  };

  const handlePaymentError = data => {
    // Handle payment error
    console.log(data);
  };

  const handleExternalWallet = data => {
    // Handle external wallet
    console.log(data);
  };

  return (
    <View>
      <Image source={{uri: thumbnail}} style={{width: '100%', height: 200}} />
      <View style={{padding: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#104E3E'}}>
          ₹{price}
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#0D4759'}}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          padding: 15,
          borderRadius: 25,
          backgroundColor: '#155A44',
          alignItems: 'center',
        }}
        onPress={openCheckout}>
        <Text
          style={{
            fontFamily: 'nunito',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Checkout Now ₹{price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
