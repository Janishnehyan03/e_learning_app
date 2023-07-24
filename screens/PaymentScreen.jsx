import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
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
      RazorpayCheckout.open(options)
        .then(data => {
          handlePaymentSuccess(data);
        })
        .catch(error => {
          // handle failure
          // alert(`Error: ${error.code} | ${error.description}`);
          Alert.alert('Payment Failed', "Error occured in your payment", [{ text: 'OK' }]);

        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async data => {
    const response = await Axios.post('/booking/success/booking', {
      course: courseId,
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
      price: price,
    });

    if (response.status === 200) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  return (
    <View style={{backgroundColor: '#d7d7d7', flex: 1}}>
      <Image source={{uri: thumbnail}} style={{width: '100%', height: 200}} />
      <View style={{padding: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>
          ₹{price}
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#000'}}>
          {title}
        </Text>
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
          Before Payment:
        </Text>
        <Text style={{fontSize: 16, color: '#000'}}>
          - Do not click the back button after the payment process
        </Text>
        <Text style={{fontSize: 16, color: '#000'}}>
          - പേയ്‌മെന്റിൽ ക്ലിക്ക് ചെയ്ത ശേഷം ബാക്ക് ബട്ടണിൽ ക്ലിക്ക് ചെയ്യരുത്
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
