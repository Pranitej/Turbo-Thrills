import React from 'react';
import AdminNavbar from '../AdminNavbar'
import AdminHomeBody from '../AdminHomeBody';

export default function AdminHome() {
  return (
    <div>
      <AdminNavbar page='home' />
      <AdminHomeBody />
    </div>
  )
}
