const admin = require("firebase-admin");
const serviceAccount = require("./privi.json");
const { getFirestore } = require("firebase-admin/firestore");

console.log("me estoy conectando");
admin.initializeApp({
  //Le mando todo lo que tengo en privi.json
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function testCrear() {
  let res;
  res = await db.collection("usuarios").doc().set({
    nombre: "tamara",
    rol: "tutora",
    edad: 20,
  });
  //   console.log(res.id);
  res = await db.collection("usuarios").doc().set({
    nombre: "matias",
    rol: "tutor",
    edad: 24,
  });
  //   console.log(res.id);
  return res;
}

async function leerTodos() {
  const res = await db.collection("usuarios").get();
  let arrayRes = res.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });
  return arrayRes;
}

async function updateDocument() {
  const refDocMati = db.collection("usuarios").doc("GFKMM5ZcmrEwBasXa3ic");

  const res = await refDocMati.update({ edad: 20 });

  return res;
}

async function deleteDocument() {
  const res = await db
    .collection("usuarios")
    .doc("GFKMM5ZcmrEwBasXa3ic")
    .delete();

  return res;
}

// testCrear().then((res) => {
//   console.log(res);
// });
// leerTodos()
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));
deleteDocument()
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
