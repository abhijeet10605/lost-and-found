async function retrive() {
    const usersArray = [];

    try {
        const snapshot = await db.collection("users").get();

        snapshot.forEach(doc => {
            usersArray.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log("All users:", usersArray);
        return usersArray;

    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}