import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import login from '../js/login';
import Dashboard from "../js/dashboard";
import menu from "../js/menu";
import addbon from "../js/addbon";
import bondetail from "../js/bondetail";
import search from "../js/search";
import Company from "../js/company";
import operations from "../js/operations";
import addop from "../js/addop";
import detailOp from "../js/detailop";
const screens={
    detailop:{
        screen:detailOp,navigationOptions:{
            headerShown:false
        }
    },
    addopp:{
        screen:addop,navigationOptions:{
            headerShown:false
        }
    },
    operationp:{
        screen:operations,navigationOptions:{
            headerShown:false
        }
    },
    companypg:{
        screen:Company,navigationOptions:{
            headerShown:false
        }
    },
    dashb:{
        screen:Dashboard,
        navigationOptions:{
            headerShown:false
        }
    },searchin:{
        screen:search,navigationOptions:{
            headerShown:false
        }
    },addbonp:{
        screen:addbon,
        navigationOptions:{
            headerShown:false
        }

    },bondt:{
        screen:bondetail,
        navigationOptions:{
            headerShown:false
        }

    },
    
    loginapp:{
        screen:login,
        navigationOptions:{
            headerShown:false
        }
    },
     menup:{
        screen:menu,navigationOptions:{
            headerShown:false
        }
    },
    
    
}
    const HomeStack=createStackNavigator(screens)
    const Navigator=createAppContainer(HomeStack)
    export default Navigator;