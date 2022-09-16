import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph, Divider} from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const FullScreen = ({route , navigation}) => {
    const data=route.params
    console.log(data)
  return (
    <View style={styles.main}>
        {/* <Text>{data.name}</Text> */}
        <Card>
    <Card.Content>
      <Title>Name : {data.name}</Title>
      <Paragraph>Year Of Purches : {data.year}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: data.image }} />
    <Card.Content>
      <Title>Mobile Number : {data.number}</Title>
      <Title>Price : {data.price}</Title>
      <Title>Discripion : {data.disc}</Title>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  <View style={{margin:25}}>
    <Text style={{margin:10,fontSize:25,fontWeight: 'bold'}}>Other Result ...</Text>
    <Divider />
    <Text style={{margin:10,fontSize:25}}>Car</Text>
    <Divider />
    <Text style={{margin:10,fontSize:25}}>Mobile</Text>
    <Divider />
    <Text style={{margin:10,fontSize:25}}>Job</Text>
    <Divider />
  </View>
    </View>
  )
}
const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent: 'center', 
    alignItem: 'center'
  }
})

export default FullScreen
