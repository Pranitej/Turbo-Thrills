import React from 'react'
import CustomerNavbar from '../CustomerNavbar'
import CustomerHomeBody from '../CustomerHomeBody'

export default function CustomerHome() {
  return (
    <>
      <CustomerNavbar page='home' />
      <CustomerHomeBody />
    </>
  )
}
