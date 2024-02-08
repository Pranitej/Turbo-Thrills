import React from 'react'
import CustomerNavbar from '../CustomerNavbar'

import CustomerSelledCars from '../CustomerSelledCars'

export default function CustomerSelledCarsPage() {
  return (
    <>
      <CustomerNavbar page='sellcars' />
      <CustomerSelledCars />
    </>
  )
}
