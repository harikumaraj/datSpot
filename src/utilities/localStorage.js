import { AsyncStorage } from 'react-native'

export const loadState =async () => {
    try {
        const serializedState =await AsyncStorage.getItem('state');
        console.log(JSON.parse(serializedState));
        if (serializedState === null) {
            return undefined;
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};

export const saveState =async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('state', serializedState);
    } catch(error) {
        console.log(error);
    }
};
