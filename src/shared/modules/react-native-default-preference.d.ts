declare module 'react-native-default-preference' {

  interface DefaultPreference {
    get(name: string): Promise<string>;
    set(name: string, value: string): Promise<void>;
    clear(name: string): Promise<void>;
  }

  const DefaultPreference: DefaultPreference;

  export default DefaultPreference;
}
