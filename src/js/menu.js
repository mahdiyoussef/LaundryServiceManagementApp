import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
import bmenu from '../icons/bmenu.svg';
export default function menu({navigation}) {
    return(<View style={styles.container}>
        <TouchableOpacity>
        <View style={styles.bmenu}>
                <Image source={require('../icons/3394877631553239370-64.png')} style={{width:40,height:40}}/>
                <Text style={styles.menutext}>اغلاق</Text>
        </View></TouchableOpacity>
        {/* 2495438061548336236-64.png */}
        <View>
            
        </View>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    bmenu:{
        marginTop:50,
        width:80,
        marginLeft:20,
        borderRadius:4,
        borderWidth:2,
        borderColor:'black',
        alignItems:'center'
    },
    menutext:{
        fontFamily:'Taj-bold',
        textAlign:'center'
    }
})