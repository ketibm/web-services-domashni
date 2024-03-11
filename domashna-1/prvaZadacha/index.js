// Направете повик до https://jsonplaceholder.typicode.com/users, потоа:

// Направете функција каде како параметар ќе го имаме името на некоја компанија, треба да ги најдеме сите корисници кои се дел од таа компанија пр. findUsersByCompany("Romaguera-Jacobson")
// Најдете ги сите корисници кои живеат во одреден град, според нивното корисничко име. пр. findUserCityByUsername("Bret") -> return "Gwenborough"

const findUsersByCompany = async (companyName) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const usersInCompany = users.filter(user => user.company.name === companyName);
        return usersInCompany;
    } catch (err) {
        console.error(err);
        return null;
    }
}


const findUserCityByUsername = async (username) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const user = users.find(user => user.username === username);
        if (user) {
            return user.address.city;
        } else {
            return "User not found";
        }
    } catch (err) {
        console.error(err);
        return null;
    };
}


(async () => {
    try {
        const usersByCompany = await findUsersByCompany("Romaguera-Jacobson");
        console.log("Users in company Romaguera-Jacobson:", usersByCompany);

        const userCity = await findUserCityByUsername("Bret");
        console.log("City for user Bret:", userCity);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();

// findUsersByCompany("Romaguera-Jacobson")
//     .then(users => {
//         console.log("Users in company Romaguera-Jacobson:", users);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// findUserCityByUsername("Bret")
//     .then(city => {
//         console.log("City for user Bret:", city);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });