import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  // Remote push notifications and topic subscriptions are unsupported in standard Expo Go (SDK 53+)
  // and will throw 'Cannot find native module ExpoTopicSubscriptionModule'.
  const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  if (isExpoGo) {
    console.log(
      'Push notifications are skipped in Expo Go. Use a development build (npx expo run:android / ios) for push tokens.'
    );
    return null;
  }

  try {
    const Device = await import('expo-device');
    if (!Device.isDevice) {
      console.log('Push notifications require a physical device.');
      return null;
    }

    const Notifications = await import('expo-notifications');

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Push notification permission was not granted.');
      return null;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId ??
      process.env.EXPO_PUBLIC_PROJECT_ID;

    const tokenResponse = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#F6B93B',
      });
    }

    return tokenResponse.data;
  } catch (error) {
    console.warn('Push notifications registration encountered an error:', error);
    return null;
  }
}
