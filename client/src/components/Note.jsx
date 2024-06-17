import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

function Note({ id, title, description, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [note, setNote] = useState({
    title: title,
    description: description,
  });

  function handleChange(e) {
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleDelete() {
    try {
      await axiosInstance.delete(`/deleteNote/${id}`);
      toast.success("Note Removed Successfully");
      onDelete(id);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Couldn't delete right now");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/updatenote/${id}`, note);
      toast.success("Note Created Successfully");
      onUpdate(response.data.updatedNote);
      handleClose();
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Couldn't update note right now");
    }
  }

  return (
    <Card className="mt-6 md:w-96 w-full">
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 text-base md:text-xl capitalize"
        >
          {title}
        </Typography>
        <Typography className="text-sm md:text-base">{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center gap-2">
        <Button onClick={handleOpen}>Update</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
              <input
                name="title"
                value={note.title}
                onChange={handleChange}
                type="text"
                placeholder="title"
                className="border-2 border-black rounded-md w-full px-2 py-1"
              />
              <input
                name="description"
                value={note.description}
                onChange={handleChange}
                type="text"
                placeholder="description"
                className="border-2 border-black rounded-md w-full px-2 py-1"
              />
              <Button
                type="submit"
                onClick={handleUpdate}
                className="w-1/2 mx-auto mt-2"
              >
                Update
              </Button>
            </form>
          </Box>
        </Modal>
        <MdOutlineDeleteOutline
          onClick={handleDelete}
          size={40}
          className="border-2 rounded-full p-2 text-white bg-black"
        />
      </CardFooter>
    </Card>
  );
}
export default Note;
