import request from '@/utils/request';
import { TableListQueryParams, TableListItem } from './data';

export async function queryList(params?: TableListQueryParams): Promise<any> {
  return request('/pages/brian', {
    params,
  });
}

export async function createData(
  params: Omit<TableListItem, 'id'>,
): Promise<any> {
  return request('/pages/brian', {
    method: 'POST',
    data: params,
  });
}

export async function updateData(
  id: number,
  params: Omit<TableListItem, 'id'>,
): Promise<any> {
  return request(`/pages/brian/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeData(id: number): Promise<any> {
  return request(`/pages/brian/${id}`, {
    method: 'delete',
  });
}

export async function detailData(id: number): Promise<any> {
  return request(`/pages/brian/${id}`);
}
