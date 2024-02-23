import React from 'react'
import CustomerNavbar from '../CustomerNavbar'
import CartBody from '../CartBody'

export default function Cart() {
  return (
    <div>
      <CustomerNavbar page='cart' />
      <CartBody />
    </div>
  )
}
