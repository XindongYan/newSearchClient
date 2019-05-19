import request from '../utils/request';

export function query(params) {
  return request(`/api/params?params=${params}`, {
    method: 'GET'
  });
}
