import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "universal-cookie";
import {useEffect,useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import Drawer from "../Components/Drawer";
import "../Styles/CustomerShipments.css"
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function CustomerShipments() {

    
  const [customerInfo,setCustomerInfo] = useState([]);

  const [shipments, setShipments] = useState({
        shipment_origin:"",
        destination:"",
        route:""
    });
    const [id, setId] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);  
    const [customerShipments,setCustomerShipments] = useState([]);
    
    /* using the cookies to get the token and using headers with it to protect the api 
    so that only user with token can perform the api requests
    */
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    // using the bearer token
    const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    };

  // the columns here are part of material ui data grid which are the  shipments table attributes
  const columns = [
  
  {
      field: "shipment_origin",
      headerName: "Shipment Origin",
      width: 200,
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 200,
    },
    {
      field: "route",
      headerName: "Route",
      minWidth: 200,
      flex: 1,
    },
    // here are the actions you can perform like edit and delete shipments
    { 
      field: "action",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              id="edit"
              variant="contained"
              color="success"
              size="small"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setId(params.row.id);
                setOpenEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              id="delete"
              variant="contained"
              color="error"
              size="small"
              style={{ marginRight: "8px" }}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete shipment "
                  )
                )
                  handleDelete(params.row.id);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  // here we are getting user info (authenticated one);
  const getUserInfo = () => {
    axios.get(`http://localhost:8000/api/logeduser`,headers).then((res)=>{
      if(res.status === 200){
        setCustomerInfo(res.data.data);

      }
    })

  }
    // in this function we are getting user Shipments
    const getUserShipments = () => {
      axios.get(`http://localhost:8000/api/shipments`, headers).then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setCustomerShipments(res.data.data);
        }
      });
    }

    // getting one user shipments 
    const getOneUserShipments = () => {
      if (id) {
        axios.get(`http://localhost:8000/api/shipments/${id}`, headers)
          .then((res) => {
            if (res.status === 200) {
              setShipments(res.data.data);
            }
          });
        }
    }
  

  useEffect(() => {
      getUserInfo();
      getUserShipments();
      getOneUserShipments(id);
    },[id])


  const handleInput = (e) => {
    setShipments({ ...shipments, [e.target.name]: e.target.value });
  };

  // this function is used when we want to edit a specific shipment
  const handleEdit = (e) => {
    e.preventDefault();
    const customerShipments = {
      shipment_origin: shipments.shipment_origin,
      destination: shipments.destination,
      route: shipments.route 
    }
    // calling axios library to edit the shipment 
    axios.put(`http://localhost:8000/api/shipments/${id}`, customerShipments, headers)
      .then((res) => {
        if (res.data.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Shipment Updated Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          setShipments({
            shipment_origin: "",
            destination: "",
            route: "",
          });
        }
      });
  };

  // save shipments or adding the new shipment of the user
  const saveShipments = (e) => {
    e.preventDefault();
    const customerShipments = {
      shipment_origin: shipments.shipment_origin,
      destination: shipments.destination,
      route: shipments.route 
    }
    
    axios.post("http://localhost:8000/api/shipments/", customerShipments, headers)
      .then((res) => {
        if (res.data.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Shipment Added Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          setShipments({
            shipment_origin: "",
            destination: "",
            route: "",
          });
        }
      })
      .catch(err => {
        if(err.response === 404){
          Swal.fire({
            icon: "error",
            title: "Shipment Id Not Found",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
  };

  // handle delete is used to delete / cancel specific shipment 
  const handleDelete = (shipment_id) => {
    axios
      .delete(`http://localhost:8000/api/shipments/${shipment_id}`, headers)
      .then((res) => {
        if (res.data.status === 200) {
            setCustomerShipments(res.data.data);
            Swal.fire({
              icon: "success",
              title: "Shipment Deleted Successfully",
              showConfirmButton: false,
              timer: 1000,
            });
        }
      })
      .catch(err =>{
        if(err.status === 404){
          Swal.fire({
            icon: "error",
            title: err.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
  };

 
  return (
    <>
      <div className='dashboard-header'>
      <div className='dashboard-header-content'>
      <p className='dashboard-header-heading'>Welcome {customerInfo.first_name}</p>
      <Drawer name={customerInfo.first_name}/>
      </div>
      </div>
      <RightContainer>
        <div className="shipments__container">
          <div style={{ height: 423, width: "90%", margin: "0px auto" }}>
            <div className="button-container" style={{display:"flex"}}>
              <Button
                id="button"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAdd(true)}
                style={{margin:"10px 0px 10px 0px"}}
              >
                Add Shipment
              </Button>
            </div>
              <DataGrid
                // here the rows contain all user shipments fetched from data base
                rows={customerShipments}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row.id}
                style={{width:"100%"}}
              />
            {/* we are using the dialog which will pop up when we want to add new shipment */} 
            <Dialog open={openAdd}>
              <DialogTitle> Add New Shipment </DialogTitle>
              <form onSubmit={saveShipments}>
                <DialogContent sx={{ padding: "30px" }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="shipment_origin"
                    label="Shipment_origin"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="shipment_origin"
                    value={shipments.shipment_origin}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="destination"
                    label="Destination"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="destination"
                     value={shipments.destination}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="route"
                    label="Route"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="route"
                    value={shipments.route}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenAdd(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            </Dialog>
            
            {/** This dialog will pop up when we want to edit shipment and it is containing 
             * the specified shipment details
             */}
            <Dialog open={openEdit}>
              <DialogTitle> Edit Shipment </DialogTitle>
              <form onSubmit={handleEdit}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Shipment_origin"
                    type="text"
                    fullWidth
                    variant="standard"
                     onChange={handleInput}
                    name="shipment_origin"
                     value={shipments.shipment_origin}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Destination "
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="destination"
                    value={shipments.destination}
                    required
                  />
                  
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Route"
                    type="text"
                    fullWidth
                    variant="standard"
                     onChange={handleInput}
                    name="route"
                    value={shipments.route}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        </div>
      </RightContainer>
    </>
  );
}
