import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";
const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    const query = gql`
    query myQuery (
        $access_key: String!
        $categories: String!
        $keyword: String
    ) {
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "gb, us"
            sort: "published_desc"
            keyword: $keyword
            ){
        data{
                author
                category
                country
                description
                image
                language
                published_at
                source
                title
                url
            }
        pagination{
                count
                limit
                offset
                total
            }
        }
    }
    `;
    const res = await fetch("https://orodara.stepzen.net/api/pruning-ostrich/__graphql", {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query: query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            }
        })
    }
    )
    console.log("loading data from Api category", category, keywords)
    const newsResponse = await res.json()
    // console.log(newsResponse, 'as response')

    const news = sortNewsByImage(newsResponse?.data?.myQuery)
    return news;
}


export default fetchNews

// orodara::stepzen.io+1000::3a5c8ed32902e4a9587adeb968323ef4d75799ac069d8ce9c117fd31f1ca67c9
//"http://api.mediastack.com/v1/news?access_key=7283a6be42ece9523019f090158b02a7"