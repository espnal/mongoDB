const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://roguin18:lAO1eBahaOaqjicS@cluster0.rjxjeri.mongodb.net/"
const client = new MongoClient(uri);
try{
    await client.connect();
    // await findOneListByName(client, "Infinite Views");
    await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
        minimumNumberOfBedrooms: 4,
        minimumNumberOfBathrooms: 2,
        maximumNumberOfResults: 5
    });

    // await createListing(client, {
    //     name: "Miguel Mio",
    //     summary: "Abogado reconocido",
    //     edad: 38,
    //     esposa: "Melia"
    // });
//     await createMultipleListings(client,[{
//         name: "Benjamin Abreu",
//         summary: "Atleta reconocido",
//         edad: 30,
//         conjuge: "Bety"
//     },{
//         name: "Andre Berroa",
//         summary: "Pintora reconocido",
//         edad: 20,
//         conjuge: "John"
//     },
// {
//     name: "Mario Mio",
//     summary: "Abogado reconocido",
//     edad: 44,
//     conjuge: "Mila"
// }])
}catch(e){
    console.error(e)
}finally{
    await client.close()
}
}

main().catch(console.error);


async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}


async function findOneListByName(client, nameListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameListing})
    if(result){
        console.log(`Found listing in collection with name of ${nameListing}`)
        console.log(result)
    }else{
        console.log(`Not listing found in collection with name of ${nameListing}`)
    }
}

async function createMultipleListings(client, newListings){
const result = await client.db("sample_airbnb").collection("listingAndReviews").insertMany(newListings);
console.log(`${result.insertedCount} new listings with the follow id's:`)
console.log(result.insertedIds);
}
async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingAndReviews").insertOne(newListing)
    console.log(`New listing created with this listing id: ${result.insertedId}`)
}
async function findOneListingbyName(client, nameOfListing){

}
// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Databases: ")
//     databasesList.databases.forEach(db => {console.log(`- ${db.name}`)})
// }