import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LangLocalRepository {
    tableName() {
        return 'lang';
    }

    get = async () => {
        const data = await AsyncStorage.getItem(this.tableName());
        return data ? JSON.parse(data) : null;
    };

    set = async (data) => {
        return AsyncStorage.setItem(this.tableName(), JSON.stringify(data));
    };

    removeAll = async () => {
        return AsyncStorage.removeItem(this.tableName());
    };
}