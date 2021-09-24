import React, { useEffect, useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    FlatList, 
    ActivityIndicator
} from 'react-native';
import Colors from '../constants/Colors';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';
import * as Linking from 'expo-linking';
import VideoItem from '../components/VideoItem';
import { useSelector, useDispatch } from 'react-redux';
import * as videoActions from '../store/actions/video';
import vars from '../env';

const VideoScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const videos = useSelector(state => state.videos.videos);
    const videoList = videos.reverse();

    const dispatch = useDispatch();
    const loadVideos = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            setIsLoading(true);
            await dispatch(videoActions.fetchVideos());
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, isLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadVideos
        );
        return () => {
            willFocusSub.remove();
          };
    }, [loadVideos]);


    const uId = useSelector(state => state.auth.userId);
    useEffect(() => {
        props.navigation.setParams({userId: uId})
    }, [uId]);

    useEffect(() => {
       dispatch(videoActions.fetchVideos());
    }, [dispatch]);

    if (error) {
        return (
          <Gradient style={styles.centered}>
            <Text style={{marginBottom: 5}}>{error}</Text>
            <Button
              title="Try again"
              onPress={loadVideos}
              color={Colors.primary}
            />
          </Gradient>
        );
    }

    if (isLoading) {
        return (
            <Gradient>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </Gradient>
        );
    }
      
    return (
        <Gradient>
            <FlatList 
                onRefresh={loadVideos}
                refreshing={isRefreshing}
                data={videoList}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                    <VideoItem
                        title={itemData.item.title}
                        link={itemData.item.url}
                        description={itemData.item.description}
                        onSelect={()=>{Linking.openURL(itemData.item.url)}}
                        userId={uId}
                        videoId={itemData.item.id}
                    />
                }
            />
        </Gradient>
    );
}

VideoScreen.navigationOptions = navData => {
    const userId = navData.navigation.getParam('userId');
    let enableAdding = false;
    if(userId === vars.admin) {
        enableAdding = true;
    }
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                {enableAdding ? 
                <Item title="AddVideo" iconName='md-add' onPress={()=>{
                    navData.navigation.navigate('AddVideo');
                }}/> 
                : 
                <Text></Text>
                }
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        alignItems: 'center'
    },  
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default VideoScreen;