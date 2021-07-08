import request from '@/utils/request';
import { formDataType } from './data';

export async function createData(params: formDataType): Promise<any> {
  return request('/pages/form', {
    method: 'POST',
    data: params,
  });
}
