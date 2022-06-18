import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
export default function operations({navigation}) {
    return(<View>
        <TouchableOpacity>
            <View style={styles.btnaddbon}>
                <Image source={require('../icons/2495438061548336236-64.png')}/>
                <Text style={{
                    fontFamily:'Taj-bold'
                }}>اضافة بون</Text>
            </View>
        </TouchableOpacity>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    btnaddbon:{
        position:'absolute',
        top:50,
        right:20,
        width:80,
        borderRadius:10,
        borderWidth:2,
        alignItems:'center'
    }
})