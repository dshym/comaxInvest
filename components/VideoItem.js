
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  Pressable, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinkPreview from 'react-native-link-preview';
import { useDispatch } from 'react-redux';
import * as videoActions from '../store/actions/video';
import * as Linking from 'expo-linking';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-elements';
import vars from '../env';

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
        <Pressable onLongPress={itemHandler}>
          <Card containerStyle={styles.card}>
            <View style={styles.imageContainer}>
              <FastImage
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
                source={{ uri: link }}
              />
            </View>
            <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{props.title}</Text>
              <Text>{props.description}</Text>
            </View>
          </Card>
        </Pressable>
       ) : (
          <Card containerStyle={styles.card}>
            <TouchableOpacity onPress={props.onSelect} activeOpacity={0.4}>
            <View>
                <View style={styles.imageContainer}>
                  <FastImage
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                    source={{ uri: link }}
                  />
                </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text>{props.description}</Text>
              </View>
            </View>  
            </TouchableOpacity>
          </Card>
        )}
      </View>
    );
};

const styles =  StyleSheet.create({
  card: {
    borderRadius: 10, 
    padding: 0
  },
  imageContainer: {
    width: '100%', 
    height: 150, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    overflow: 'hidden'
  },
  descriptionContainer: {
    padding: 10
  },  
  title: {
    fontSize: 18,
    color: 'black'
  }
});

export default VideoItem;