import request from '../utils/request';
import { API_URL } from '../config/api';

export function login(data) {

  return request(API_URL + '/me', {
    method: 'POST',
    body: JSON.stringify({ 'data': data }),
  });
}

export function signup(data) {
  let demoData = { ...data, is_demo:true };
  return request(API_URL + '/users', {
    method: 'POST',
    body: JSON.stringify({ 'data': demoData }),
  });
}

export function fetch(token) {
  return request(API_URL + '/me', {
    method: 'GET',
  });
}

export function refresh() {
  return request(API_URL + '/me', {
    method: 'GET',
  });
}

export function update({ field, data }) {
  return request(API_URL + `/me/${field}`, {
    method: 'PUT',
    body: data,
  });
}

export function fetchRole() {
  return request(API_URL + '/me/role', {
    method: 'GET',
  });
}

export function attachRole(data) {
  return request(API_URL + '/me/role', {
    method: 'POST',
    body: JSON.stringify({ 'data': data }),
  });
}

export function updateRole({ type, data }) {
  return request(API_URL + '/me/role', {
    method: 'PUT',
    body: JSON.stringify({
      role_type: type,
      ...data,
    }),
  });
}
