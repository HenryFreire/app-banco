import 'react-native-gesture-handler/jestSetup';





// Mock de react-native-vector-icons para evitar errores en tests
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons')

jest.mock('react-native-modal', () => {
    return jest.fn().mockImplementation(({ children }) => children)
})

jest.mock('@react-native-community/datetimepicker', () => {
    return jest.fn().mockImplementation(() => null)
})