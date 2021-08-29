import React, {useState, useEffect} from 'react';
import SideMenuView from '../View/SideMenuView';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';


const SideMenuController = (props) => {

  navigateToScreen = (route) => () => {

    if(route == 'Login') {
      ManageSharedPreferences.clearAllInfos();
    }

    const navigateAction = NavigationActions.navigate({
        routeName: route
    });

    props.navigation.closeDrawer();
    props.navigation.dispatch(navigateAction);
  }

  return (
    <SideMenuView
      navigateToScreen={navigateToScreen}
      />
  );  
}
export default SideMenuController;
