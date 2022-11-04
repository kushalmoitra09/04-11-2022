import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';

import Realm from 'realm';

const SplashScreen: FC = props => {
  const navigation = useNavigation();
  const realm= new Realm({
    path: 'neo.realm',
    schema: [
      {
        name: 'product_fav',
        properties: {
          product_id: 'int',
        },
      },
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name:  'HomeScreen' 
            },
          ],
        }),
      );
      // Add your logic for the transition
    }, 1000);
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
        style={{
          backgroundColor: 'white',
          // padding: 16,
          // justifyContent: 'center',
        }}>
        <View
          style={{
            margin: 16,
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              marginTop: 128,
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: 128,
                height: 128,
                backgroundColor: '#0D47A1',
                borderRadius: 64,
              }}
            />
          </View>

          <View style={{padding: 16}}>
            <Text style={{textAlign: 'center', color: '#0D47A1'}}>From</Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#0D47A1',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Something
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SplashScreen;
