import React from 'react'
import Link from 'next/link'

const LoginForm = () => {
    return (
        <div className='bg-background grid place-items-center h-screen'>
            <div>
                <form className='flex flex-col gap-5'>
                    <input type="text" placeholder='email' />
                    <input type="password" placeholder='password' />
                    <button className='text-textcolor cursor-pointer'>Ingresar</button>
                    <div className='bg-red-500 text-white text-sm rounded-md'>Error</div>
                    <Link className='text-right' href={'/register'}>
                    ¿No tienes cuenta? <span className='underline'>Registrar</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginForm