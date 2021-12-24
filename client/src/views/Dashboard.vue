<template>
  <div class="row">

<!-- popup window -->

 
 <!-- <div class="modal " id="exampleModal" tabindex="-1"   aria-hidden="true">  -->
     <div class="col-12 " style="height:500px; margin-bottom:50px">
      <div class="row">
           <div class="col-3"></div>
           <div class="col-6">
                 <div class=" shadow mb-4 borderless">
                  <div class="modal-dialog modal-lg modal-dialog-centered">

                    <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>                        
                        </div>
                        <div class="modal-body">

                          <div class="row" style="height:300px; margin-bottom: 10px">
                            <div class="col-6">
                                <h6>Upload the cover of the book</h6>
                                <input ref="fileInput" style="display:none;" type="file" name="image" @change="imageUpload">
                                <button class="btn btn-primary" style="border-radius:5px" @click="$refs.fileInput.click()">Pick File</button>
                            </div>
                            <div class="col-6" style="height:300px">  
                                <img :src="PhotoPath+PhotoFileName" alt="Image" style="width:100%;height:100%;border-radius:5px; border:1px solid #ccc">
                            </div>
                          </div>
                          <!-- ========== -->
                          <div class="input-group mb-3"> 
                              <span class="input-group-text">Book Title</span>
                              <input type="text" class="form-control" v-model="bookTitle">
                          </div>
                          <button type="button" v-if="bookId==0" class="btn btn-primary" @click="createClick()">Create</button>
                          <button type="button" v-if="bookId!=0" class="btn btn-primary" @click="updateClick()">Update</button>
                        </div>
                    </div>
                    
                    </div>
             </div>
           </div>
           <div class="col-3"></div>
      </div>
     </div>
     <!-- </div> -->

    <!--the end of popup  -->

    <!-- the begining of the table  -->

  <div class="row">
      <div class="col-2"></div>
        <div class="col-8">
    <div class="card shadow mb-4 ">
    <div class="card-header py-3">
        <p>
            <button asp-action="Create" class="btn btn-primary fload-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal" 
            @click="addClick()">
                Add Book
            </button>
        </p>

    </div>
    <div class="card-body">
            <div class="table-responsive">


          <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                        <thead>
            <tr>
              <th >id</th>
              <th >title</th>
              <th scope="col">cover</th>
              <th style="width:110px"></th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="book in  books" v-bind:key="book" v-bind:book="book">
              <td>{{book.id}}</td>
              <td>{{book.title}}</td>
              <td style="text-align:center"><img :src="PhotoPath+book.cover" alt="Image" style="width:50px; height:50px"/></td>        
                <td>
                  <!-- the edit button -->
                <button class="btn btn-primary" style="margin-left:3px" data-bs-toggle="modal" 
                data-bs-target="#exampleModal" @click="editClick(book)"><i class="fa fa-edit" aria-hidden="true"></i></button>
                  <!-- the delete button -->
                <button class="btn btn-danger" style="margin-left:3px" @click="deleteClick(book.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
          </tbody>
        </table>
    
            </div>
        </div>
    </div>
  </div>
  </div>
  <div class="col-2"></div>

  <!-- ======================================= -->
    </div>

</template>


<script>
import axios from 'axios'

export default {
  name: 'dashboard',
  components: {
    //
  },
  data(){
    return{
     books: [],
     modalTitle:"Add Book",
     bookTitle:"",
     bookId:0 ,
     PhotoFileName:"anonymous.png",
     PhotoPath: "http://localhost:14934/photos/",
    }
  },

  methods:{
    refreshData(){
      axios.get('Book').then((response)=>{
        this.books=response.data
      });
    },


    addClick(){
      this.modalTitle="Add Book";
      this.bookId=0;
      this.bookTitle="";
      this.PhotoFileName="anonymous.png";
    },


    editClick(book){
      this.modalTitle="Edit Book";
      this.bookId=book.id;
      this.bookTitle=book.title;
      this.PhotoFileName=book.cover;
    },


    createClick(){
       axios.post('Book',{
          title: this.bookTitle,
          cover: this.PhotoFileName
       }).then((response)=>{
         this.refreshData();
         alert(response.data.title+" Created successfuly")
      }).catch(e=>{alert(e.message)});
    },


    updateClick(){
       axios.patch('Book/'+this.bookId,{
          id:this.bookId,
          title: this.bookTitle,
          cover: this.PhotoFileName
       }).then(()=>{
         this.refreshData();
         alert("the book Updated successfully");
      }).catch(e=>{alert(e.message)});
    },


    deleteClick(id){
      if(!confirm("Are you Sure?")){
        return;
      }
      axios.delete('Book/'+id)
      .then(()=>{
         this.refreshData();
         alert("the book deleted successfully");
      }).catch(e=>{alert(e.message)});
    },

    imageUpload(e){
      let formData=new FormData();
      formData.append('file',e.target.files[0]);
      axios.post("book/SaveFile", formData)
      .then((response)=>{
        this.PhotoFileName=response.data;
      });

    },

  },

  mounted:function(){
    this.refreshData();
  }

}

</script>

