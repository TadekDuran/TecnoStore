'use client'
import React, { useState } from 'react'
import Link from 'next/link'
const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className=' bg-background grid place-items-center h-screen'>
            <div>
                <form className='flex flex-col gap-5'>
                    <input type="text" placeholder='Nombre de usuario' />
                    <input type="text" placeholder='email' />
                    <input type="password" placeholder='password' />
                    <button className='text-textcolor cursor-pointer'>Registrar</button>
                    <div className='bg-red-500 text-white text-sm rounded-md'>Error</div>
                    <Link className='text-right' href={'/login'}>
                    ¿Ya tienes cuenta? <span className='underline'>Ingresar</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm