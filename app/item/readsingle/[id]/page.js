import Image from "next/image"
import Link from "next/link"

const getSingleItem = async(id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`)
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    return singleItem
}


const ReadSingleItem = async(context) => {
    const params = await context.params
    const singleItem = await getSingleItem(params.id)

    return (
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="画像"/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${params.id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${params.id}`}>アイテム削除</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem