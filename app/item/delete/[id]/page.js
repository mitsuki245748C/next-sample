"use client"
 
 import { useState,useEffect } from "react"
 import { useRouter } from "next/navigation"
 import Image from "next/image"
 import useAuth from "@/app/utils/useAuth"
 
 
 const DeleteItem = (context) => {
     const [title, setTitle] = useState("")
     const [price, setPrice] = useState("")
     const [image, setImage] = useState("")
     const [description, setDescription] = useState("")
     const [email, setEmail] = useState("")
 
     const router = useRouter()
     const loginUserEmail = useAuth()
 
     useEffect(() => {
         const getSingleItem = async() => {
             const params = await context.params
             const response = await fetch(`/api/item/readsingle/${params.id}`)
             const jsonData = await response.json()
             const singleItem = jsonData.singleItem
 
             setTitle(singleItem.title)
             setPrice(singleItem.price)
             setImage(singleItem.image)
             setDescription(singleItem.description)
             setEmail(singleItem.email)
         }
         getSingleItem()
     }, [context])
 
     const handleSubmit = async(e) => {
         e.preventDefault()
         try{
             const params = await context.params
             const response = await fetch(`http://localhost:3000/api/item/delete/${params.id}`, {
                 method: "DELETE",
                 headers: {
                     "Accept": "application/json",
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${localStorage.getItem("token")}`
                 },
                 body: JSON.stringify({
                     email: loginUserEmail
                 })
             })
             const jsonData = await response.json()
             alert(jsonData.message)
             router.push("/")
         }catch(err) {
             alert("アイテム削除失敗")
         }
     }
     if (loginUserEmail===email) {
         return(
             <div>
                 <h1 className="page-title">アイテム削除</h1>
                 <form onSubmit={handleSubmit}>
                     <h2>{title}</h2>
                     <Image src={image} width={750} height={500} alt="item-image" priority/>
                     <h3>¥{price}</h3>
                     <p>{description}</p>
                     <button>削除</button>
                 </form>
             </div>
         )
     }
 }
 
 export default DeleteItem