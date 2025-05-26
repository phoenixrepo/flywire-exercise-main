// src/apis/employeeAPIs.js

import {SERVER_URL} from "../config"

const EMPLOYEE_URL = `${SERVER_URL}/employee`;

// Fetch all employees
export async function fetchAllEmployees() {
  const response = await fetch(`${EMPLOYEE_URL}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
}

// Fetch active employees
export async function fetchActiveEmployees() {
  const response = await fetch(`${EMPLOYEE_URL}/active`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
}

// Fetch a single employee by ID
export async function fetchEmployeeById(id) {
  const response = await fetch(`${EMPLOYEE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch employee with id ${id}`);
  }
  return response.json();
}

// Create a new employee
export async function createEmployee(employeeData) {
  const response = await fetch(EMPLOYEE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    throw new Error('Failed to create employee');
  }
  return response.json();
}

// Update employee data by ID
export async function updateEmployee(id, employeeData) {
  const response = await fetch(`${EMPLOYEE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update employee with id ${id}`);
  }
  return response.json();
}

// Delete employee by ID
export async function deleteEmployee(id) {
  const response = await fetch(`${EMPLOYEE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete employee with id ${id}`);
  }
  return response.json();
}
