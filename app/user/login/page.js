"use client"
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "apllication/json",
                    "Content-Type": "apllication/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
        }catch(err) {
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login