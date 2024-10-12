// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockResponseData = ['some data'];
  const relativePath = '/path';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    expect(await throttledGetDataFromApi(relativePath)).toEqual(
      mockResponseData,
    );
  });
});
