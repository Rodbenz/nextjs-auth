'use client';
import { Button, TextInput } from '@mantine/core'
import React from 'react'
import {signIn} from "next-auth/react";

function LoginPage() {
    const userName = React.useRef("");
    const pass = React.useRef("");

    const onSubmit = async () =>{
        const result = await signIn("credentials",{
            username:userName.current,
            password:pass.current,
            redirect:true,
            callbackUrl:"/"
        })
    };
    return (
        <div className={"justify-center item-center h-screen bg-gradient-to-br from-cyan-300 to-sky-600 flex"} >
            <div className={"px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2"} style={{width:'100%', }}>
                <TextInput
                    placeholder="Username"
                    label="Username"
                    withAsterisk
                    onChange={(e) => (userName.current = e.target.value)}
                />
                <TextInput
                    placeholder="Password"
                    label="Password"
                    withAsterisk
                    type='password'
                    onChange={(e) => (pass.current = e.target.value)}
                />
                <Button variant={"outline"} onClick={onSubmit}>login</Button>
            </div>
        </div>
        
    )
}

export default LoginPage