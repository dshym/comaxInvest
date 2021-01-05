import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ActionSheetIOS } from 'react-native';
import Colors from '../constants/Colors';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';
import PdfItem from '../components/PdfItem';
import pdf from '../models/pdf';
import vars from '../evn';
import { useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';


const TradingStrategiesScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pdfPathList, setPdfPathList] = useState([]);
    const reference = storage().ref("pdf/");

    const uId = useSelector(state => state.auth.userId);
    useEffect(() => {
        props.navigation.setParams({userId: uId})
    }, [uId]);
    
    const getPdfList = async () => {
        let list = [];
        setIsLoading(true);
        const res = await reference.list();
        res.items.forEach(element => {
            list.push(new pdf(element.name, element.fullPath));
        });
        setPdfPathList(list);
        setIsLoading(false);
    }
    
    useEffect(() => {
        getPdfList();
        props.navigation.setParams({updateList: getPdfList});
    }, []);

    if(isLoading) {
        return(
            <Gradient style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </Gradient>
        );
    }
    
    return (
        <Gradient>
            <FlatList
                onRefresh={getPdfList}
                refreshing={isRefreshing}
                data={pdfPathList}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                   <PdfItem 
                        title={itemData.item.title}
                        onSelect={()=> {props.navigation.navigate({
                            routeName: 'Pdf',
                            params: {
                                source: itemData.item.url,
                                title: itemData.item.title,
                                updateList: getPdfList
                            }
                        })
                        }}
                   />
                }
            />
        </Gradient>
    );
}
 
TradingStrategiesScreen.navigationOptions = navData => {
    const userId = navData.navigation.getParam('userId');
    let enableAdding = false;
    if(userId === vars.admin) {
        enableAdding = true;
    }
    return {
        headerTitle: 'Trading strategies',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {enableAdding ? 
            <Item title="AddFile" iconName='md-add' onPress={()=>{
                navData.navigation.navigate({
                    routeName: 'AddPdf'
                })}
            }
            /> 
            : 
            <Text></Text>
            }
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TradingStrategiesScreen;