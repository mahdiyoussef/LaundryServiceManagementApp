import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function stat({navigation}) {
    const pr=navigation.getParam('pr')
    const [load,setload]=useState(true)
    const [databons,setdatabons]=useState()
    const [dataentr,setdataentr]=useState()
    const [year,setyear]=useState('2022')
    useEffect(()=>{
        firebase.database().ref(pr+'/bon').on('value',snapshot=>{
            setdatabons(snapshot.val())
            
        })
        firebase.database().ref(pr+'/entr').on('value',snapshot=>{
            setdataentr(snapshot.val())
            setload(false)
        })
    },[load])
    const countrevenueentr=(m,n)=>{
        let r=0;
        let date=[]
        firebase.database().ref(pr+'/entr/'+n+'/bon').on('value',snapshot=>{
            snapshot.val()?.map((b)=>{
                date=b.date.split('-')
                if(date[0]==year && date[1]==m){
                    r+=b.total
                }
            })
        })
        return r;
    }
    const revenuebydate=(m)=>{
        var r=0;
        let date=[];
        databons?.map((b)=>{
            date=b.date.split('-')
            if(date[0]==year && date[1]==m){
                r+=b.total
            }
        })
        dataentr?.map((e)=>{
            r+=countrevenueentr(m,e.n)
        })
        return r;
    }
    return(
        <View style={styles.container}>
            <Text style={{
                fontFamily:'Taj-bold',fontSize:16,marginTop:60,textAlign:'center'
            }}>الاحصائيات</Text>
            <TextInput value={year} onChangeText={(text)=>{
                setyear(text)
            }} placeholder="ادخل السنة" placeholderTextColor={'#130f40'} style={styles.input}/>
            <TouchableOpacity>
                <View style={styles.btn}>
                    <Text style={{fontFamily:'Taj-bold',textAlign:'center',color:'white'}}>البحث</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:20
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-bold',textAlign:'center'
                }}>المدخول</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-bold',textAlign:'center'
                }}>الشهر</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(1)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>يناير</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(2)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>فبراير</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(3)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>مارس</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(4)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>ابريل</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(5)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>ماي</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(6)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>يونيو</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(7)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>يوليوز</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(8)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>غشت</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(9)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>شتنبر</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(10)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>اكتوبر</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(11)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>نونبر</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(12)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>دجنبر</Text>

            </View>
            <View style={{
                width:'100%',flexDirection:'row',marginTop:5
            }}>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>{revenuebydate(12)+revenuebydate(11)+revenuebydate(10)+revenuebydate(9)+revenuebydate(8)+revenuebydate(7)+revenuebydate(6)+revenuebydate(5)+revenuebydate(4)+revenuebydate(3)+revenuebydate(2)+revenuebydate(1)}</Text>
                <Text style={{
                    width:'50%',fontFamily:'Taj-regular',textAlign:'center'
                }}>الاجمالي</Text>

            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    input:{
        textAlign:'center',
        fontFamily:'Taj-regular',
        fontSize:16,
        borderWidth:4,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        padding:5,
        borderRadius:10,
        borderColor:'#130f40'
    },
    btn:{
        borderRadius:10,
        padding:9,
        backgroundColor:'#130f40',
        marginLeft:20,
        marginRight:20,
        marginTop:10
    }
})