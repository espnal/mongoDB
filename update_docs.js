const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://roguin18:lAO1eBahaOaqjicS@cluster0.rjxjeri.mongodb.net/";
    const client = new MongoClient(url);
    try{
await updateListingByName(client, "Infinite Views",{bedroom:6, bed: 8})
    }catch(e){
        console.error(e)
    }finally{
        await client.close()
    }
}
main().catch(console.error)

async function updateListingByName(client,nameOfListing, updatedListing){
const result = await client
.db("sample_airbnb")
.collection("listingsAndReviews")
.updateOne({name: nameOfListing}, {$set: {updatedListing}})
console.log(`${result.matchedCount} document matched the query criteria`)
console.log(`${result.modifiedCount} document was/were updated`)
}