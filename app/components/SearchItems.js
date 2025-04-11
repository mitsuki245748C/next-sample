"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const SearchItems = () => {
    const [searchText, setSearchText] = useState("")
    const [allItems, setAllItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("/api/item/readall")
            const data = await response.json()
            setAllItems(data.allItems)
            setFilteredItems(data.allItems)
        }
        fetchItems()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchText(value)

        const filtered = allItems.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredItems(filtered)
    }


    return (
        <main className="p-4">
            <input type="text" value={searchText} onChange={handleSearch} placeholder="商品を検索" className="border p-2 rounded"/>
            <div className="grid-container-in">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
                            <Image src={item.image} width={750} height={500} alt={item.image} />
                            <h2>¥{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.substring(0, 80)}...</p>
                        </Link>
                    ))
                ) : (
                <p>検索結果が見つかりませんでした。</p>
            )}
            </div>
        </main>
    )
}

export default SearchItems