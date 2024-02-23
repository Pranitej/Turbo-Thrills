import React from 'react'
import Navbar from '../Navbar'
import ContactBody from '../ContactBody'
import ContactFooter from '../ContactFooter'

export default function Contact() {
  return (
    <>
      <Navbar page='contact' />
      <ContactBody />
      <ContactFooter />
    </>
  )
}
