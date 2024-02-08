import React from 'react'
import CustomerNavbar from '../CustomerNavbar'
import CustomerProfileBody from '../CustomerProfileBody'

export default function CustomerProfile() {
  return (
    <>
      <CustomerNavbar page='profile' />
      <CustomerProfileBody/>
    </>
  )
}
