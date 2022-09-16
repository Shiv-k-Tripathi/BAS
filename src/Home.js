import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  ListView,
  FlatList,
  Alert,
  Button,
  Image,
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
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
// import Navsc from './Navsc'
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const Home = ({navigation, Screen}) => {
  const [data, setdata] = useState([]);
  const [cars, setCars] = useState([]);
  const [pet, setPet] = useState([]);
  const [job, setJob] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [bike, setBike] = useState([]);
  const [electrinic, setElectronic] = useState([]);
  const [home, setHome] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [test, setTest] = useState(false);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(true);
  const [onePost, setOnePost] = useState([]);
  const [vishible, setVishible] = useState(2);
  const [loading, setloading] = useState(true);
  const [loadingImg, setloadingImg] = useState(true);
  const [butt, setbutt] = useState(true);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const LoadScren = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 150,
        }}>
        <Image
          source={require('./../img/ZZ5H.gif')}
          style={{width: 100, height: 100}}
        />
      </View>
    );
  };

  // scrollview
  const Scrollview1 = () => {
    return (
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {/* car */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Car');
          }}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/3097180.png')} />
            </View>
            <Text style={[styles.textcar]}>Cars</Text>
          </View>
        </TouchableOpacity>
        {/* Bike */}
        <TouchableOpacity onPress={() => navigation.navigate('Bikes')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/3149029.png')} />
            </View>
            <Text style={styles.textcar}>Bikes</Text>
          </View>
        </TouchableOpacity>
        {/* Mobiles */}
        <TouchableOpacity onPress={() => navigation.navigate('Mobiles')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/2586488.png')} />
            </View>
            <Text style={styles.textcar}>Mobiles</Text>
          </View>
        </TouchableOpacity>
        {/* Laptops */}
        <TouchableOpacity onPress={() => navigation.navigate('Laptops')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/123400.png')} />
            </View>
            <Text style={styles.textcar}>Laptops</Text>
          </View>
        </TouchableOpacity>
        {/* Home */}
        <TouchableOpacity onPress={() => navigation.navigate('Home_Product')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/609803.png')} />
            </View>
            <Text style={styles.textcar}>Home</Text>
          </View>
        </TouchableOpacity>
        {/* Jobs */}
        <TouchableOpacity onPress={() => navigation.navigate('Job')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/609803.png')} />
            </View>
            <Text style={styles.textcar}>Jobs</Text>
          </View>
        </TouchableOpacity>
        {/* Eletronic */}
        <TouchableOpacity onPress={() => navigation.navigate('Electronic')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/3659899.png')} />
            </View>
            <Text style={styles.textcar}>Eletronic</Text>
          </View>
        </TouchableOpacity>
        {/* Pets */}
        <TouchableOpacity onPress={() => navigation.navigate('Pet_Details')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/3047928.png')} />
            </View>
            <Text style={styles.textcar}>Pets</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const pullrefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  // deatil
  const getdata = async () => {
    const userdata = await firestore().collection('detail').get();
    const udata = userdata.docs.map(docSnap => docSnap.data());
    setdata(udata);
    console.log(udata);
  };
  useEffect(() => {
    getdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  // cardetail
  const getdatas = async () => {
    const usercar = await firestore().collection('cardetail').get();
    const ucar = usercar.docs.map(docSnap => docSnap.data());
    setCars(ucar);
    console.log('car detail', ucar);
    setloading(false);
  };

  const randomdata = () => {
    for (let i = 0; i < cars.length; i++) {
      const random = cars[Math.floor(Math.random() * cars.length)];
      setOnePost(data => [...data, random]);
      console.log('random data', random);
    }
  };

  useEffect(() => {
    randomdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  useEffect(() => {
    getdatas();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);
  const [searchQuery, setSearchQuery] = useState('');

  // search box
  const onChangeSearch = query => setSearchQuery(query);
  if (searchQuery) {
  }

  // pet deatil
  const getpet = async () => {
    const petdata = await firestore().collection('petdetail').get();
    const pdata = petdata.docs.map(docSnap => docSnap.data());
    setPet(pdata);
    console.log('pet data', pdata);
  };
  useEffect(() => {
    getpet();
    return () => {
      console.log('pet data');
    };
  }, [refresh]);

  //job deatil
  const jobdata = async () => {
    const jobdata = await firestore().collection('jobdetail').get();
    const jdata = jobdata.docs.map(docSnap => docSnap.data());
    setJob(jdata);
    console.log('job data', jdata);
  };
  useEffect(() => {
    jobdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  //mobile deatil
  const mobdata = async () => {
    const mobiledata = await firestore().collection('mobiledetail').get();
    const mdata = mobiledata.docs.map(docSnap => docSnap.data());
    setMobile(mdata);
    console.log('mobile data', mdata);
  };
  useEffect(() => {
    mobdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  //Laptop deatil
  const laptopdata = async () => {
    const lapdata = await firestore().collection('laptopdetail').get();
    const ldata = lapdata.docs.map(docSnap => docSnap.data());
    setLaptop(ldata);
    console.log('Laptop data', ldata);
  };
  useEffect(() => {
    laptopdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  //bike deatil
  const bikedata = async () => {
    const bikesdata = await firestore().collection('bikedetail').get();
    const bdata = bikesdata.docs.map(docSnap => docSnap.data());
    setBike(bdata);
    console.log('bike data', bdata);
  };
  useEffect(() => {
    bikedata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  //home deatil
  const homedata = async () => {
    const homesdata = await firestore().collection('homedetail').get();
    const hodata = homesdata.docs.map(docSnap => docSnap.data());
    setHome(hodata);
    console.log('home data', hodata);
    console.log(hodata.length);
  };
  useEffect(() => {
    homedata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  //electronic deatil
  const electricdata = async () => {
    const electronicdata = await firestore().collection('electricdetail').get();
    const eledata = electronicdata.docs.map(docSnap => docSnap.data());
    setElectronic(eledata);
    console.log('electronic data', eledata);
  };
  useEffect(() => {
    electricdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  const Rcomounent = a => {
    console.log(a);
    return (
      <Provider>
        <View>
          <Button onPress={showDialog}>Show Dialog</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  };

  const ShowEvery = a => {
    return a.map(data => {
      return Rcomounent(data);
    });
  };
  const DataR = () => {
    return (
      <View>
        {cars.length % 2 == 0 ? ShowC(cars) : ShowCO(cars)}
        {pet.length % 2 == 0 ? ShowC(pet) : ShowCO(pet)}
        {bike.length % 2 == 0 ? ShowC(bike) : ShowCO(bike)}
        {mobile.length % 2 == 0 ? ShowC(mobile) : ShowCO(mobile)}
        {home.length % 2 == 0 ? ShowC(home) : ShowCO(home)}
        {electrinic.length % 2 == 0 ? ShowC(electrinic) : ShowCO(electrinic)}
        {laptop.length % 2 == 0 ? ShowC(laptop) : ShowCO(laptop)}
        {job.length % 2 == 0 ? ShowC(job) : ShowCO(job)}
        {/* {cars.length % 2 == 0 ? ShowC(job) : ShowCO(job)} */}
      </View>
    );
  };
  const datashow = (data) => {
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
                <Title>Price : {data.price}</Title>
              </Card.Content>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  const ShowC = a => {
    return (
      <View
        style={{
          backgroundColor: '#E8E8E8',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {a.slice(0, vishible).map(data => {
          return datashow(data);
        })}
      </View>
    );
  };

  const ShowCO = a => {
    return a.slice(0, vishible).map(data => {
      return datashow(data);
    });
  };

  const vishiable = () => {
    setloadingImg(false);
    setTimeout(() => {
      setVishible(vishible + 2);
      setloadingImg(true);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>BAS PRODUCTS</Text>
      <View style={styles.search}>
        <Searchbar
          style={{borderRadius: 50, borderWidth: 1, borderSize: 10}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.scmain}>
        <Scrollview1 />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullrefresh()}
          />
        }>
        {loading ? <LoadScren /> : <DataR />}

        {loading ? (
          ''
        ) : (
          <TouchableOpacity onPress={vishiable}>
            {loadingImg ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  backgroundColor: 'black',
                  color: '#fff',
                  marginBottom: 5,
                }}>
                More
              </Text>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Image
                  source={require('./../img/Spinner-2.gif')}
                  style={{width: 40, height: 30}}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
        {/* <View>
          <Button title="refresh" onPress={()=>navigation.navigate('Refresh')} color="black" />
        </View> */}
        <View style={{margin: 110}}>
          <Text>{''}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 25,
    margin: 10,
    color: 'red',
    textAlign: 'center',
  },
  search: {
    margin: 2,
  },
  item: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 2,
  },
  data1: {
    fontSize: 20,
    margin: 10,
    color: 'skyblue',
  },
  scmain: {
    margin: 5,
  },
  scrollView: {
    marginHorizontal: 3,
  },
  infocar: {
    alignItem: 'center',
  },
  imgcar: {
    width: 80,
    hight: 50,
    backgroundColor: '#fff',
  },
  textcar: {
    textAlign: 'center',
    margin: 4,
    fontSize: 20,
    color: 'black',
  },
  container: {},
});
export default Home;
