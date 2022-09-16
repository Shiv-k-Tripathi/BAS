import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Button,
  Linking,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Searchbar,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeShow = ({navigation}) => {
  const [data, setData] = useState([]);
  const [vishible, setVishible] = useState(2);
  const [loading, setloading] = useState(false);
  const [loadingImg, setloadingImg] = useState(true);
  const [length, setLength] = useState(null);
  const [last, setLast] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [ltoh, setltoh] = useState([]);
  const [filterltof, setfilterltof] = useState(true);

  const get_data = async () => {
    const homedata = await firestore().collection('homedetail').get();
    const gethomedata = homedata.docs.map(docSnap => docSnap.data());
    if (gethomedata.length % 2 == 0) {
      setLength(gethomedata.length);
    } else {
      setLength(gethomedata.length - 1);
      setTimeout(() => {
        setLast(gethomedata[data.length - 1]);
        console.log('shiv', last);
      }, 300);
    }
    console.log(length);
    setData(gethomedata);
  };
  useEffect(() => {
    get_data();
    return () => {
      console.log('homedata from bike show');
    };
  }, [refresh]);

  const diplaymoredata = () => {
    setloadingImg(false);
    setTimeout(() => {
      setRefresh(true);
      setRefresh(false);
      setVishible(vishible + 2);
      setloadingImg(true);
    }, 600);
  };
  const Fetchdata = a => {
    return a.slice(0, vishible).map(data => {
      return display(data);
    });
  };

  const display = data => {
    return (
      <View
        key={data.name}
        style={{
          borderWidth: 1,
          margin: 2,
          alignItem: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FullScreen',data)}>
          <Card>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 2,
              }}>
              <Avatar.Image size={180} source={{uri: data.image}} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Card.Content>
                <Title>Name : {data.name}</Title>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${data.number}`)}>
                  <Title>
                    <Ionicons name="call-outline" size={25} color="black" />:{' '}
                    {data.number}
                  </Title>
                </TouchableOpacity>
              </Card.Content>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  const Refreshdata = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 200);
  };
  const Showlastdata = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          margin: 2,
          alignItem: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FullScreen',last)}>
          <Card>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 2,
              }}>
              <Avatar.Image size={180} source={{uri: last.image}} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Card.Content>
                <Title>Name : {last.name}</Title>
                <Title>Price : {last.price}</Title>
              </Card.Content>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  const filter = () => {
    data.sort((a, b) => {
      if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1;
      } else {
        return 1;
      }
    });
    setfilterltof(false);
    console.log('sort', data);
    setltoh(data);
  };

  return (
    <View>
      <View style={{borderWidth: 1, margin: 2, flexDirection: 'row'}}>
        <Text style={{textAlign: 'center', fontSize: 25, margin: 3}}>
          {data.length} Results Found
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <Button title="Price (Low To High)" onPress={filter} />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => Refreshdata()}
          />
        }>
        <View
          style={{
            backgroundColor: '#E8E8E8',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {filterltof ? Fetchdata(data) : Fetchdata(ltoh)}
        </View>
        {/* last data */}

        {last ? Showlastdata() : ''}

        <View>
          {loading ? (
            ''
          ) : (
            <TouchableOpacity
              onPress={diplaymoredata}
              disabled={vishible == length ? true : false}>
              {loadingImg ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    backgroundColor: 'black',
                    color: '#fff',
                    marginBottom: 5,
                    marginHorizontal: 5,
                    margin: 3,
                  }}>
                  {vishible == length ? (
                    <Text>No More Data</Text>
                  ) : (
                    <Text>More</Text>
                  )}
                </Text>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    margin: 7,
                  }}>
                  <Image
                    source={require('./../img/Spinner-2.gif')}
                    style={{width: 40, height: 30}}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginBottom: 30}}>
          <Text>{''}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeShow;

const styles = StyleSheet.create({});
