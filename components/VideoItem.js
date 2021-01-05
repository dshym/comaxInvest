
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, Pressable, StyleSheet, Image, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import LinkPreview from 'react-native-link-preview';
import { useSelector, useDispatch } from 'react-redux';
import * as videoActions from '../store/actions/video';
import * as Linking from 'expo-linking';


import vars from '../evn';
const VideoItem = props => {
    const dispatch = useDispatch();
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(()  => {
      setIsLoading(true);
      LinkPreview.getPreview(props.link).then(data => setLink(data.images[0]));
      setIsLoading(false);
    }, [])

    const itemHandler = () => {
      Alert.alert("Choose action", "What to do?", [
        {text: "Cancel", onPress: () => {}, style: 'cancel'},
        {text: "Open Link", onPress: () => {Linking.openURL(props.link)}, style: 'default'},
        {text: "Delete", onPress: () =>{dispatch(videoActions.deleteVideo(props.videoId))}, style: 'destructive'}
      ]);
    } 

    return(
      <View>
        {props.userId === vars.admin ? (
        <Pressable style={styles.video} onLongPress={itemHandler}>
          <View >
            
            <View style={styles.imageContainerAdmin}>
              {isLoading ? (<ActivityIndicator size="small" color={Colors.primary}/>) : 
              (<Image source={{ uri: link }} style={styles.image} />)
              }
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text numberOfLines={6}>{props.description}</Text>
            </View>
          </View>
        </Pressable>
       ) : (
        <View style={styles.video}>
          <View style={styles.touchable}>
          <TouchableNativeFeedback  onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: link }} style={styles.image} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text numberOfLines={6}>{props.description}</Text>
              </View>       
            </View>   
          </TouchableNativeFeedback>
          </View>
        </View>
        )}
      </View>
    );
};

const styles =  StyleSheet.create({
   video: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 350,
    margin: 10
   },
   touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  imageContainerAdmin: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },  
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 18,
    color: 'black'
  },    
  details: {
    height: '50%',
    padding: 10
  }
});

export default VideoItem;