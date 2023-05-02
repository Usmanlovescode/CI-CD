import React from 'react'
import { Helmet } from 'react-helmet-async'
import "./css/Navbar.css"
const Navbar = () => {
    return (
        <>
            <Helmet>
                <title>This is dynamically set using helmet</title>
                <meta name="description" content='this is the description' />
            </Helmet>


            <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center">
                        <span className='main-logo'>
                            <ion-icon name="newspaper-outline"></ion-icon>
                        </span>

                        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Times of Berlin</span>
                    </a>
                    <div class="flex md:order-2">
                        <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li > <span ><ion-icon name="home-outline" role="img" aria-label="home outline"></ion-icon></span>
                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Germany</a>
                            </li>

                            <li>

                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">World</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
