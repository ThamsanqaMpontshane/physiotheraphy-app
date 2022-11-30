function physioApp(db) {
    async function addPatient(firstname,lastname,username,age,code){
        await db.oneOrNone("insert into patient (first_name,last_name,username,age,login_code) values ($1,$2,$3,$4,$5)",[firstname,lastname,username,age,code]);
    }
    async function getPatient(username){
        return await db.manyOrNone("select * from patient where username = $1",[username]);
    }

    return{
      addPatient,
      getPatient
    }
}

export default physioApp;
