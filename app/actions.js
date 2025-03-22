'use server'

import { query } from '@/lib/db';

export async function getItems() {
  const result = await query('SELECT * FROM items');
  return result.rows;
}

export async function addItem(data) {
  const { name, description } = data;
  const result = await query(
    'INSERT INTO items(name, description) VALUES($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
}

export async function inserMessage(data) {
    const { name, message } = data;
    const result = await query(
      'INSERT INTO messages(name, message) VALUES($1, $2) RETURNING *',
      [name, message]
    );
    return result.rows[0];
}

export async function display(params) {
    console.log('params', params);
}