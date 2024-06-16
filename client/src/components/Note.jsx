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

function Note({ id, title, description, onDelete }) {
  async function handleDelete() {
    try {
      const response = await axiosInstance.delete(`/deleteNote/${id}`);
      onDelete(id); // Notify parent component about deletion
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Couldn't delete right now")
      // Handle error, show message to user, etc.
    }
  }
  return (
    <Card className="mt-6 md:w-96 w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-base md:text-xl capitalize">
          {title}
        </Typography>
        <Typography className="font-semibold text-sm md:text-base">{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center gap-2">
        <Button>Update</Button>
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
