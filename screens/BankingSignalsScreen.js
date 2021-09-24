import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Gradient from '../components/Gradient';
import NewsItem from '../components/NewsItem';
import News from '../models/news';
import * as rssParser from 'react-native-rss-parser';


const BankingSignalsScreen = props => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newsList, setnewsList] = useState([]);

    const getNews = async () => {
        let list = [];
        setIsLoading(true);
        const resData = await fetch('https://cdn.mysitemapgenerator.com/feeds/1369801000824.rss')
        .then((response) => response.text())
        .then((responseData) => rssParser.parse(responseData));
        
        resData.items.forEach(element => {
                let randId = Math.random().toString();
                list.push(new News(
                    randId, 
                    element.title, 
                    element.enclosures[0].url, 
                    element.published,
                    element.links[0].url
                    )
                )
        });
        setnewsList(list);
        setIsLoading(false);
    }

    useEffect(() => {
        getNews();
    }, []);

    if (isLoading) {
        return (
            <Gradient>
                <View style={styles.screen}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </Gradient>
        );
    }

    return (
        <Gradient style={styles.screen}>
            <FlatList 
                onRefresh={getNews}
                refreshing={isRefreshing}
                data={newsList}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                    <NewsItem 
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        pubDate={itemData.item.pubDate}
                        onSelect={()=>{
                            props.navigation.navigate({routeName: 'WebView', params: {
                                title: itemData.item.title,
                                link: itemData.item.linkToWeb
                            }})
                        }}
                    />
                }
            />
        </Gradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BankingSignalsScreen;