import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import  WebView  from 'react-native-webview';


const Videos = () => {
  const google='https://google.com/';
  const [data, setdata] = useState([]);
  const [play, setplay] = useState(true);
 
const playbutton=()=>{
  setplay(false)
}

  const getdata = async () => {
    const fetchdata = await fetch(
      'https://www.googleapis.com/youtube/v3/search?key=AIzaSyClM-RcqHc93vLz7eyJPK631tc3J2pQGKM&type=video&part=snippet',
    );
    const getdatavalue = await fetchdata.json();
    console.log('youtube', getdatavalue);
    setdata(getdatavalue.items);
  };

  useEffect(() => {
    getdata();

    return () => {
      console.log('unamount');
    };
  }, []);

  return (
    <View style={{height:'100%',width:'100%'}}>
      {/* <ScrollView> */}
        {/* https://www.youtube.com/watch?v=${result.id.videoId}` */}
        {/* {data.map(result => {
          return (
            <View style={{margin:5}} key={result.id.videoId}>
            <ImageBackground
              resizeMode="cover"
              source={{uri: result.snippet.thumbnails.high.url}}>
              <Video
                
                controls={true}
                paused={play}
                headers={result.snippet.title}
                source={{
                  uri: `https://www.youtube.com/watch?v=${result.id.videoId}`,
                }}
                style={{width: '100%', height: 250}}
                hideShutterView={true}
              />
            </ImageBackground>
            </View>
          );
        })} */}
         <WebView source={{ uri:`https://www.youtube.com/watch?v=nEm8yMXwIis`  }} automaticallyAdjustContentInsets={false} onLoad={()=>{return console.log("loaded",google)}}  />
      

    
      {/* </ScrollView> */}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({});
