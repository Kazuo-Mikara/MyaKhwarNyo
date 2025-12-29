import { Account, Client } from 'react-native-appwrite';
let client: Client;
let account: Account;

client = new Client();
client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setPlatform('com.habittracker');
account = new Account(client);

export { account, client };

