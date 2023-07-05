const {MongoClient} = require("mongodb")

async function main(){
    const url = "mongodb+srv://roguin18:lAO1eBahaOaqjicS@cluster0.rjxjeri.mongodb.net/";
    const client = new MongoClient(url);
    try{

    }catch(e){
        console.error(e)
    }finally{
        await client.close();
    }
}
main().catch(err => console)

async function upsertLisntingByNmae(client,nameOfListing, updatedListing){
    const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({name: nameOfListing}, {$set: {updatedListing}},{upsert:true})
    console.log(`${result.matchedCount} document matched the query criteria`)
if(result.upsertedCount > 0){
    console.log(`One doc was inserted with`)
}
}