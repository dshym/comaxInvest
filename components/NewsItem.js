import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';


const NewsItem = props => {

    return (
      <Card containerStyle={styles.card}>
      <TouchableOpacity onPress={props.onSelect} activeOpacity={0.4}>
      <View>
        <View style={styles.imageContainer}>
        <FastImage   
          style={{width: '100%', height: '100%'}}
          source={{ uri: props.imageUrl }}
        />            
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.pubDate}</Text> 
        </View>     
      </View>  
      </TouchableOpacity>
      </Card> 
    );
}

const styles = StyleSheet.create({
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
    title: {
      fontSize: 18,
      color: 'black'
    },    
    detailsContainer: {
      padding: 10
    }
});

export default NewsItem;