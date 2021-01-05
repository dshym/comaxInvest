import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Pdf from 'react-native-pdf';


const PdfViewer = props => {
    const source = {uri: `${props.url}`};
    
    return(
        <View style={styles.container}>
        <Pdf
            source={source}
            style={styles.pdf}
            cache={true}
        />
        </View>    
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default PdfViewer;