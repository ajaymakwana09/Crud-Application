const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

let Employees=[];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});



app.post('/addEmployee',(req,res)=>{
    let emp={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        employeeId: req.body.employeeId,
        email:req.body.email,
        dob:req.body.dob,
        code:req.body.code,
        id: Employees.length + 1
    }
    Employees.push(emp);
    console.log(Employees);
    res.redirect('/view');
});

app.get('/view',(req,res)=>{
    res.render('view',{Employees});
})

app.get('/edit/:id',(req,res)=>{
    const id=req.params.id;
    const Employee=Employees.find(Employee=>Employee.id==id);
    res.render('edit',{Employee});
})

app.get('/delete/:id',(req,res)=>{
    const id=req.params.id;
     Employees = Employees.filter((data)=> data.id != id);
      res.redirect("/view")
})

app.post('/update/:id',(req,res)=>{
    const id=req.params.id;

    const updateEmp={
        id:parseInt(id),
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        employeeId: req.body.employeeId,
        email:req.body.email,
        dob:req.body.dob,
        code:req.body.code,

    };
    Employees=Employees.map(employee=>{
        if(employee.id==id){
            return updateEmp;
        }else{
            return  employee;
        }
    })
    res.redirect('/view')
})
app.listen(port, () => {
    console.log("server running....");
});
