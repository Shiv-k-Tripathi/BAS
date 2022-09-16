import { Text, View ,PermissionsAndroid} from 'react-native'
import React, { Component } from 'react'
import Contacts from "react-native-contacts";

export class Contact extends Component {
    async componentDidMount() {
        if (Platform.OS === "android") {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: "Contacts",
            message: "This app would like to view your contacts."
          }).then(() => {
            this.loadContacts();
          });
        } else {
          this.loadContacts();
        }
      }
    
      loadContacts() {
        Contacts.getAll()
          .then(contacts => {
            console.log(contacts);
          })
          .catch(e => {
            console.log(e);
          });
    
        Contacts.getCount().then(count => {
          console.log(count);
        });
    
        Contacts.checkPermission();
      }
  render() {

    return (
      <View>
        <Text>Contact</Text>
      </View>
    )
  }
}

export default Contact