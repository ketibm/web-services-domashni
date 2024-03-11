// Направете users.json: [ { "id": 1, "name": "John", "age": 30, "gender": "male" }, { "id": 2, "name": "Alice", "age": 25, "gender": "female" }, { "id": 3, "name": "Bob", "age": 35, "gender": "male" }, { "id": 4, "name": "Emma", "age": 28, "gender": "female" }, { "id": 5, "name": "Michael", "age": 40, "gender": "male" }, { "id": 6, "name": "Sophia", "age": 22, "gender": "female" }, { "id": 7, "name": "David", "age": 32, "gender": "male" }, { "id": 8, "name": "Emily", "age": 29, "gender": "female" }, { "id": 9, "name": "Daniel", "age": 45, "gender": "male" }, { "id": 10, "name": "Lily", "age": 27, "gender": "female" } ]

// Филтрирајте ги сите жени/мажи
// Пронајдете ги сите мажи постари од 30
// Пронајдете ги сите жени помлади од 30
// Пронајдете ја втората најстара жена
// Пронајдете го најстариот и најмладиот корисник
// Сортирајте ги корисниците според нивната возраст

const fs = require("fs")

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("users.json", "utf-8", (err,data) => {
            if(err) return reject(err);
           
            try{
                const parsedData = JSON.parse(data);
                resolve (parsedData);
            }catch(err){
                return(err)
            }
        })
    })
}

const usersData = async () =>{
    try{
        const users = await readFile();

       const women = users.filter(user => user.gender === "female"); 
       console.log("Women:", women);

       const men = users.filter(user => user.gender === "male");
       console.log("Men:", men);

       const menOlderThanThirty = users.filter(user => user.age > 30).sort((a, b) => a.age -b.age);
       console.log("Men older than 30:", menOlderThanThirty);

       const womenYoungerThanThirty = users.filter(user => user.age < 30).sort((a, b) => b.age -a.age);
       console.log("Women younger than 30:", womenYoungerThanThirty);

       const secondOldestWoman = [...women].sort((a, b) => b.age - a.age)[1];
       console.log("Second oldest woman is:", secondOldestWoman);

       const oldestUser = users.sort((a, b) => b.age - a.age)[0];
       console.log("The oldest user is:", oldestUser);

       const youngestUser = users.sort((a, b) => a.age - b.age)[0];
       console.log("The youngest user is:", youngestUser);

       const sortedUsersByAge = [...users].sort((a, b) => a.age - b.age);
       console.log("Sorted users by age:", sortedUsersByAge);

    }catch(err){
        console.log(err)
    }
}
usersData()