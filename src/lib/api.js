
// export async function login({email, password }){
//     // fake delay
//     await new Promise((res) => setTimeout(res, 800));

//     if (!email || !password){
//         throw new Error("Missing credentials");
//     }

//     // demo success

//     return {
//         user: {
//             id: 1,
//             email,
//             name: "Demo user",
//         },
//         token: "demo-token",
//     };
// }

// export async function register({name, email, password}) {
//     await new Promise((res) => setTimeout(res, 800));

//     if (!name || !email || !password){
//         throw new Error("All fields are required");
//     }

//     return {
//         user: {
//             id: 2,
//             name,
//             email,
//         },
//         token: "demo-register-token",
//     };
// }