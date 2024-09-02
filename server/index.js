const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const TodoModel=require('./Models/Todo');


const app=express();
app.use(cors());
app.use(express.json())

const url='mongodb+srv://chathura:Morait2020%40@cluster0.gawya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err));

//for adding tasks
app.post('/add',(req,res)=>
{
    const task=req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err));
})

//for fetching tasks

app.get('/get',(req,res)=>{
  TodoModel.find()
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

//for mark as done

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    console.log("hello",id);
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//for deleting todo

app.delete('/delete/:id',(req,res)=>{
  const {id}=req.params;
  console.log("hello",id);
  TodoModel.findByIdAndDelete({_id:id})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})





const PORT = 3000;  // You can change this to any port you prefer
const HOSTNAME = 'localhost';  // Change this to your server's hostname or IP if needed

app.listen(PORT, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
  });