import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-rose-500 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <p>© 2022 ImpactHub All Rights Reserved. With love by ImpactHub</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-200 transition">FAQ</a>
          <a href="#" className="hover:text-gray-200 transition">Support</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer